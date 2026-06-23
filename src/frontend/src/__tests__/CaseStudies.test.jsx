import React from 'react'
import { render, screen } from '@testing-library/react'
import CaseStudies from '../components/CaseStudies'

describe('CaseStudies', () => {
  it('renders the section heading', () => {
    render(<CaseStudies />)
    expect(screen.getByText('Selected Case Studies')).toBeInTheDocument()
  })

  it('renders all three project cards', () => {
    render(<CaseStudies />)
    expect(screen.getByText(/SaaS Multi-Tenant/i)).toBeInTheDocument()
    expect(screen.getByText(/Real-Time Planning/i)).toBeInTheDocument()
    expect(screen.getByText(/E-Commerce API/i)).toBeInTheDocument()
  })
})