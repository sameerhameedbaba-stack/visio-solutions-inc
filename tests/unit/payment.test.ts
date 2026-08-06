import { describe, expect, it } from 'vitest';
import { readPaymentReferences, referenceMaxLength, sanitizeReference } from '@/lib/payment';
import {
  buildNotification,
  maxNotificationFields,
  sanitizeNotificationText,
} from '@/lib/payment-notification';
import { metadata as successMeta } from '@/app/payment/success/page';
import { metadata as cancelMeta } from '@/app/payment/cancel/page';

describe('sanitizeReference', () => {
  it('keeps identifier-safe characters', () => {
    expect(sanitizeReference('A-99_x.1')).toBe('A-99_x.1');
  });

  it('strips markup and punctuation an identifier never contains', () => {
    expect(sanitizeReference('<script>alert(1)</script>')).toBe('scriptalert1script');
    expect(sanitizeReference('12 34')).toBe('1234');
  });

  it('removes CR/LF so a value cannot break out of a log line', () => {
    expect(sanitizeReference('abc\r\nInjected: yes')).toBe('abcInjectedyes');
  });

  it('caps the length', () => {
    expect(sanitizeReference('9'.repeat(200))).toHaveLength(referenceMaxLength);
  });

  it('returns null when nothing usable remains', () => {
    expect(sanitizeReference('')).toBeNull();
    expect(sanitizeReference('   ')).toBeNull();
    expect(sanitizeReference('!!!')).toBeNull();
    expect(sanitizeReference(null)).toBeNull();
    expect(sanitizeReference(undefined)).toBeNull();
  });
});

describe('readPaymentReferences', () => {
  it('reads both gateway identifiers in display order', () => {
    expect(readPaymentReferences('?ChkID=8821&TransID=T-1')).toEqual([
      { key: 'ChkID', label: 'Check ID', value: '8821' },
      { key: 'TransID', label: 'Transaction ID', value: 'T-1' },
    ]);
  });

  it('matches parameter names case-insensitively', () => {
    expect(readPaymentReferences('chkid=42')).toEqual([
      { key: 'ChkID', label: 'Check ID', value: '42' },
    ]);
  });

  it('accepts a search string with or without the leading question mark', () => {
    expect(readPaymentReferences('TransID=abc')).toHaveLength(1);
    expect(readPaymentReferences('?TransID=abc')).toHaveLength(1);
  });

  it('omits identifiers that are missing or unusable', () => {
    expect(readPaymentReferences('')).toEqual([]);
    expect(readPaymentReferences('?ChkID=&TransID=***')).toEqual([]);
  });
});

describe('sanitizeNotificationText', () => {
  it('replaces control characters with spaces', () => {
    expect(sanitizeNotificationText('a\r\nb\tc')).toBe('a  b c');
  });

  it('bounds the length', () => {
    expect(sanitizeNotificationText('x'.repeat(500))).toHaveLength(256);
    expect(sanitizeNotificationText('x'.repeat(500), 10)).toHaveLength(10);
  });

  it('ignores values that are not primitives', () => {
    expect(sanitizeNotificationText({ a: 1 })).toBe('');
    expect(sanitizeNotificationText(undefined)).toBe('');
    expect(sanitizeNotificationText(['a'])).toBe('');
  });
});

describe('buildNotification', () => {
  const at = new Date('2026-01-02T03:04:05.000Z');

  it('records the gateway identifiers and every other parameter', () => {
    const notification = buildNotification(
      'get',
      [
        ['ChkID', '8821'],
        ['TransID', 'T-1'],
        ['Amount', '100.00'],
      ],
      at,
    );
    expect(notification).toMatchObject({
      receivedAt: '2026-01-02T03:04:05.000Z',
      method: 'GET',
      checkId: '8821',
      transactionId: 'T-1',
      hasReference: true,
    });
    expect(notification.fields).toEqual({ ChkID: '8821', TransID: 'T-1', Amount: '100.00' });
  });

  it('finds the identifiers whatever case the gateway uses', () => {
    const notification = buildNotification('POST', [['transid', 'abc']], at);
    expect(notification.transactionId).toBe('abc');
    expect(notification.hasReference).toBe(true);
  });

  it('redacts credential- and bank-shaped values while noting the field arrived', () => {
    const notification = buildNotification(
      'GET',
      [
        ['token', 'super-secret'],
        ['Signature', 'deadbeef'],
        ['AccountNumber', '000123456789'],
        ['RoutingNumber', '021000021'],
        ['ChkID', '1'],
      ],
      at,
    );
    expect(notification.fields).toEqual({
      token: '[redacted]',
      Signature: '[redacted]',
      AccountNumber: '[redacted]',
      RoutingNumber: '[redacted]',
      ChkID: '1',
    });
    const serialised = JSON.stringify(notification);
    expect(serialised).not.toContain('super-secret');
    expect(serialised).not.toContain('000123456789');
    expect(serialised).not.toContain('021000021');
  });

  it('does not redact ordinary fields whose names merely contain a short token', () => {
    // "Company" contains "pan"; "ShippingCity" contains "pin".
    const notification = buildNotification(
      'GET',
      [
        ['Company', 'Acme Inc'],
        ['ShippingCity', 'Salem'],
      ],
      at,
    );
    expect(notification.fields).toEqual({ Company: 'Acme Inc', ShippingCity: 'Salem' });
  });

  it('bounds how many parameters a single request can record', () => {
    const entries: [string, string][] = Array.from({ length: 200 }, (_, i) => [`k${i}`, 'v']);
    const notification = buildNotification('GET', entries, at);
    expect(Object.keys(notification.fields)).toHaveLength(maxNotificationFields);
  });

  it('reports no reference when the gateway sent no identifiers', () => {
    const notification = buildNotification('GET', [['Amount', '10']], at);
    expect(notification.hasReference).toBe(false);
    expect(notification.checkId).toBe('');
    expect(notification.transactionId).toBe('');
  });
});

describe('payment page metadata', () => {
  it('keeps both return pages out of the index', () => {
    expect(successMeta.robots).toMatchObject({ index: false });
    expect(cancelMeta.robots).toMatchObject({ index: false });
  });

  it('gives each page a distinct title with a single brand suffix', () => {
    const titleOf = (meta: { title?: unknown }) => {
      const value = meta.title as { absolute?: string } | string | undefined;
      return typeof value === 'string' ? value : (value?.absolute ?? '');
    };
    const success = titleOf(successMeta);
    const cancel = titleOf(cancelMeta);
    expect(success).not.toBe(cancel);
    expect(success.match(/Visio Solutions/g)?.length).toBe(1);
    expect(cancel.match(/Visio Solutions/g)?.length).toBe(1);
  });

  it('does not describe the payment as verified or settled', () => {
    const claims = /\b(verified|settled|confirmed|guaranteed)\b/i;
    expect(successMeta.description ?? '').not.toMatch(claims);
  });
});
