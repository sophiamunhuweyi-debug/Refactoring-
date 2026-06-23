import React from 'react'
import { render, screen } from '@testing-library/react'
import Method from '../components/Method'

describe('Method', () => {
  it('renders the section heading', () => {
    render(<Method />)
    expect(screen.getByText('The Vanguard Method')).toBeInTheDocument()
  })

  it('renders all four steps', () => {
    render(<Method />)
    expect(screen.getByText(/Spec.*Align/i)).toBeInTheDocument()
    expect(screen.getByText(/Continuous Delivery/i)).toBeInTheDocument()
    expect(screen.getByText(/Rigorous Review.*QA/i)).toBeInTheDocument()
    expect(screen.getByText(/Production Ship/i)).toBeInTheDocument()
  })

  it('renders step numbers', () => {
    render(<Method />)
    const steps = screen.getAllByText(/^[1-4]$/)
    expect(steps).toHaveLength(4)
  })
})