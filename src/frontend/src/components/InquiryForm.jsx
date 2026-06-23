import React from 'react'
import Button from './ui/Button'
import Input, { Textarea, Select } from './ui/Input'
import useSubmitForm from '../hooks/useSubmitForm'

const categoryOptions = [
  { value: 'Full SaaS MVP', label: 'Full SaaS MVP' },
  { value: 'Responsive Frontend', label: 'Responsive Frontend' },
  { value: 'Custom REST/GraphQL API', label: 'Custom REST/GraphQL API' },
  { value: 'Consulting & Architecture', label: 'Consulting & Architecture' },
]

const budgetOptions = [
  { value: '<$10k', label: '<$10k' },
  { value: '$10k - $25k', label: '$10k - $25k' },
  { value: '$25k - $50k', label: '$25k - $50k' },
  { value: '$50k+', label: '$50k+' },
]

const timelineOptions = [
  { value: '< 1 month', label: '< 1 month' },
  { value: '1 - 2 months', label: '1 - 2 months' },
  { value: '2 - 4 months', label: '2 - 4 months' },
  { value: '4+ months', label: '4+ months' },
]

function SuccessScreen({ data, onReset }) {
  return (
    <div className="text-center py-12" role="status">
      <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-emerald-400" aria-hidden="true">
          <path d="M8 16l6 6 10-12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-zinc-100 mb-2">Inquiry Submitted!</h3>
      <p className="text-zinc-400 mb-4 max-w-md mx-auto">
        Thank you for reaching out. Our engineering team will get back to you within 12 hours.
      </p>
      {data?.id && (
        <p className="text-sm text-zinc-500 font-mono mb-6">
          Reference ID: <span className="text-zinc-300">{data.id}</span>
        </p>
      )}
      <Button variant="secondary" onClick={onReset}>
        Submit Another Inquiry
      </Button>
    </div>
  )
}

function ErrorAlert({ message, onDismiss }) {
  return (
    <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4 mb-6" role="alert">
      <div className="flex items-start gap-3">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-red-400 mt-0.5 flex-shrink-0" aria-hidden="true">
          <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10 6v4M10 13v0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <div className="flex-1">
          <p className="text-sm font-medium text-red-400">Submission Error</p>
          <p className="text-sm text-red-300/80 mt-1">{message}</p>
        </div>
        <button
          onClick={onDismiss}
          className="text-red-400 hover:text-red-300"
          aria-label="Dismiss error"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default function InquiryForm() {
  const {
    formData,
    errors,
    submissionState,
    responseData,
    serverError,
    handleChange,
    handleSubmit,
    resetForm,
  } = useSubmitForm()

  if (submissionState === 'SUCCESS') {
    return (
      <section id="inquiry" className="section-padding bg-zinc-900/30">
        <div className="vanguard-container">
          <div className="max-w-2xl mx-auto">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 glow-lg">
              <SuccessScreen data={responseData} onReset={resetForm} />
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="inquiry" className="section-padding bg-zinc-900/30">
      <div className="vanguard-container">
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl sm:text-4xl tracking-tight text-zinc-100">
            Let's Collaborate
          </h2>
          <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
            Fill out the form below, and our engineering team will get back to you within 12 hours.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8 glow-lg">
            {serverError && (
              <ErrorAlert
                message={serverError}
                onDismiss={() => resetForm()}
              />
            )}

            <form onSubmit={handleSubmit} noValidate aria-label="Project inquiry form">
              <fieldset disabled={submissionState === 'SUBMITTING'}>
                <legend className="sr-only">Project Inquiry Details</legend>

                <div className="space-y-5">
                  <div className="text-xs text-zinc-500 mb-2">
                    <span className="text-red-400">*</span> Required fields
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                      label="Full Name"
                      name="name"
                      type="text"
                      placeholder="e.g. Samantha Vance"
                      value={formData.name}
                      onChange={handleChange}
                      error={errors.name}
                      required
                    />
                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="e.g. samantha@vancecorp.io"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      required
                    />
                  </div>

                  <Input
                    label="Company Name"
                    name="company"
                    type="text"
                    placeholder="e.g. VanceCorp (Optional)"
                    value={formData.company}
                    onChange={handleChange}
                    error={errors.company}
                  />

                  <fieldset>
                    <legend className="block text-sm font-medium text-zinc-300 mb-2">
                      Project Category <span className="text-red-400">*</span>
                    </legend>
                    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Project category">
                      {categoryOptions.map((opt) => (
                        <label
                          key={opt.value}
                          className={`inline-flex items-center px-4 py-2 rounded-lg border text-sm font-medium cursor-pointer transition-all duration-200 ${
                            formData.category === opt.value
                              ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300'
                              : 'border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="category"
                            value={opt.value}
                            checked={formData.category === opt.value}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                    {errors.category && (
                      <p className="mt-1.5 text-sm text-red-400" role="alert">
                        {errors.category}
                      </p>
                    )}
                  </fieldset>

                  <Textarea
                    label="Project Details & Functional Scope"
                    name="details"
                    placeholder="Please provide a high-level overview of requirements, integrations, or technical challenges (minimum 20 characters)..."
                    value={formData.details}
                    onChange={handleChange}
                    error={errors.details}
                    required
                    rows={5}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Select
                      label="Estimated Budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      error={errors.budget}
                      options={budgetOptions}
                      placeholder="Select Budget Range"
                      required
                    />
                    <Select
                      label="Estimated Timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      error={errors.timeline}
                      options={timelineOptions}
                      placeholder="Select Timeline"
                      required
                    />
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full sm:w-auto"
                      disabled={submissionState === 'SUBMITTING'}
                    >
                      {submissionState === 'SUBMITTING' ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                            <path d="M12 2a10 10 0 019.95 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        'Submit Project Inquiry'
                      )}
                    </Button>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}