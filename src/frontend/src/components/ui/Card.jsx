import React from 'react'

export default function Card({
  children,
  className = '',
  hover = true,
  ...props
}) {
  return (
    <div
      className={`
        rounded-xl border border-zinc-800 bg-zinc-900/50 p-6
        ${hover
          ? 'hover:-translate-y-1 hover:shadow-lg hover:border-indigo-500/50 duration-300 transition-all'
          : ''
        }
        ${className}
      `.trim()}
      {...props}
    >
      {children}
    </div>
  )
}