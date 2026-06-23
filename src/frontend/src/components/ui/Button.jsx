import React from 'react'

const variants = {
  primary:
    'bg-indigo-600 text-white hover:bg-indigo-500 active:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
  secondary:
    'border border-zinc-700 text-zinc-100 hover:bg-zinc-800 active:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
  ghost:
    'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  return (
    <button
      className={`
        inline-flex items-center justify-center font-medium rounded-lg
        transition-all duration-200
        hover:scale-[1.02] active:scale-[0.98]
        disabled:opacity-50 disabled:pointer-events-none
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${className}
      `.trim()}
      {...props}
    >
      {children}
    </button>
  )
}