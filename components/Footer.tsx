'use client'

const NAV_COL1 = ['Order Now', 'Our Menu', 'Our Story', 'Find Us', 'Contact']
const NAV_COL2 = ['Delivery Info', 'Allergens', 'Nutrition Info']
const CONTACT_LINES = ['hello@ironplate.co', '+44 20 7946 0123', '14 Bethnal Green Road', 'Shoreditch, London E1 6GY']
const SOCIAL = ['Instagram', 'X (Twitter)', 'TikTok']

const gridSvg = `<svg width="80" height="80" xmlns="http://www.w3.org/2000/svg"><path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255,255,255,0.045)" stroke-width="0.5"/><line x1="0" y1="0" x2="7" y2="0" stroke="rgba(255,255,255,0.18)" stroke-width="1"/><line x1="73" y1="0" x2="80" y2="0" stroke="rgba(255,255,255,0.18)" stroke-width="1"/><line x1="0" y1="0" x2="0" y2="7" stroke="rgba(255,255,255,0.18)" stroke-width="1"/><line x1="0" y1="73" x2="0" y2="80" stroke="rgba(255,255,255,0.18)" stroke-width="1"/></svg>`

const muted: React.CSSProperties = { fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--iron-muted)', lineHeight: 2.1, display: 'block', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', transition: 'color 0.2s ease' }

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const hover = (e: React.MouseEvent<HTMLElement>, on: boolean) => { (e.currentTarget as HTMLElement).style.color = on ? 'var(--iron-cream)' : 'var(--iron-muted)' }

  return (
    <footer style={{ background: '#080808', position: 'relative', overflow: 'hidden', borderTop: '1px solid var(--iron-border)' }}>

      {/* Grid background */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(gridSvg)}")`,
        backgroundSize: '80px 80px',
      }} />

      {/* Info row */}
      <div className="footer-info-grid" style={{ position: 'relative', zIndex: 1, padding: 'clamp(40px,5vw,64px) clamp(24px,5vw,64px) clamp(36px,4vw,56px)' }}>
        <div>
          {NAV_COL1.map((l) => (
            <button key={l} style={{ ...muted, fontWeight: l === 'Order Now' ? 700 : 400, color: l === 'Order Now' ? 'var(--iron-cream)' : 'var(--iron-muted)' }}
              onClick={() => l === 'Order Now' ? scrollTo('order') : undefined}
              onMouseOver={(e) => hover(e, true)} onMouseOut={(e) => hover(e, false)}
            >{l}</button>
          ))}
        </div>
        <div>
          {NAV_COL2.map((l) => <button key={l} style={muted} onMouseOver={(e) => hover(e, true)} onMouseOut={(e) => hover(e, false)}>{l}</button>)}
        </div>
        <div>
          {CONTACT_LINES.map((l) => <span key={l} style={{ ...muted, cursor: 'default' }}>{l}</span>)}
        </div>
        <div>
          {SOCIAL.map((l) => <button key={l} style={muted} onMouseOver={(e) => hover(e, true)} onMouseOut={(e) => hover(e, false)}>{l}</button>)}
        </div>
      </div>

      {/* Wordmark row */}
      <div style={{ position: 'relative', zIndex: 1, padding: '0 clamp(12px,2vw,32px)', overflow: 'hidden' }}>
        {/* Orange glow */}
        <div style={{
          position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: '80%', height: 220,
          background: 'radial-gradient(ellipse 70% 100% at 50% 100%, rgba(232,80,26,0.28) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(72px, 17vw, 240px)',
            lineHeight: 0.82,
            color: 'var(--iron-cream)',
            letterSpacing: '0.01em',
            userSelect: 'none',
          }}>
            IRON<span style={{ color: 'var(--iron-orange)' }}>PLATE</span>™
          </h2>

          <button onClick={scrollToTop} aria-label="Scroll to top" style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'var(--iron-orange)', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, marginBottom: 20,
            transition: 'transform 0.2s ease, background 0.2s ease',
          }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.background = '#D04415' }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = 'var(--iron-orange)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom strip */}
      <div style={{
        position: 'relative', zIndex: 1,
        borderTop: '1px solid var(--iron-border)',
        padding: '18px clamp(24px,5vw,64px)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
      }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--iron-muted)' }}>
          © 2025 IRONPLATE™ · Shoreditch, London · All rights reserved
        </span>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Terms & Conditions', 'Privacy Policy'].map((t) => (
            <button key={t} style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--iron-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, transition: 'color 0.2s ease' }}
              onMouseOver={(e) => (e.currentTarget.style.color = 'var(--iron-cream)')}
              onMouseOut={(e) => (e.currentTarget.style.color = 'var(--iron-muted)')}
            >{t}</button>
          ))}
        </div>
      </div>
    </footer>
  )
}
