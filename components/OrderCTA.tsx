'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
/* Social icons via inline SVG — lucide v1 removed branded icons */

gsap.registerPlugin(ScrollTrigger)

export default function OrderCTA() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta-headline',
        { scale: 0.92, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
        }
      )

      gsap.fromTo(
        '.cta-sub',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
        }
      )

      gsap.fromTo(
        '.cta-button-wrap',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: 0.55,
          ease: 'power2.out',
          onComplete: () => {
            gsap.to('.cta-button-wrap', {
              scale: 1.04,
              duration: 0.2,
              ease: 'power2.out',
              yoyo: true,
              repeat: 1,
              delay: 0.3,
            })
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <section
        id="order"
        ref={sectionRef}
        style={{
          minHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(ellipse 80% 50% at 50% 120%, rgba(232,80,26,0.2) 0%, transparent 70%), var(--iron-bg)',
          padding: 'clamp(80px, 10vw, 120px) clamp(24px, 5vw, 48px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <hr className="rule-hot" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

        <div
          style={{
            maxWidth: 700,
            width: '100%',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
          }}
        >
          <p className="section-label">READY TO FUEL UP?</p>

          <h2
            className="cta-headline"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(80px, 15vw, 180px)',
              color: 'var(--iron-cream)',
              letterSpacing: 8,
              lineHeight: 0.9,
              display: 'block',
            }}
          >
            ORDER<br />
            <span style={{ color: 'var(--iron-orange)' }}>NOW</span>
          </h2>

          <div className="cta-sub" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 18,
                color: 'var(--iron-muted)',
                lineHeight: 1.6,
              }}
            >
              Delivering to Shoreditch · Dalston · Hackney · Bethnal Green · Aldgate
            </p>

            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                color: 'var(--iron-muted)',
                letterSpacing: 2,
              }}
            >
              Min. 40G PROTEIN ON EVERY ITEM · Ready in 25 min · £1.99 delivery
            </p>
          </div>

          <div className="cta-button-wrap">
            <button
              className="btn-order"
              style={{ fontSize: 26, padding: '24px 80px' }}
              onClick={() =>
                document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              ORDER NOW →
            </button>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              color: 'var(--iron-muted)',
              letterSpacing: 2,
            }}
          >
            Mon–Sun · 11:00 AM – 11:30 PM
          </p>
        </div>
      </section>

      {/* Footer strip */}
      <div
        style={{
          background: '#080808',
          borderTop: '1px solid var(--iron-border)',
          padding: '24px clamp(24px, 4vw, 48px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 18,
            color: 'var(--iron-cream)',
            letterSpacing: 4,
          }}
        >
          IRON<span style={{ color: 'var(--iron-orange)' }}>PLATE</span>™
        </span>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            color: 'var(--iron-muted)',
            textAlign: 'center',
          }}
        >
          © 2025 IRONPLATE™ · Shoreditch, London · All rights reserved
        </p>

        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          {/* Instagram */}
          <button
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', opacity: 0.6, transition: 'opacity 0.2s ease', color: 'var(--iron-cream)' }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '0.6')}
            aria-label="Instagram"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </button>
          {/* X / Twitter */}
          <button
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', opacity: 0.6, transition: 'opacity 0.2s ease', color: 'var(--iron-cream)' }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '0.6')}
            aria-label="X"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}
