import React from 'react'
import { render, screen } from '@testing-library/react'
import Footer from '../components/Footer'

describe('Footer', () => {
  it('renders the Vanguard branding', () => {
    render(<Footer />)
    expect(screen.getByText('VANGUARD')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Footer />)
    expect(screen.getByText('Services')).toBeInTheDocument()
    expect(screen.getByText('Case Studies')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('renders system status indicator', () => {
    render(<Footer />)
    expect(screen.getByText('All Systems Operational')).toBeInTheDocument()
  })

  it('renders copyright', () => {
    render(<Footer />)
    const year = new Date().getFullYear()
    expect(screen.getByText(new RegExp(year.toString()))).toBeInTheDocument()
  })
})