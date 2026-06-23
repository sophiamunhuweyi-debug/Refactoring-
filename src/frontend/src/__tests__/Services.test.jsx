import React from 'react'
import { render, screen } from '@testing-library/react'
import Services from '../components/Services'

describe('Services', () => {
  it('renders the section heading', () => {
    render(<Services />)
    expect(screen.getByText('Our Capabilities')).toBeInTheDocument()
  })

  it('renders all four service cards', () => {
    render(<Services />)
    expect(screen.getByText(/System.*API Architecture/i)).toBeInTheDocument()
    expect(screen.getByText(/Frontend Engineering/i)).toBeInTheDocument()
    expect(screen.getByText(/Quality Assurance.*Testing/i)).toBeInTheDocument()
    expect(screen.getByText(/End-to-End SaaS MVPs/i)).toBeInTheDocument()
  })
})