import React, { useState } from 'react'

export default function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required = false,
  className = '',
  ...props
}) {
  const [focused, setFocused] = useState(false)
  const errorId = `${name}-error`

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-zinc-300"
        >
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`
          w-full px-4 py-2.5 rounded-lg
          bg-zinc-900 border text-zinc-100
          placeholder:text-zinc-500
          transition-all duration-150
          outline-none
          ${error
            ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
            : focused
              ? 'border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
              : 'border-zinc-700 hover:border-zinc-600'
          }
        `.trim()}
        {...props}
      />
      {error && (
        <p id={errorId} className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export function Textarea({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  required = false,
  rows = 5,
  maxLength = 1000,
  className = '',
  ...props
}) {
  const [focused, setFocused] = useState(false)
  const errorId = `${name}-error`
  const charCount = value?.length || 0

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-zinc-300"
        >
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          required={required}
          rows={rows}
          maxLength={maxLength}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`
            w-full px-4 py-2.5 rounded-lg resize-y min-h-[120px]
            bg-zinc-900 border text-zinc-100
            placeholder:text-zinc-500
            transition-all duration-150
            outline-none
            ${error
              ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
              : focused
                ? 'border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                : 'border-zinc-700 hover:border-zinc-600'
            }
          `.trim()}
          {...props}
        />
        {focused && (
          <span className="absolute bottom-2 right-3 text-xs text-zinc-500">
            {charCount}/{maxLength}
          </span>
        )}
      </div>
      {error && (
        <p id={errorId} className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export function Select({
  label,
  name,
  value,
  onChange,
  error,
  options,
  placeholder = 'Select...',
  required = false,
  className = '',
  ...props
}) {
  const [focused, setFocused] = useState(false)
  const errorId = `${name}-error`

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-zinc-300"
        >
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`
          w-full px-4 py-2.5 rounded-lg appearance-none
          bg-zinc-900 border text-zinc-100
          transition-all duration-150
          outline-none cursor-pointer
          ${!value ? 'text-zinc-500' : 'text-zinc-100'}
          ${error
            ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
            : focused
              ? 'border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
              : 'border-zinc-700 hover:border-zinc-600'
          }
        `.trim()}
        {...props}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-zinc-900">
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={errorId} className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}