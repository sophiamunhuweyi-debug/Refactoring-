import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App', () => {
  it('renders all major sections', () => {
    render(<App />)

    // Due to StrictMode, components render twice, so use getAllByText
    // Header - VANGUARD appears in header + footer
    expect(screen.getAllByText('VANGUARD').length).toBeGreaterThanOrEqual(2)

    // Hero
    expect(screen.getAllByText(/Production-Quality Software/i).length).toBeGreaterThanOrEqual(1)

    // Services
    expect(screen.getAllByText('Our Capabilities').length).toBeGreaterThanOrEqual(1)

    // Method
    expect(screen.getAllByText('The Vanguard Method').length).toBeGreaterThanOrEqual(1)

    // Case Studies
    expect(screen.getAllByText('Selected Case Studies').length).toBeGreaterThanOrEqual(1)

    // Inquiry Form
    expect(screen.getAllByText("Let's Collaborate").length).toBeGreaterThanOrEqual(1)

    // Footer
    expect(screen.getAllByText('All Systems Operational').length).toBeGreaterThanOrEqual(1)
  })
})