import React from 'react'

const steps = [
  {
    step: 1,
    title: 'Spec &amp; Align',
    description:
      'Quick turnaround from user requirement to actionable development specifications.',
  },
  {
    step: 2,
    title: 'Continuous Delivery',
    description:
      'Daily micro-PRs, allowing complete visibility into the progress of the codebase.',
  },
  {
    step: 3,
    title: 'Rigorous Review &amp; QA',
    description:
      'Pull requests run through CI/CD with unit and automated end-to-end integration tests.',
  },
  {
    step: 4,
    title: 'Production Ship',
    description:
      'Safe, automated production deployment on every approved milestone.',
  },
]

export default function Method() {
  return (
    <section id="method" className="section-padding bg-zinc-900/30">
      <div className="vanguard-container">
        <div className="text-center mb-16">
          <h2 className="font-bold text-3xl sm:text-4xl tracking-tight text-zinc-100">
            The Vanguard Method
          </h2>
          <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
            Our extreme velocity cycle — how we ship production-quality code, every time.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line (desktop) */}
          <div
            className="hidden lg:block absolute top-12 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-0.5 bg-gradient-to-r from-indigo-500/40 via-indigo-500 to-indigo-500/40"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div key={step.step} className="relative flex flex-col items-center text-center">
                {/* Step number */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center mb-5 shadow-lg shadow-indigo-500/20">
                  <span className="text-lg font-bold text-white">{step.step}</span>
                </div>

                {/* Content */}
                <h3
                  className="font-semibold text-lg text-zinc-100 mb-2"
                  dangerouslySetInnerHTML={{ __html: step.title }}
                />
                <p className="text-sm text-zinc-400 leading-relaxed max-w-[240px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}