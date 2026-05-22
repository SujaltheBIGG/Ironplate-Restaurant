'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star } from 'lucide-react'
import { REVIEWS } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { id: 'meals',   value: 3800,  suffix: '+',  label: 'MEALS SERVED',    display: '' },
  { id: 'protein', value: 49,    suffix: 'G',  label: 'AVG PROTEIN/ORDER', display: '' },
  { id: 'rating',  value: 4.9,   suffix: '★',  label: 'RATING',          display: '', decimal: true },
  { id: 'spot',    value: 0,     suffix: '',   label: "#1 PROTEIN SPOT",  display: "EAST LONDON'S", static: true },
]

export default function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null)
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const animateStat = (id: string, target: number, suffix: string, decimal?: boolean) => {
        const el = document.getElementById(`stat-${id}`)
        if (!el) return
        const obj = { val: 0 }
        ScrollTrigger.create({
          trigger: bannerRef.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              val: target,
              duration: 1.8,
              ease: 'power2.out',
              onUpdate: () => {
                if (decimal) {
                  el.textContent = obj.val.toFixed(1) + suffix
                } else if (target >= 1000) {
                  el.textContent = Math.floor(obj.val).toLocaleString() + suffix
                } else {
                  el.textContent = Math.floor(obj.val) + suffix
                }
              },
            })
          },
        })
      }

      animateStat('meals', 3800, '+')
      animateStat('protein', 49, 'G AVG')
      animateStat('rating', 4.9, '★', true)

      gsap.fromTo(
        '.review-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.reviews-grid',
            start: 'top 80%',
            once: true,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{ background: 'var(--iron-bg)' }}>
      {/* Stats Banner */}
      <div
        ref={bannerRef}
        style={{
          background: 'var(--iron-orange)',
          padding: '28px clamp(24px, 5vw, 48px)',
          display: 'flex',
          alignItems: 'stretch',
          flexWrap: 'wrap',
          gap: 0,
        }}
      >
        {STATS.map((stat, i) => (
          <div
            key={stat.id}
            style={{
              flex: '1 1 180px',
              textAlign: 'center',
              padding: '8px 16px',
              borderRight: i < STATS.length - 1 ? '1px solid rgba(245,240,232,0.3)' : 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {stat.static ? (
              <>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(28px, 4vw, 52px)',
                    color: 'var(--iron-cream)',
                    lineHeight: 1,
                    display: 'block',
                  }}
                >
                  EAST LONDON&apos;S
                </span>
              </>
            ) : (
              <span
                id={`stat-${stat.id}`}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 4vw, 52px)',
                  color: 'var(--iron-cream)',
                  lineHeight: 1,
                  display: 'block',
                }}
              >
                0
              </span>
            )}
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'rgba(245,240,232,0.7)',
                letterSpacing: 2,
                marginTop: 6,
                display: 'block',
              }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Review Cards */}
      <div
        className="reviews-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 1,
          background: 'var(--iron-border)',
        }}
      >
        {REVIEWS.map((review) => (
          <div
            key={review.initials}
            className="review-card"
            style={{
              background: 'var(--iron-surface)',
              border: '1px solid var(--iron-border)',
              borderLeft: '3px solid var(--iron-orange)',
              padding: '28px 32px',
            }}
          >
            {/* Stars */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#E8501A" color="#E8501A" />
              ))}
            </div>

            {/* Quote */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 15,
                fontStyle: 'italic',
                color: 'var(--iron-cream)',
                lineHeight: 1.7,
                marginBottom: 20,
              }}
            >
              {review.text}
            </p>

            {/* Author row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'var(--iron-elevated)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 18,
                    color: 'var(--iron-orange)',
                  }}
                >
                  {review.initials}
                </span>
              </div>
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    fontWeight: 700,
                    color: 'var(--iron-cream)',
                  }}
                >
                  {review.name}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    color: 'var(--iron-muted)',
                    letterSpacing: 1,
                  }}
                >
                  Verified Order
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
