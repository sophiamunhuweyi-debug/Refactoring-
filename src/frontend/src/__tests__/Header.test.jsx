import React from 'react'
import { render, screen } from '@testing-library/react'
import Header from '../components/Header'

describe('Header', () => {
  it('renders the Vanguard logo', () => {
    render(<Header isDark={true} onToggleDark={() => {}} />)
    expect(screen.getByText('VANGUARD')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Header isDark={true} onToggleDark={() => {}} />)
    expect(screen.getByText('Services')).toBeInTheDocument()
    expect(screen.getByText('How We Work')).toBeInTheDocument()
    expect(screen.getByText('Work')).toBeInTheDocument()
    expect(screen.getByText('FAQ')).toBeInTheDocument()
  })

  it('renders Start Project CTA', () => {
    render(<Header isDark={true} onToggleDark={() => {}} />)
    expect(screen.getByText('Start Project')).toBeInTheDocument()
  })

  it('has accessible nav label', () => {
    render(<Header isDark={true} onToggleDark={() => {}} />)
    expect(screen.getByLabelText('Main Navigation')).toBeInTheDocument()
  })
})