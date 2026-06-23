import { useState, useCallback } from 'react'

const API_URL = import.meta.env.VITE_API_URL || ''

const INITIAL_STATE = 'IDLE'

const validators = {
  name: (v) => {
    const trimmed = (v || '').trim()
    if (trimmed.length < 2) return 'Please enter your full name (minimum 2 characters).'
    if (trimmed.length > 80) return 'Name must be 80 characters or fewer.'
    return ''
  },
  email: (v) => {
    const trimmed = (v || '').trim()
    if (!trimmed) return 'Please enter your email address.'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmed)) return 'Please enter a valid business email address.'
    return ''
  },
  company: (v) => {
    if ((v || '').length > 100) return 'Company name must be 100 characters or fewer.'
    return ''
  },
  category: (v) => {
    if (!v) return 'Please select a project category.'
    const valid = ['Full SaaS MVP', 'Responsive Frontend', 'Custom REST/GraphQL API', 'Consulting & Architecture']
    if (!valid.includes(v)) return 'Please select a valid project category.'
    return ''
  },
  details: (v) => {
    const trimmed = (v || '').trim()
    if (trimmed.length < 20) return 'Please describe your project in more detail (at least 20 characters).'
    if (trimmed.length > 1000) return 'Details must be 1000 characters or fewer.'
    return ''
  },
  budget: (v) => {
    if (!v) return 'Please select an estimated budget range.'
    const valid = ['<$10k', '$10k - $25k', '$25k - $50k', '$50k+']
    if (!valid.includes(v)) return 'Please select a valid budget range.'
    return ''
  },
  timeline: (v) => {
    if (!v) return 'Please select your target timeline.'
    const valid = ['< 1 month', '1 - 2 months', '2 - 4 months', '4+ months']
    if (!valid.includes(v)) return 'Please select a valid timeline.'
    return ''
  },
}

const FIELDS = ['name', 'email', 'company', 'category', 'details', 'budget', 'timeline']

function validateForm(formData) {
  const errors = {}
  for (const field of FIELDS) {
    const error = validators[field](formData[field])
    if (error) errors[field] = error
  }
  return errors
}

export default function useSubmitForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    category: '',
    details: '',
    budget: '',
    timeline: '',
  })
  const [errors, setErrors] = useState({})
  const [submissionState, setSubmissionState] = useState(INITIAL_STATE)
  const [responseData, setResponseData] = useState(null)
  const [serverError, setServerError] = useState(null)

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error on change
    setErrors((prev) => {
      if (prev[name]) {
        const next = { ...prev }
        delete next[name]
        return next
      }
      return prev
    })
  }, [])

  const validate = useCallback(() => {
    const validationErrors = validateForm(formData)
    setErrors(validationErrors)
    return Object.keys(validationErrors).length === 0
  }, [formData])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()

    if (!validate()) return

    setSubmissionState('SUBMITTING')
    setServerError(null)

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim(),
        category: formData.category,
        details: formData.details.trim(),
        budget: formData.budget,
        timeline: formData.timeline,
      }

      const res = await fetch(`${API_URL}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setSubmissionState('SUCCESS')
        setResponseData(data.data)
      } else if (res.status === 400 && data.error?.details) {
        // Validation errors from server
        const serverErrors = {}
        for (const detail of data.error.details) {
          serverErrors[detail.field] = detail.message
        }
        setErrors(serverErrors)
        setSubmissionState('IDLE')
      } else {
        setSubmissionState('ERROR')
        setServerError(data.error?.message || 'An unexpected error occurred.')
      }
    } catch (err) {
      setSubmissionState('ERROR')
      setServerError(
        'Unable to reach our servers. Please check your connection and try again.'
      )
    }
  }, [formData, validate])

  const resetForm = useCallback(() => {
    setFormData({
      name: '',
      email: '',
      company: '',
      category: '',
      details: '',
      budget: '',
      timeline: '',
    })
    setErrors({})
    setSubmissionState('IDLE')
    setResponseData(null)
    setServerError(null)
  }, [])

  return {
    formData,
    errors,
    submissionState,
    responseData,
    serverError,
    handleChange,
    handleSubmit,
    resetForm,
  }
}