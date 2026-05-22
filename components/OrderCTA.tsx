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
    </>
  )
}
