'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MENU } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

export default function MenuGrid() {
  const sectionRef = useRef<HTMLElement>(null)

  const scrollToOrder = () =>
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.menu-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.menu-grid',
            start: 'top 75%',
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
        background: 'var(--iron-bg)',
        padding: 'clamp(64px, 8vw, 120px) clamp(16px, 4vw, 80px)',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <p className="section-label" style={{ marginBottom: 16 }}>— FULL MENU —</p>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 8vw, 80px)',
            color: 'var(--iron-cream)',
            letterSpacing: 4,
            lineHeight: 1,
          }}
        >
          PICK YOUR <span style={{ color: 'var(--iron-orange)' }}>FUEL</span>
        </h2>
      </div>

      {/* Grid */}
      <div
        className="menu-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 2,
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        {MENU.map((item) => (
          <MenuCard key={item.id} item={item} onOrder={scrollToOrder} />
        ))}
      </div>
    </section>
  )
}

function MenuCard({
  item,
  onOrder,
}: {
  item: (typeof MENU)[0]
  onOrder: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="menu-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--iron-surface)',
        border: '1px solid var(--iron-border)',
        borderLeft: hovered ? '3px solid var(--iron-orange)' : '3px solid transparent',
        overflow: 'hidden',
        cursor: 'pointer',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 0.3s ease, border-left 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image — top 65% */}
      <div
        style={{
          position: 'relative',
          paddingTop: '86.67%', /* 3:4 aspect → image at 65% = ~130% of width × 65% ≈ proper aspect */
          overflow: 'hidden',
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
              fontSize: 20,
              color: 'var(--iron-muted)',
              letterSpacing: 2,
              textAlign: 'center',
              padding: '0 16px',
            }}
          >
            {item.name}
          </span>
        </div>
        <Image
          src={item.image}
          alt={item.name}
          fill
          style={{
            objectFit: 'cover',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.4s ease',
            zIndex: 1,
          }}
          onError={() => {}}
        />
        {/* Tag badge */}
        <div
          style={{
            position: 'absolute',
            top: 14,
            left: 14,
            zIndex: 2,
          }}
        >
          <span className="macro-pill" style={{ fontSize: 10, padding: '4px 10px' }}>
            {item.tag}
          </span>
        </div>
      </div>

      {/* Content — bottom 35% */}
      <div style={{ padding: '20px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 28,
            color: 'var(--iron-cream)',
            letterSpacing: 1,
            lineHeight: 1,
          }}
        >
          {item.name}
        </h3>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            color: 'var(--iron-muted)',
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            marginBottom: 4,
          }}
        >
          {item.desc}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span className="macro-pill">{item.protein}G PROTEIN</span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--iron-muted)',
              letterSpacing: 1,
            }}
          >
            {item.kcal} KCAL
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 'auto',
            paddingTop: 8,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 22,
              fontWeight: 700,
              color: 'var(--iron-cream)',
            }}
          >
            {item.price}
          </span>
          <button
            onClick={onOrder}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              color: 'var(--iron-orange)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              letterSpacing: 1,
              padding: 0,
              transition: 'opacity 0.2s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.7')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
          >
            ORDER →
          </button>
        </div>
      </div>
    </div>
  )
}
