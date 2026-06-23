import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Method from './components/Method'
import CaseStudies from './components/CaseStudies'
import InquiryForm from './components/InquiryForm'
import Footer from './components/Footer'

function App() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const html = document.documentElement
    if (isDark) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }, [isDark])

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 transition-colors duration-300">
      <Header isDark={isDark} onToggleDark={() => setIsDark(!isDark)} />
      <main>
        <Hero />
        <Services />
        <Method />
        <CaseStudies />
        <InquiryForm />
      </main>
      <Footer />
    </div>
  )
}

export default App