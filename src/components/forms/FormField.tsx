'use client';

import { AlertCircle } from 'lucide-react';
import type { ChangeEvent } from 'react';
import { cn } from '@/lib/utils';

interface BaseProps {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  autoComplete?: string;
}

interface InputProps extends BaseProps {
  control: 'input';
  type?: 'text' | 'email' | 'tel';
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  placeholder?: string;
}

interface TextareaProps extends BaseProps {
  control: 'textarea';
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  maxLength?: number;
  placeholder?: string;
}

interface SelectProps extends BaseProps {
  control: 'select';
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: readonly string[];
  placeholder?: string;
}

type FormFieldProps = InputProps | TextareaProps | SelectProps;

const controlClasses =
  'w-full rounded-input border bg-surface px-3.5 py-2.5 text-base text-foreground transition-colors placeholder:text-subtle-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:border-brand disabled:opacity-60';

export function FormField(props: FormFieldProps) {
  const { id, name, label, required, error, helpText } = props;
  const errorId = `${id}-error`;
  const helpId = `${id}-help`;
  const describedBy = [helpText ? helpId : null, error ? errorId : null].filter(Boolean).join(' ');
  const borderClass = error ? 'border-error focus-visible:ring-error' : 'border-border';

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {required ? (
          <span className="ml-0.5 text-error" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1 text-xs font-normal text-subtle-foreground">(optional)</span>
        )}
      </label>

      {helpText && (
        <p id={helpId} className="text-xs text-subtle-foreground">
          {helpText}
        </p>
      )}

      {props.control === 'input' && (
        <input
          id={id}
          name={name}
          type={props.type ?? 'text'}
          value={props.value}
          onChange={props.onChange}
          required={required}
          maxLength={props.maxLength}
          autoComplete={props.autoComplete}
          placeholder={props.placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          className={cn(controlClasses, borderClass)}
        />
      )}

      {props.control === 'textarea' && (
        <textarea
          id={id}
          name={name}
          value={props.value}
          onChange={props.onChange}
          required={required}
          rows={props.rows ?? 6}
          maxLength={props.maxLength}
          placeholder={props.placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          className={cn(controlClasses, borderClass, 'resize-y')}
        />
      )}

      {props.control === 'select' && (
        <select
          id={id}
          name={name}
          value={props.value}
          onChange={props.onChange}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          className={cn(controlClasses, borderClass, 'appearance-none bg-no-repeat pr-9')}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23667085' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
            backgroundPosition: 'right 0.75rem center',
          }}
        >
          <option value="" disabled>
            {props.placeholder ?? 'Select an option'}
          </option>
          {props.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {error && (
        <p id={errorId} className="flex items-center gap-1.5 text-sm text-error">
          <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}
