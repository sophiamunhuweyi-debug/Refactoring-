import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Input, { Textarea, Select } from '../components/ui/Input'

describe('Input', () => {
  it('renders label and input', () => {
    render(<Input label="Full Name" name="name" />)
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
  })

  it('shows required asterisk', () => {
    render(<Input label="Email" name="email" required />)
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('displays error message', () => {
    render(<Input label="Name" name="name" error="This field is required" />)
    expect(screen.getByRole('alert')).toHaveTextContent('This field is required')
  })

  it('sets aria-invalid when error is present', () => {
    render(<Input label="Name" name="name" error="Error" />)
    expect(screen.getByLabelText(/name/i)).toHaveAttribute('aria-invalid', 'true')
  })
})

describe('Textarea', () => {
  it('renders label and textarea', () => {
    render(<Textarea label="Details" name="details" />)
    expect(screen.getByLabelText(/details/i)).toBeInTheDocument()
  })

  it('shows char count when focused', () => {
    render(<Textarea label="Details" name="details" />)
    const textarea = screen.getByLabelText(/details/i)
    fireEvent.focus(textarea)
    expect(screen.getByText(/0\/1000/)).toBeInTheDocument()
  })
})

describe('Select', () => {
  const options = [
    { value: 'opt1', label: 'Option 1' },
    { value: 'opt2', label: 'Option 2' },
  ]

  it('renders label and select', () => {
    render(<Select label="Budget" name="budget" options={options} />)
    expect(screen.getByLabelText(/budget/i)).toBeInTheDocument()
  })

  it('renders all options', () => {
    render(<Select label="Budget" name="budget" options={options} />)
    expect(screen.getByText('Option 1')).toBeInTheDocument()
    expect(screen.getByText('Option 2')).toBeInTheDocument()
  })
})