'use client'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToOrder = () =>
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 48px',
        background: scrolled ? 'rgba(13,13,13,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--iron-border)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, letterSpacing: 6, color: 'var(--iron-cream)' }}>
        IRON<span style={{ color: 'var(--iron-orange)' }}>PLATE</span>™
      </span>
      <button
        className="btn-order"
        style={{ fontSize: 16, padding: '14px 36px' }}
        onClick={scrollToOrder}
      >
        ORDER NOW
      </button>
    </nav>
  )
}
