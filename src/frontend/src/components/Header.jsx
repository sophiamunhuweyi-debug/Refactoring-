import React, { useState } from 'react'
import Button from './ui/Button'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'How We Work', href: '#method' },
  { label: 'Work', href: '#work' },
  { label: 'FAQ', href: '#faq' },
]

export default function Header({ isDark, onToggleDark }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
      <nav aria-label="Main Navigation" className="vanguard-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="text-indigo-500" aria-hidden="true">
              <path d="M6 8l10 16L26 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 16l10 8 10-8" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
            </svg>
            <span className="text-lg font-bold tracking-tight text-zinc-100">
              VANGUARD
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a href="#inquiry">
              <Button variant="secondary" size="sm">
                Start Project
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-zinc-400 hover:text-zinc-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-zinc-800 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-2 text-zinc-400 hover:text-zinc-100 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="#inquiry" onClick={() => setMobileOpen(false)}>
              <Button variant="secondary" size="md" className="w-full">
                Start Project
              </Button>
            </a>
          </div>
        )}
      </nav>
    </header>
  )
}