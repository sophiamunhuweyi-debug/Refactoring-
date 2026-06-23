import React from 'react'
import Button from './ui/Button'
import Card from './ui/Card'

const stats = [
  { value: '15+', label: 'Merged PRs / Week' },
  { value: '>90%', label: 'Average Test Coverage' },
  { value: '100%', label: 'Client CSAT & Delivery' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 sm:pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-transparent to-zinc-950 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="vanguard-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Pre-title badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 mb-8">
            <span className="font-mono text-xs text-indigo-400 tracking-wider uppercase">
              Vanguard Engineering // Elite SaaS Delivery
            </span>
          </div>

          {/* Main headline */}
          <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-none text-balance mb-6">
            Production-Quality Software,
            <br />
            <span className="gradient-text">Shipped Without the Overhead.</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-10">
            We partner with visionary founders and product teams to design, build, and test
            high-velocity applications end-to-end. Daily PRs. Clean architecture. Blazing speed.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href="#inquiry">
              <Button variant="primary" size="lg">
                Start Your Project
              </Button>
            </a>
            <a href="#services">
              <Button variant="secondary" size="lg">
                Explore Our Stack &amp; Process
              </Button>
            </a>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <Card key={stat.label} hover={false} className="text-center py-6">
                <div className="text-3xl font-extrabold text-indigo-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-zinc-500 font-medium">
                  {stat.label}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}