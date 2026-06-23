import React from 'react'
import Card from './ui/Card'

const projects = [
  {
    title: 'SaaS Multi-Tenant Platform',
    tech: 'React · Node.js · Postgres · Stripe',
    description:
      'A full multi-tenant SaaS with subscription billing, role-based access, and real-time analytics dashboards.',
  },
  {
    title: 'Real-Time Planning Poker',
    tech: 'Next.js · WebSockets · Express · Redis',
    description:
      'Collaborative agile estimation tool for distributed engineering teams with live voting and Jira sync.',
  },
  {
    title: 'E-Commerce API Gateway',
    tech: 'GraphQL · Express · PostgreSQL · Docker',
    description:
      'Unified API layer aggregating inventory, orders, and payments across multiple microservices.',
  },
]

export default function CaseStudies() {
  return (
    <section id="work" className="section-padding">
      <div className="vanguard-container">
        <div className="text-center mb-16">
          <h2 className="font-bold text-3xl sm:text-4xl tracking-tight text-zinc-100">
            Selected Case Studies
          </h2>
          <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
            Proof-of-concept work that demonstrates our end-to-end engineering capability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.title} className="flex flex-col gap-3">
              {/* Tech badge */}
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-indigo-400 tracking-wider uppercase">
                  {project.tech}
                </span>
              </div>

              <h3 className="font-semibold text-xl tracking-tight text-zinc-100">
                {project.title}
              </h3>

              <p className="text-sm text-zinc-400 leading-relaxed flex-1">
                {project.description}
              </p>

              <div className="pt-3 flex items-center gap-1 text-sm text-indigo-400 font-medium">
                <span>View case study</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}