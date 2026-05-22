'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const scrollToOrder = () =>
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(['.hero-badge', '.hero-h1', '.hero-macros', '.hero-sub', '.hero-cta'], {
        opacity: 0,
        y: 30,
      })
      gsap.to('.hero-badge',  { opacity: 1, y: 0, duration: 0.5, delay: 0.1,  ease: 'power2.out' })
      gsap.to('.hero-h1',     { opacity: 1, y: 0, duration: 0.8, delay: 0.25, ease: 'power3.out' })
      gsap.to('.hero-macros', { opacity: 1, y: 0, duration: 0.5, delay: 0.5,  ease: 'power2.out' })
      gsap.to('.hero-sub',    { opacity: 1, y: 0, duration: 0.5, delay: 0.65, ease: 'power2.out' })
      gsap.to('.hero-cta',    { opacity: 1, y: 0, duration: 0.5, delay: 0.8,  ease: 'power2.out' })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Background video / fallback */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #0D0D0D 0%, #1a0800 40%, #2a0e00 70%, #0D0D0D 100%)',
          zIndex: 0,
        }}
      />
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/video/hero-burger.jpg"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
        }}
      >
        <source src="/video/hero-burger.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.65)',
          zIndex: 2,
        }}
      />

      {/* Bottom gradient fade */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 200,
          background: 'linear-gradient(to top, var(--iron-bg), transparent)',
          zIndex: 3,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 4,
          paddingLeft: 'clamp(32px, 8vw, 120px)',
          paddingRight: 'clamp(32px, 8vw, 80px)',
          maxWidth: 780,
        }}
      >
        <div className="hero-badge" style={{ marginBottom: 24 }}>
          <span className="macro-pill">#1 HIGH PROTEIN BURGER · SHOREDITCH, LONDON</span>
        </div>

        <h1
          className="hero-h1"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(80px, 13vw, 156px)',
            lineHeight: 0.88,
            letterSpacing: '0.02em',
            marginBottom: 32,
            color: 'var(--iron-cream)',
          }}
        >
          THE<br />
          BEAST<br />
          <span style={{ color: 'var(--iron-orange)' }}>SMASH</span>
        </h1>

        <div
          className="hero-macros"
          style={{
            display: 'flex',
            gap: 10,
            flexWrap: 'wrap',
            marginBottom: 24,
          }}
        >
          <span className="macro-pill">52G PROTEIN</span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--iron-muted)',
              letterSpacing: 1,
              display: 'flex',
              alignItems: 'center',
              padding: '5px 0',
            }}
          >
            · 680 KCAL · £12.50
          </span>
        </div>

        <p
          className="hero-sub"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 18,
            color: 'var(--iron-muted)',
            lineHeight: 1.6,
            marginBottom: 40,
          }}
        >
          Double smash patty. Aged cheddar. Sriracha aioli. Hand-pressed daily.
        </p>

        <div className="hero-cta">
          <button className="btn-order" onClick={scrollToOrder}>
            ORDER NOW →
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 48,
          right: 48,
          zIndex: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          opacity: 0.4,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: 4,
            color: 'var(--iron-cream)',
            transform: 'rotate(90deg)',
            transformOrigin: 'center',
            marginBottom: 4,
            whiteSpace: 'nowrap',
          }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: 1,
            height: 48,
            background: 'var(--iron-cream)',
            animation: 'scroll-pulse 2s ease-in-out infinite',
            transformOrigin: 'top center',
          }}
        />
      </div>
    </section>
  )
}
