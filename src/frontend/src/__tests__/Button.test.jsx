import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Button from '../components/ui/Button'

describe('Button', () => {
  it('renders children text', () => {
    render(<Button>Click Me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('applies primary variant classes by default', () => {
    render(<Button>Primary</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('bg-indigo-600')
  })

  it('applies secondary variant classes', () => {
    render(<Button variant="secondary">Secondary</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('border-zinc-700')
  })

  it('applies custom className', () => {
    render(<Button className="extra-class">Custom</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('extra-class')
  })

  it('is disabled when disabled prop is set', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})