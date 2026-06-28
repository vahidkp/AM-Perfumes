import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  optional?: boolean
  error?: string
}

export default function Input({
  label,
  optional,
  error,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || props.name
  return (
    <div>
      {label && (
        <label
          htmlFor={inputId}
          className="mb-2 block font-body text-xs uppercase tracking-widest text-ink-soft"
        >
          {label}{' '}
          {optional ? (
            <span className="text-ink/35">(Optional)</span>
          ) : (
            <span className="text-gold-deep">*</span>
          )}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'w-full border bg-white px-4 py-3 font-body text-sm text-ink placeholder-ink/40 outline-none transition-colors focus:border-gold',
          error ? 'border-garnet' : 'border-ink/20',
          className
        )}
        aria-invalid={!!error}
        {...props}
      />
      {error && <p className="mt-1 font-body text-xs text-accent-red">{error}</p>}
    </div>
  )
}
