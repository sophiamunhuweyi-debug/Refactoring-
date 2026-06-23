import React from 'react'

const footerLinks = [
  { label: 'Services', href: '#services' },
  { label: 'How We Work', href: '#method' },
  { label: 'Case Studies', href: '#work' },
  { label: 'Contact', href: '#inquiry' },
]

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/50 bg-zinc-950">
      <div className="vanguard-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <a href="#" className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none" className="text-indigo-500" aria-hidden="true">
                <path d="M6 8l10 16L26 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 16l10 8 10-8" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
              </svg>
              <span className="text-lg font-bold tracking-tight text-zinc-100">
                VANGUARD
              </span>
            </a>
            <p className="text-sm text-zinc-500 max-w-xs">
              Production-quality software, shipped without the overhead.
              Fully remote / global team.
            </p>
            <p className="text-sm text-zinc-600">
              &copy; {new Date().getFullYear()} Vanguard Engineering. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">
              Navigation
            </h4>
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Status */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">
              Status
            </h4>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
              <span className="text-sm text-zinc-400">All Systems Operational</span>
            </div>
            <p className="text-xs text-zinc-600 mt-2">
              Vanguard Engineering operates with 99.9% uptime across all client deployments.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}