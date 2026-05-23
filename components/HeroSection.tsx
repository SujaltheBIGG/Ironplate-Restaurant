'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const totalFrames = 307
  const startFrameNumber = 86400
  const imagesRef = useRef<HTMLImageElement[]>([])

  const scrollToOrder = () =>
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })

  // Lazy load frames on demand instead of preloading all
  useEffect(() => {
    const loadImage = (index: number): HTMLImageElement => {
      const frameNumber = (startFrameNumber + index).toString().padStart(8, '0')
      const img = new Image()
      img.src = `/jpeg-frames/Website Animation${frameNumber}.jpg`
      return img
    }

    // Preload first 10 frames for immediate display, rest will load on demand
    const initialLoad = async () => {
      const loadedImages: HTMLImageElement[] = []
      const promises: Promise<void>[] = []

      for (let i = 0; i < Math.min(10, totalFrames); i++) {
        const img = loadImage(i)
        const promise = new Promise<void>((resolve) => {
          img.onload = () => resolve()
          img.onerror = () => resolve()
        })
        promises.push(promise)
        loadedImages.push(img)
      }

      await Promise.all(promises)
      
      // Fill remaining slots with empty images that will load on demand
      for (let i = 10; i < totalFrames; i++) {
        loadedImages.push(loadImage(i))
      }

      imagesRef.current = loadedImages
      setImagesLoaded(true)
    }

    initialLoad()
  }, [totalFrames, startFrameNumber])

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

  useEffect(() => {
    if (!sectionRef.current || !imagesLoaded || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true })
    if (!ctx) return

    const content = sectionRef.current.querySelector('.hero-content') as HTMLDivElement
    const ingredientsAnnotations = sectionRef.current.querySelector('.ingredients-annotations') as HTMLDivElement
    const productDescription = sectionRef.current.querySelector('.product-description') as HTMLDivElement

    // Force canvas drawing buffer to match high-density displays
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      const displayWidth = canvas.clientWidth || window.innerWidth
      const displayHeight = canvas.clientHeight || window.innerHeight

      if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
        canvas.width = displayWidth * dpr
        canvas.height = displayHeight * dpr
        ctx.scale(dpr, dpr)
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create ScrollTrigger for text fade with exact settings
    if (content) {
      gsap.to(content, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'top -30%',
          scrub: true,
        },
        opacity: 0,
        pointerEvents: 'none',
      })
    }

    // Create ScrollTrigger for ingredients fade-in when burger is fully exploded
    if (ingredientsAnnotations) {
      gsap.to(ingredientsAnnotations, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=3000',
          scrub: true,
          onUpdate: (self) => {
            // Fade in ingredients starting at 15% progress, fully visible by 40%
            // Gradual fade out starting at 60% progress, fully gone by 75%
            if (self.progress < 0.15) {
              ingredientsAnnotations.style.opacity = '0'
              ingredientsAnnotations.style.pointerEvents = 'none'
            } else if (self.progress >= 0.15 && self.progress < 0.40) {
              // Fade in
              const fadeProgress = (self.progress - 0.15) * 4
              ingredientsAnnotations.style.opacity = Math.min(fadeProgress, 1).toString()
              ingredientsAnnotations.style.pointerEvents = 'auto'
            } else if (self.progress >= 0.40 && self.progress < 0.60) {
              // Fully visible
              ingredientsAnnotations.style.opacity = '1'
              ingredientsAnnotations.style.pointerEvents = 'auto'
            } else if (self.progress >= 0.60 && self.progress < 0.75) {
              // Fade out
              const fadeProgress = 1 - ((self.progress - 0.60) * 6.67)
              ingredientsAnnotations.style.opacity = Math.max(fadeProgress, 0).toString()
              ingredientsAnnotations.style.pointerEvents = 'auto'
            } else {
              // Fully gone
              ingredientsAnnotations.style.opacity = '0'
              ingredientsAnnotations.style.pointerEvents = 'none'
            }
          },
        },
      })
    }

    // Create ScrollTrigger for product description fade-in after ingredients fade out
    if (productDescription) {
      gsap.to(productDescription, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=3000',
          scrub: true,
          onUpdate: (self) => {
            // Fade in product description starting at 75% progress, fully visible by 90%
            if (self.progress < 0.75) {
              productDescription.style.opacity = '0'
              productDescription.style.visibility = 'hidden'
              productDescription.style.transform = 'translateY(-50%) translateY(30px)'
            } else if (self.progress >= 0.75 && self.progress < 0.90) {
              // Fade in
              const fadeProgress = (self.progress - 0.75) * 6.67
              const translateY = 30 * (1 - fadeProgress)
              productDescription.style.opacity = Math.min(fadeProgress, 1).toString()
              productDescription.style.visibility = 'visible'
              productDescription.style.transform = `translateY(-50%) translateY(${translateY}px)`
            } else {
              // Fully visible
              productDescription.style.opacity = '1'
              productDescription.style.visibility = 'visible'
              productDescription.style.transform = 'translateY(-50%) translateY(0)'
            }
          },
        },
      })
    }

    // Create ScrollTrigger for pinned animation
    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=3000',
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress

        // Calculate current frame based on scroll progress
        const frameIndex = Math.min(Math.floor(progress * totalFrames), totalFrames - 1)
        const currentImage = imagesRef.current[frameIndex]

        if (content) {
          content.style.transform = `translateY(${progress * -80}px)`
        }

        // Fade out hero section at the end
        if (progress > 0.85) {
          const fadeProgress = (progress - 0.85) * 6.67
          sectionRef.current!.style.opacity = Math.max(1 - fadeProgress, 0).toString()
        }

        // Draw current frame to canvas
        if (currentImage && ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(currentImage, 0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1))
        }
      },
    })

    return () => {
      scrollTrigger.kill()
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [imagesLoaded, totalFrames])

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
        zIndex: 1,
      }}
    >
      {/* Background canvas with scroll-based animation */}
      {imagesLoaded && (
        <canvas
          ref={canvasRef}
          className="hero-canvas"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1,
            opacity: 1,
            willChange: 'transform',
            transform: 'translateZ(0)',
            WebkitTransform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        />
      )}

      {/* Ingredients annotations */}
      <div
        className="ingredients-annotations"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 5,
          pointerEvents: 'none',
          opacity: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 'clamp(32px, 5vw, 80px)',
            top: 'clamp(100px, 15vh, 150px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '28px',
          }}
        >
          <div className="ingredient-item ingredient-left" data-ingredient="lettuce">
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', color: 'var(--iron-muted)', letterSpacing: '1px' }}>LETTUCE</span>
            <div style={{ width: '40px', height: '1px', background: 'var(--iron-orange)', marginTop: '4px' }} />
          </div>
          <div className="ingredient-item ingredient-left" data-ingredient="onions">
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', color: 'var(--iron-muted)', letterSpacing: '1px' }}>ONIONS</span>
            <div style={{ width: '40px', height: '1px', background: 'var(--iron-orange)', marginTop: '4px' }} />
          </div>
          <div className="ingredient-item ingredient-left" data-ingredient="tomatoes">
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', color: 'var(--iron-muted)', letterSpacing: '1px' }}>TOMATOES</span>
            <div style={{ width: '40px', height: '1px', background: 'var(--iron-orange)', marginTop: '4px' }} />
          </div>
          <div className="ingredient-item ingredient-left" data-ingredient="bottom-lettuce">
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', color: 'var(--iron-muted)', letterSpacing: '1px' }}>BOTTOM LETTUCE</span>
            <div style={{ width: '40px', height: '1px', background: 'var(--iron-orange)', marginTop: '4px' }} />
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            right: 'clamp(32px, 5vw, 80px)',
            top: 'clamp(100px, 15vh, 150px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '28px',
            alignItems: 'flex-end',
            textAlign: 'right',
          }}
        >
          <div className="ingredient-item ingredient-right" data-ingredient="top-bun">
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', color: 'var(--iron-muted)', letterSpacing: '1px' }}>WHOLE WHEAT BUN</span>
            <div style={{ width: '40px', height: '1px', background: 'var(--iron-orange)', marginTop: '4px' }} />
          </div>
          <div className="ingredient-item ingredient-right" data-ingredient="cheese">
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', color: 'var(--iron-muted)', letterSpacing: '1px' }}>CHEESE</span>
            <div style={{ width: '40px', height: '1px', background: 'var(--iron-orange)', marginTop: '4px' }} />
          </div>
          <div className="ingredient-item ingredient-right" data-ingredient="cucumber">
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', color: 'var(--iron-muted)', letterSpacing: '1px' }}>CUCUMBER</span>
            <div style={{ width: '40px', height: '1px', background: 'var(--iron-orange)', marginTop: '4px' }} />
          </div>
          <div className="ingredient-item ingredient-right" data-ingredient="patty">
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '22px', color: 'var(--iron-orange)', letterSpacing: '1px', fontWeight: '600' }}>PROTEIN PATTY</span>
            <div style={{ width: '40px', height: '1px', background: 'var(--iron-orange)', marginTop: '4px' }} />
          </div>
          <div className="ingredient-item ingredient-right" data-ingredient="bottom-bun">
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', color: 'var(--iron-muted)', letterSpacing: '1px' }}>FINAL BUN</span>
            <div style={{ width: '40px', height: '1px', background: 'var(--iron-orange)', marginTop: '4px' }} />
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div
        className="product-description"
        style={{
          position: 'absolute',
          right: 'clamp(32px, 5vw, 80px)',
          top: '60%',
          transform: 'translateY(-50%) translateY(30px)',
          width: 'clamp(280px, 35vw, 400px)',
          zIndex: 6,
          opacity: 0,
          visibility: 'hidden',
          textAlign: 'right',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 8vw, 72px)',
            color: 'var(--iron-cream)',
            letterSpacing: '3px',
            marginBottom: '16px',
            lineHeight: '1.1',
          }}
        >
          TRY THE BEAST BURGER
        </h2>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', marginBottom: '20px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', color: 'var(--iron-muted)', letterSpacing: '1px' }}>
            5.0
          </span>
          {[...Array(5)].map((_, i) => (
            <svg key={i} width="24" height="24" viewBox="0 0 18 18" fill="#D4AF37">
              <path d="M9 1.5L11.1 6.3L16.5 7.2L12.75 10.95L13.65 16.5L9 13.95L4.35 16.5L5.25 10.95L1.5 7.2L6.9 6.3L9 1.5Z" />
            </svg>
          ))}
        </div>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '20px',
            color: 'var(--iron-cream)',
            lineHeight: '1.6',
            marginBottom: '32px',
          }}
        >
          Crafted with premium ingredients for bold flavors and fewer compromises. A satisfying meal you can feel good about.
        </p>

        <button
          className="btn-order"
          onClick={scrollToOrder}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '26px',
            letterSpacing: '3px',
            color: 'var(--iron-cream)',
            background: 'var(--iron-orange)',
            border: 'none',
            padding: '20px 56px',
            cursor: 'pointer',
            clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
            transition: 'background 0.2s ease, transform 0.1s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#D04415'
            e.currentTarget.style.transform = 'scale(1.02)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--iron-orange)'
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          ORDER NOW
        </button>
      </div>

      {/* Dark overlay - completely removed to prevent fade effect */}

      {/* Bottom gradient fade - removed to prevent fade effect */}

      {/* Content */}
      <div
        className="hero-content"
        style={{
          position: 'relative',
          zIndex: 4,
          paddingLeft: 'clamp(32px, 8vw, 120px)',
          paddingRight: 'clamp(32px, 8vw, 80px)',
          maxWidth: 780,
          willChange: 'transform, opacity',
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
        className="hero-scroll-indicator"
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
          willChange: 'opacity',
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
