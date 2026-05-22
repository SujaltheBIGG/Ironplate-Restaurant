'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight, ThumbsUp, ThumbsDown, Star } from 'lucide-react'
import { MENU } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

export default function DishShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<'overview' | 'ingredients'>('overview')
  const dish = MENU[activeIndex]

  const prev = () => setActiveIndex((i) => (i - 1 + MENU.length) % MENU.length)
  const next = () => setActiveIndex((i) => (i + 1) % MENU.length)

  const nameParts = dish.name.split(' ')
  const lastName = nameParts[nameParts.length - 1]
  const firstParts = nameParts.slice(0, -1).join(' ')

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.showcase-left',
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
        }
      )
      gsap.fromTo(
        '.showcase-right',
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.1,
          ease: 'power2.out',
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
    <section
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        width: '100%',
        background: 'var(--iron-bg)',
        display: 'flex',
        alignItems: 'stretch',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Radial orange glow bottom */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 70% 50% at 30% 80%, rgba(232,80,26,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          display: 'flex',
          width: '100%',
          minHeight: '100vh',
          alignItems: 'center',
          padding: 'clamp(80px, 8vw, 120px) clamp(24px, 5vw, 80px)',
          gap: 48,
          flexWrap: 'wrap',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* LEFT COLUMN — 58% */}
        <div
          className="showcase-left"
          style={{
            flex: '0 0 clamp(320px, 58%, 640px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 32,
          }}
        >
          <div>
            <p className="section-label" style={{ marginBottom: 12 }}>{dish.tag}</p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(56px, 7vw, 100px)',
                lineHeight: 0.9,
                color: 'var(--iron-cream)',
                letterSpacing: '0.02em',
              }}
            >
              {firstParts}{firstParts && <br />}
              <span style={{ color: 'var(--iron-orange)' }}>{lastName}</span>
            </h2>
          </div>

          {/* Circular dish image */}
          <div
            style={{
              width: 'clamp(280px, 35vw, 420px)',
              height: 'clamp(280px, 35vw, 420px)',
              borderRadius: '50%',
              border: '4px solid var(--iron-orange)',
              boxShadow: '0 0 60px var(--iron-orange-glow)',
              overflow: 'hidden',
              position: 'relative',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'var(--iron-elevated)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 28,
                  color: 'var(--iron-muted)',
                  textAlign: 'center',
                  padding: '0 24px',
                  letterSpacing: 2,
                }}
              >
                {dish.name}
              </span>
            </div>
            <Image
              src={dish.image}
              alt={dish.name}
              fill
              style={{ objectFit: 'cover', zIndex: 1 }}
              onError={() => {}}
            />
          </div>

          {/* Action row */}
          <div style={{ display: 'flex', gap: 16 }}>
            <button
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                color: 'var(--iron-cream)',
                background: 'transparent',
                border: '1px solid var(--iron-border)',
                padding: '10px 20px',
                cursor: 'pointer',
                letterSpacing: 1,
                transition: 'border-color 0.2s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.borderColor = 'var(--iron-border-hot)')}
              onMouseOut={(e) => (e.currentTarget.style.borderColor = 'var(--iron-border)')}
            >
              ▶ Play video
            </button>
            <button
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                color: 'var(--iron-orange)',
                background: 'transparent',
                border: '1px solid var(--iron-border-hot)',
                padding: '10px 20px',
                cursor: 'pointer',
                letterSpacing: 1,
                transition: 'background 0.2s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = 'var(--iron-orange-dim)')}
              onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              🍽 Order food
            </button>
          </div>

          {/* Thumbnail strip */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={prev}
              style={{
                background: 'transparent',
                border: '1px solid var(--iron-border)',
                color: 'var(--iron-cream)',
                padding: 6,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                transition: 'border-color 0.2s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.borderColor = 'var(--iron-orange)')}
              onMouseOut={(e) => (e.currentTarget.style.borderColor = 'var(--iron-border)')}
            >
              <ChevronLeft size={16} />
            </button>

            {MENU.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setActiveIndex(i)}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  border: i === activeIndex ? '3px solid var(--iron-orange)' : '3px solid transparent',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  opacity: i === activeIndex ? 1 : 0.5,
                  transition: 'opacity 0.2s ease, border-color 0.2s ease',
                  position: 'relative',
                  flexShrink: 0,
                  background: 'var(--iron-elevated)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-display)',
                    fontSize: 9,
                    color: 'var(--iron-muted)',
                    textAlign: 'center',
                    padding: 4,
                    lineHeight: 1.1,
                  }}
                >
                  {item.name.split(' ').slice(0, 2).join(' ')}
                </div>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  style={{ objectFit: 'cover', zIndex: 1 }}
                  onError={() => {}}
                />
              </button>
            ))}

            <button
              onClick={next}
              style={{
                background: 'transparent',
                border: '1px solid var(--iron-border)',
                color: 'var(--iron-cream)',
                padding: 6,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                transition: 'border-color 0.2s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.borderColor = 'var(--iron-orange)')}
              onMouseOut={(e) => (e.currentTarget.style.borderColor = 'var(--iron-border)')}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN — 42% */}
        <div
          className="showcase-right"
          style={{
            flex: '1 1 320px',
            maxWidth: 480,
          }}
        >
          <div
            style={{
              background: 'var(--iron-surface)',
              border: '1px solid var(--iron-border)',
              padding: 32,
              borderRadius: 16,
            }}
          >
            {/* Tabs */}
            <div
              style={{
                display: 'flex',
                gap: 0,
                borderBottom: '1px solid var(--iron-border)',
                marginBottom: 28,
              }}
            >
              {(['overview', 'ingredients'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: 1,
                    textTransform: 'capitalize',
                    color: activeTab === tab ? 'var(--iron-cream)' : 'var(--iron-muted)',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: activeTab === tab ? '2px solid var(--iron-orange)' : '2px solid transparent',
                    padding: '0 0 12px 0',
                    marginRight: 24,
                    cursor: 'pointer',
                    transition: 'color 0.2s ease',
                    marginBottom: -1,
                  }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Rating block */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 24 }}>
              <div
                style={{
                  background: 'var(--iron-orange)',
                  borderRadius: 12,
                  padding: '12px 18px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: 72,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 48,
                    color: 'var(--iron-cream)',
                    lineHeight: 1,
                  }}
                >
                  {dish.rating}
                </span>
                <Star size={16} fill="#F5F0E8" color="#F5F0E8" style={{ marginTop: 4 }} />
              </div>

              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 20,
                    fontWeight: 700,
                    color: 'var(--iron-cream)',
                    marginBottom: 4,
                  }}
                >
                  {dish.chef}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    color: 'var(--iron-muted)',
                    letterSpacing: 1,
                    marginBottom: 12,
                  }}
                >
                  {dish.kitchen} · Shoreditch
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 15,
                    fontStyle: 'italic',
                    color: 'var(--iron-muted)',
                    lineHeight: 1.6,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  &ldquo;{dish.quote}&rdquo;
                </p>
              </div>
            </div>

            <hr className="rule-hot" style={{ marginBottom: 24 }} />

            {/* Protein display */}
            <div style={{ marginBottom: 24 }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 64,
                  color: 'var(--iron-orange)',
                  lineHeight: 1,
                  display: 'block',
                  letterSpacing: 2,
                }}
              >
                {dish.protein}G
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: 'var(--iron-muted)',
                  letterSpacing: 4,
                }}
              >
                PROTEIN
              </span>
            </div>

            {/* Like row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                color: 'var(--iron-muted)',
              }}
            >
              <ThumbsUp size={14} />
              <span>{dish.likes}</span>
              <span style={{ opacity: 0.4 }}>|</span>
              <ThumbsDown size={14} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
