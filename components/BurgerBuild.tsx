'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { INGREDIENTS } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

export default function BurgerBuild() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const totalProtein = INGREDIENTS.slice(0, activeIndex + 1).reduce((acc, ing) => acc + ing.protein, 0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true })

      INGREDIENTS.forEach((_, i) => {
        tl.fromTo(
          `.ingredient-layer-${i}`,
          { y: -120, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'bounce.out',
            onStart: () => setActiveIndex(i),
          },
          i * 0.45
        )
      })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
        onEnter: () => tl.play(),
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const activeIngredient = INGREDIENTS[activeIndex]

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        position: 'relative',
        background: 'var(--iron-bg)',
      }}
    >
      <div
        style={{
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(232,80,26,0.12) 0%, transparent 70%)',
        }}
      >
        {/* Section title */}
        <div
          style={{
            position: 'absolute',
            top: 48,
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            zIndex: 10,
          }}
        >
          <p className="section-label" style={{ marginBottom: 8 }}>WATCH IT BUILD</p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 5vw, 64px)',
              color: 'var(--iron-cream)',
              letterSpacing: 4,
              lineHeight: 1,
            }}
          >
            THE <span style={{ color: 'var(--iron-orange)' }}>BEAST</span> SMASH
          </h2>
        </div>

        {/* Running protein counter — top right */}
        <div
          style={{
            position: 'absolute',
            top: 48,
            right: 48,
            textAlign: 'right',
            zIndex: 10,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 72,
              color: 'var(--iron-orange)',
              lineHeight: 1,
              display: 'block',
            }}
          >
            {totalProtein}G
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'var(--iron-muted)',
              letterSpacing: 3,
            }}
          >
            PROTEIN SO FAR
          </span>
        </div>

        {/* Burger stack */}
        <div
          style={{
            position: 'relative',
            width: 'clamp(260px, 28vw, 420px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0,
            zIndex: 5,
            marginTop: 80,
          }}
        >
          {/* Render ingredients bottom → top (reverse order for visual stacking) */}
          {[...INGREDIENTS].reverse().map((ing, reverseIdx) => {
            const i = INGREDIENTS.length - 1 - reverseIdx
            return (
              <div
                key={i}
                className={`ingredient-layer-${i}`}
                style={{
                  width: '100%',
                  height: ing.height,
                  background: ing.color,
                  border: `1px solid rgba(255,255,255,0.05)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  opacity: 0,
                  borderRadius: i === INGREDIENTS.length - 1 ? '50% 50% 0 0' : i === 0 ? '0 0 50% 50%' : 0,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 9,
                    color: 'rgba(245,240,232,0.5)',
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                  }}
                >
                  {ing.label}
                </span>
              </div>
            )
          })}
        </div>

        {/* Active ingredient label — right panel */}
        <div
          style={{
            position: 'absolute',
            right: 48,
            bottom: '35%',
            textAlign: 'right',
            zIndex: 10,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(24px, 3vw, 36px)',
              color: 'var(--iron-cream)',
              lineHeight: 1.1,
              letterSpacing: 2,
              marginBottom: 6,
              transition: 'opacity 0.3s ease',
            }}
          >
            {activeIngredient?.label?.toUpperCase()}
          </p>
          {activeIngredient?.protein > 0 && (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 14,
                color: 'var(--iron-orange)',
                letterSpacing: 2,
              }}
            >
              +{activeIngredient.protein}G PROTEIN
            </span>
          )}
        </div>

        {/* Progress indicator — left */}
        <div
          style={{
            position: 'absolute',
            left: 48,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            zIndex: 10,
          }}
        >
          {INGREDIENTS.map((_, i) => (
            <div
              key={i}
              style={{
                width: 3,
                height: 20,
                background: i <= activeIndex ? 'var(--iron-orange)' : 'var(--iron-border)',
                transition: 'background 0.3s ease',
                borderRadius: 2,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
