import React from 'react'
import { render, screen } from '@testing-library/react'
import Hero from '../components/Hero'

describe('Hero', () => {
  it('renders the pre-title badge', () => {
    render(<Hero />)
    expect(screen.getByText(/Elite SaaS Delivery/i)).toBeInTheDocument()
  })

  it('renders the main headline', () => {
    render(<Hero />)
    expect(screen.getByText(/Production-Quality Software/i)).toBeInTheDocument()
  })

  it('renders the sub-headline', () => {
    render(<Hero />)
    expect(screen.getByText(/partner with visionary founders/i)).toBeInTheDocument()
  })

  it('renders CTA buttons', () => {
    render(<Hero />)
    expect(screen.getByText('Start Your Project')).toBeInTheDocument()
    expect(screen.getByText(/Explore Our Stack/i)).toBeInTheDocument()
  })

  it('renders stat cards', () => {
    render(<Hero />)
    expect(screen.getByText('15+')).toBeInTheDocument()
    expect(screen.getByText('>90%')).toBeInTheDocument()
    expect(screen.getByText('100%')).toBeInTheDocument()
  })
})