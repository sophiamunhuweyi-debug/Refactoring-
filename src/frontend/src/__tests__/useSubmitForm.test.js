import { renderHook, act } from '@testing-library/react'
import useSubmitForm from '../hooks/useSubmitForm'

describe('useSubmitForm', () => {
  it('initializes with empty form data', () => {
    const { result } = renderHook(() => useSubmitForm())
    expect(result.current.formData).toEqual({
      name: '',
      email: '',
      company: '',
      category: '',
      details: '',
      budget: '',
      timeline: '',
    })
    expect(result.current.submissionState).toBe('IDLE')
  })

  it('updates form data on handleChange', () => {
    const { result } = renderHook(() => useSubmitForm())
    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'John Doe' },
      })
    })
    expect(result.current.formData.name).toBe('John Doe')
  })

  it('returns validation errors for empty required fields', () => {
    const { result } = renderHook(() => useSubmitForm())
    act(() => {
      result.current.handleSubmit({ preventDefault: () => {} })
    })
    expect(result.current.errors.name).toBeTruthy()
    expect(result.current.errors.email).toBeTruthy()
    expect(result.current.errors.category).toBeTruthy()
    expect(result.current.errors.details).toBeTruthy()
    expect(result.current.errors.budget).toBeTruthy()
    expect(result.current.errors.timeline).toBeTruthy()
  })

  it('name validation: minimum 2 characters', () => {
    const { result } = renderHook(() => useSubmitForm())
    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'A' },
      })
    })
    act(() => {
      result.current.handleSubmit({ preventDefault: () => {} })
    })
    expect(result.current.errors.name).toContain('minimum 2 characters')
  })

  it('email validation: invalid email format', () => {
    const { result } = renderHook(() => useSubmitForm())
    act(() => {
      result.current.handleChange({
        target: { name: 'email', value: 'not-an-email' },
      })
    })
    act(() => {
      result.current.handleSubmit({ preventDefault: () => {} })
    })
    expect(result.current.errors.email).toContain('valid business email')
  })

  it('details validation: minimum 20 characters', () => {
    const { result } = renderHook(() => useSubmitForm())
    act(() => {
      result.current.handleChange({
        target: { name: 'details', value: 'Short' },
      })
    })
    act(() => {
      result.current.handleSubmit({ preventDefault: () => {} })
    })
    expect(result.current.errors.details).toContain('at least 20 characters')
  })

  it('clears field error when value changes', () => {
    const { result } = renderHook(() => useSubmitForm())
    // First, trigger validation
    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'A' },
      })
    })
    act(() => {
      result.current.handleSubmit({ preventDefault: () => {} })
    })
    expect(result.current.errors.name).toBeTruthy()

    // Now fix the field
    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'John Doe' },
      })
    })
    expect(result.current.errors.name).toBeFalsy()
  })

  it('resetForm clears all state', () => {
    const { result } = renderHook(() => useSubmitForm())
    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'John Doe' },
      })
    })
    act(() => {
      result.current.resetForm()
    })
    expect(result.current.formData.name).toBe('')
    expect(result.current.submissionState).toBe('IDLE')
    expect(result.current.errors).toEqual({})
  })
})