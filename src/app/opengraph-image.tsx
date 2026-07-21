import { ImageResponse } from 'next/og';
import { company } from '@/content/company';

export const alt = `${company.name} — integrated software, AI, automation, security, and growth`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Generate the OG image at build time so it works under `output: export`.
export const dynamic = 'force-static';

/** Branded Open Graph image generated at build time — no external assets. */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: 'linear-gradient(135deg, #08111F 0%, #111A2E 55%, #0B1220 100%)',
        padding: '72px',
        color: '#F8FAFC',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '14px',
            background: '#2563EB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '30px',
            fontWeight: 700,
          }}
        >
          V
        </div>
        <div style={{ fontSize: '30px', fontWeight: 700 }}>Visio Solutions</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ fontSize: '60px', fontWeight: 700, lineHeight: 1.1, maxWidth: '960px' }}>
          Software, AI, automation, security, and growth — working as one system.
        </div>
        <div style={{ fontSize: '28px', color: '#C9D4E5', maxWidth: '900px' }}>
          An integrated technology partner for organizations that want to build, automate, secure,
          and grow.
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px' }}>
        {['AI & Automation', 'Software Engineering', 'Cybersecurity', 'Digital Growth'].map(
          (pillar) => (
            <div
              key={pillar}
              style={{
                fontSize: '22px',
                color: '#93B4FF',
                border: '1px solid rgba(59,130,246,0.4)',
                borderRadius: '999px',
                padding: '8px 20px',
              }}
            >
              {pillar}
            </div>
          ),
        )}
      </div>
    </div>,
    { ...size },
  );
}
