import React from 'react'
import Card from './ui/Card'

const services = [
  {
    title: 'System &amp; API Architecture',
    description:
      'Designing bulletproof relational schemas, scalable micro-structures, and secure, high-speed API layers.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-indigo-400" aria-hidden="true">
        <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
        <rect x="18" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
        <rect x="2" y="18" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
        <rect x="18" y="18" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: 'Frontend Engineering',
    description:
      'Creating responsive, fast React / Tailwind interfaces optimized for speed, access, and fluid interactivity.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-indigo-400" aria-hidden="true">
        <rect x="4" y="6" width="24" height="20" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M4 12h24" stroke="currentColor" strokeWidth="2" />
        <circle cx="8" cy="9" r="1" fill="currentColor" />
        <circle cx="12" cy="9" r="1" fill="currentColor" />
        <circle cx="16" cy="9" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Quality Assurance &amp; Testing',
    description:
      'Robust backend and integration testing suites designed to capture bugs before they hit staging.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-indigo-400" aria-hidden="true">
        <path d="M16 4l3.09 6.26L26 11.27l-5 4.87L22.18 23 16 19.77 9.82 23 11 16.14l-5-4.87 6.91-1.01L16 4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'End-to-End SaaS MVPs',
    description:
      'Combining Frontend, Backend, and Database into single-tenant or multi-tenant production deployments.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-indigo-400" aria-hidden="true">
        <path d="M8 20l8-12 8 12H8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <rect x="6" y="22" width="20" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
]

export default function Services() {
  return (
    <section id="services" className="section-padding">
      <div className="vanguard-container">
        <div className="text-center mb-16">
          <h2 className="font-bold text-3xl sm:text-4xl tracking-tight text-zinc-100">
            Our Capabilities
          </h2>
          <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
            Everything you need to ship production-quality software — from database to deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card key={service.title} className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                {service.icon}
              </div>
              <h3
                className="font-semibold text-xl tracking-tight text-zinc-100"
                dangerouslySetInnerHTML={{ __html: service.title }}
              />
              <p className="text-sm text-zinc-400 leading-relaxed">
                {service.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}