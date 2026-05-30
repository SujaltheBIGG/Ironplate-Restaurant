'use client'

import { useEffect, useRef } from 'react'

/* ── data ── */
const NAV_LINKS = ['Home', 'About Us', 'Community', 'Menu']
const ACCOUNT_LINKS = ['Login', 'Register']
const SOCIAL_LINKS = ['Facebook', 'Instagram', 'Tiktok']

/* ── grid SVG background ── */
const gridSvg = `<svg width="80" height="80" xmlns="http://www.w3.org/2000/svg"><path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="0.5"/><line x1="0" y1="0" x2="6" y2="0" stroke="rgba(255,255,255,0.14)" stroke-width="1"/><line x1="74" y1="0" x2="80" y2="0" stroke="rgba(255,255,255,0.14)" stroke-width="1"/><line x1="0" y1="0" x2="0" y2="6" stroke="rgba(255,255,255,0.14)" stroke-width="1"/><line x1="0" y1="74" x2="0" y2="80" stroke="rgba(255,255,255,0.14)" stroke-width="1"/></svg>`

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  /* hover helpers */
  const linkEnter = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.color = '#E07A5F'
    e.currentTarget.style.transform = 'translateX(4px)'
  }
  const linkLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.color = 'rgba(255,255,255,0.65)'
    e.currentTarget.style.transform = 'translateX(0)'
  }
  const linkLeaveWhite = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.color = '#fff'
    e.currentTarget.style.transform = 'translateX(0)'
  }

  /* ── shared link style ── */
  const linkStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    fontSize: 15,
    color: 'rgba(255,255,255,0.65)',
    lineHeight: 2.2,
    display: 'block',
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    textAlign: 'left',
    textDecoration: 'none',
    transition: 'color 0.25s ease, transform 0.25s ease',
  }

  const headingLinkStyle: React.CSSProperties = {
    ...linkStyle,
    color: '#fff',
    fontWeight: 600,
  }

  return (
    <footer
      ref={footerRef}
      style={{
        background: '#111111',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Grid pattern background ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(gridSvg)}")`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* ── 4-Column Info Grid ── */}
      <div
        className="footer-info-grid"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: 'clamp(48px, 6vw, 80px) clamp(28px, 5vw, 72px) clamp(40px, 5vw, 64px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 24,
        }}
      >
        {/* Column 1 – Navigation */}
        <div>
          {NAV_LINKS.map((link, i) => (
            <button
              key={link}
              style={i === 0 ? headingLinkStyle : linkStyle}
              onMouseEnter={i === 0 ? (e) => { e.currentTarget.style.color = '#E07A5F'; e.currentTarget.style.transform = 'translateX(4px)' } : linkEnter}
              onMouseLeave={i === 0 ? linkLeaveWhite : linkLeave}
            >
              {link}
            </button>
          ))}
        </div>

        {/* Column 2 – Account */}
        <div>
          {ACCOUNT_LINKS.map((link) => (
            <button
              key={link}
              style={linkStyle}
              onMouseEnter={linkEnter}
              onMouseLeave={linkLeave}
            >
              {link}
            </button>
          ))}
        </div>

        {/* Column 3 – Social Media */}
        <div style={{ textAlign: 'right' }}>
          {SOCIAL_LINKS.map((link) => (
            <button
              key={link}
              style={{ ...linkStyle, textAlign: 'right', marginLeft: 'auto' }}
              onMouseEnter={linkEnter}
              onMouseLeave={linkLeave}
            >
              {link}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile: Social links inline with nav */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '0 clamp(28px, 5vw, 72px) clamp(24px, 4vw, 40px)',
          display: 'none',
          gap: 16,
          flexWrap: 'wrap',
        }}
        className="mobile-social-links"
      >
        {SOCIAL_LINKS.map((link) => (
          <button
            key={link}
            style={{
              ...linkStyle,
              fontSize: 14,
              display: 'inline-block',
              marginRight: 16,
            }}
            onMouseEnter={linkEnter}
            onMouseLeave={linkLeave}
          >
            {link}
          </button>
        ))}
      </div>

      {/* ── Giant Brand Name ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '0 clamp(16px, 2vw, 40px)',
          overflow: 'hidden',
        }}
      >
        {/* Orange glow from bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            height: 260,
            background:
              'radial-gradient(ellipse 60% 100% at 50% 100%, rgba(224,122,95,0.30) 0%, rgba(224,122,95,0.12) 30%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 10vw, 240px)',
              lineHeight: 0.82,
              color: 'var(--iron-cream)',
              letterSpacing: '0.01em',
              fontWeight: 700,
              userSelect: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            IRON<span style={{ color: 'var(--iron-orange)' }}>PLATE</span>™
          </h2>

          {/* Scroll-to-top button */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            style={{
              width: 'clamp(48px, 8vw, 72px)',
              height: 'clamp(48px, 8vw, 72px)',
              borderRadius: '50%',
              background: '#E07A5F',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginBottom: 24,
              transition: 'transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
              boxShadow: '0 4px 24px rgba(224,122,95,0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.12)'
              e.currentTarget.style.background = '#D06A4F'
              e.currentTarget.style.boxShadow = '0 6px 32px rgba(224,122,95,0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.background = '#E07A5F'
              e.currentTarget.style.boxShadow = '0 4px 24px rgba(224,122,95,0.3)'
            }}
          >
            <svg
              width="clamp(14px, 2.5vw, 22px)"
              height="clamp(14px, 2.5vw, 22px)"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Bottom Sub-Footer ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '20px clamp(28px, 5vw, 72px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.02em',
          }}
        >
          © All rights reserved 2026
        </span>
        <div style={{ display: 'flex', gap: 32 }}>
          {['Terms and Conditions', 'Privacy Policy'].map((text) => (
            <button
              key={text}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                color: 'rgba(255,255,255,0.4)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                letterSpacing: '0.02em',
                transition: 'color 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#E07A5F')}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')
              }
            >
              {text}
            </button>
          ))}
        </div>
      </div>
    </footer>
  )
}
