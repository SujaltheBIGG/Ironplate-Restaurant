'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextReveal from '@/components/TextReveal'

gsap.registerPlugin(ScrollTrigger)

const PILLARS = [
  {
    number: '01',
    title: 'PROTEIN FIRST. ALWAYS.',
    body: 'Every dish on our menu is engineered around a minimum of 40g of protein. We calculate macros before we finalise flavour. Performance is the brief — taste is the craft.',
    tag: '40G MINIMUM',
  },
  {
    number: '02',
    title: 'NO SHORTCUTS. EVER.',
    body: 'Our patties are hand-smashed to order. Our sauces are made fresh daily. We source British beef from farms within 100 miles of the restaurant. If it can be done properly, we do it properly.',
    tag: 'BRITISH BEEF',
  },
  {
    number: '03',
    title: 'BUILT FOR THE GRIND.',
    body: 'IRONPLATE was designed around people who train hard and eat with purpose. Whether it is post-leg day or pre-shift, every meal is built to fuel whatever comes next.',
    tag: 'EAST LONDON',
  },
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Origin story — content
      gsap.fromTo('.about-label',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
          scrollTrigger: { trigger: '.about-origin', start: 'top 75%' } })

      gsap.fromTo('.about-headline',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-origin', start: 'top 75%' } })

      // Disabled body paragraph animations for performance - using TextReveal instead
      // gsap.fromTo('.about-body p',
      //   { opacity: 0, y: 24 },
      //   { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, delay: 0.3, ease: 'power2.out',
      //     scrollTrigger: { trigger: '.about-origin', start: 'top 75%' } })



      gsap.fromTo('.about-badges',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: '.about-origin', start: 'top 75%' } })

      // Pillars
      gsap.fromTo('.pillars-header',
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: '.about-pillars', start: 'top 78%' } })

      gsap.fromTo('.pillar-card',
        { opacity: 0, y: 48 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.14, delay: 0.2, ease: 'power2.out',
          scrollTrigger: { trigger: '.about-pillars', start: 'top 78%' } })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef}>
      {/* ── SUB-SECTION A: Origin Story ── */}
      <div
        className="about-origin flex flex-col items-center text-center px-6 md:px-10 lg:px-20"
        style={{
          background: 'var(--iron-bg)',
          paddingTop: '160px',
          paddingBottom: '100px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '800px' }}>
          <TextReveal delay={0}>
            <p className="about-label section-label" style={{ marginBottom: 24 }}>
              — WHO WE ARE —
            </p>
          </TextReveal>

          <TextReveal delay={0.1}>
            <h2
              className="about-headline"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(56px, 7vw, 96px)',
                lineHeight: 0.88,
                color: 'var(--iron-cream)',
                marginBottom: 48,
              }}
            >
              BUILT IN EAST LONDON.<br />
              FUELLED BY <span style={{ color: 'var(--iron-orange)' }}>OBSESSION.</span>
            </h2>
          </TextReveal>

          <div className="about-body" style={{ maxWidth: 640 }}>
            <TextReveal delay={0.2}>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 17,
                color: 'var(--iron-muted)',
                lineHeight: 1.8,
                marginBottom: 24,
              }}>
                IRONPLATE™ was born in 2021 in a 12-seat kitchen off Bethnal Green Road.
                Chef Marcus Webb spent three years testing smash techniques before serving
                a single burger to the public.
              </p>
            </TextReveal>
            <TextReveal delay={0.3}>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 17,
                color: 'var(--iron-muted)',
                lineHeight: 1.8,
              }}>
                The rule was simple: every item on the menu had to hit 40g of protein or
                it did not go on the board. No compromises on flavour. No shortcuts on
                sourcing. Just honest, high-performance food built for people who train hard.
                Today we serve over 3,800 meals a week across East London — and the
                rule has never changed.
              </p>
            </TextReveal>
          </div>



          {/* Year badges */}
          <div
            className="about-badges"
            style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 40, flexWrap: 'wrap' }}
          >
            {['EST. 2021', 'SHOREDITCH, E1', '40G+ EVERY ITEM'].map((badge) => (
              <span key={badge} className="macro-pill">{badge}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── SUB-SECTION B: Pillars Strip ── */}
      <div
        className="about-pillars px-6 md:px-10 lg:px-20"
        style={{
          background: 'var(--iron-bg)',
          borderBottom: '1px solid var(--iron-border)',
          paddingTop: '100px',
          paddingBottom: '120px',
        }}
      >
        {/* Header */}
        <div
          className="pillars-header"
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <TextReveal delay={0}>
            <p className="section-label" style={{ marginBottom: 16 }}>
            — WHAT WE STAND FOR —
          </p>
          </TextReveal>
          <TextReveal delay={0.1}>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(48px, 6vw, 80px)',
              lineHeight: 0.9,
              color: 'var(--iron-cream)',
            }}>
              THREE RULES.{' '}
              <span style={{ color: 'var(--iron-orange)' }}>NO EXCEPTIONS.</span>
            </h3>
          </TextReveal>
        </div>

        {/* Pillar cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px]">
          {PILLARS.map((pillar, index) => (
            <div
              key={pillar.number}
              className={`pillar-card ${index === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}
              style={{
                background: 'var(--iron-surface)',
                border: '1px solid var(--iron-border)',
                borderTop: '3px solid var(--iron-orange)',
                padding: '40px 36px',
              }}
            >
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 72,
                color: 'var(--iron-orange)',
                lineHeight: 1,
                marginBottom: 16,
              }}>
                {pillar.number}
              </p>
              <h4 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 32,
                color: 'var(--iron-cream)',
                lineHeight: 1,
                marginBottom: 16,
              }}>
                {pillar.title}
              </h4>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 15,
                color: 'var(--iron-muted)',
                lineHeight: 1.7,
                maxWidth: 320,
              }}>
                {pillar.body}
              </p>
              <span className="macro-pill" style={{ display: 'inline-block', marginTop: 24 }}>
                {pillar.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
