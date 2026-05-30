'use client'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const meals = [
  {
    id: 1,
    image: '/meal-1.png',
    title: 'MEAL 1',
    description: 'Premium selection with fresh ingredients'
  },
  {
    id: 2,
    image: '/meal-2.png',
    title: 'MEAL 2',
    description: 'Chef\'s special with unique flavors'
  },
  {
    id: 3,
    image: '/meal-3.png',
    title: 'MEAL 3',
    description: 'Signature dish with bold taste'
  }
]

export default function MealShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const isDragging = useRef(false)

  useEffect(() => {
    setMounted(true)
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const prev = () => {
    setDirection('left')
    setActiveIndex((i) => (i - 1 + meals.length) % meals.length)
  }

  const next = () => {
    setDirection('right')
    setActiveIndex((i) => (i + 1) % meals.length)
  }

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX
    isDragging.current = true
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return
    touchEndX.current = e.changedTouches[0].screenX
  }

  const handleTouchEnd = () => {
    if (!isDragging.current) return
    isDragging.current = false

    const swipeThreshold = 50
    const diff = touchStartX.current - touchEndX.current

    if (diff > swipeThreshold) {
      next()
    } else if (diff < -swipeThreshold) {
      prev()
    }
  }

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartX.current = e.screenX
    isDragging.current = true
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    touchEndX.current = e.screenX
  }

  const handleMouseUp = () => {
    if (!isDragging.current) return
    isDragging.current = false

    const swipeThreshold = 50
    const diff = touchStartX.current - touchEndX.current

    if (diff > swipeThreshold) {
      next()
    } else if (diff < -swipeThreshold) {
      prev()
    }
  }

  // Parallax effect on mouse move - disabled on mobile for performance
  const handleMouseMoveParallax = (e: React.MouseEvent) => {
    if (!imageContainerRef.current || isMobile) return
    const x = (e.clientX / window.innerWidth - 0.5) * 20
    const y = (e.clientY / window.innerHeight - 0.5) * 20
    gsap.to(imageContainerRef.current, {
      x,
      y,
      duration: 0.5,
      ease: 'power2.out'
    })
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth fade-in animation when section comes into view
      gsap.fromTo(sectionRef.current,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            end: 'top 50%',
            scrub: 1,
          }
        }
      )

      // Initial entrance animation for image
      gsap.fromTo(imageContainerRef.current,
        {
          opacity: 0,
          scale: 1.2,
          filter: 'blur(10px)'
        },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          }
        }
      )

      // Scroll-based image switching with pinning for trackpad swipe
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=200%',
        scrub: 1,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress
          // Distribute progress evenly across all 3 images
          const segmentSize = 1 / meals.length
          const newIndex = Math.min(Math.floor(progress / segmentSize), meals.length - 1)
          if (newIndex >= 0 && newIndex < meals.length && newIndex !== activeIndex) {
            setDirection(newIndex > activeIndex ? 'right' : 'left')
            setActiveIndex(newIndex)
          }
        }
      })

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (imageContainerRef.current && !isMobile) {
      // Slide animation based on direction - disabled on mobile for performance
      const startX = direction === 'right' ? 100 : -100
      gsap.fromTo(imageContainerRef.current,
        {
          x: startX,
          opacity: 0,
          scale: 1.1,
          filter: 'blur(5px)'
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power3.out'
        }
      )
    }
  }, [activeIndex, direction, isMobile])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        background: 'var(--iron-bg)',
        overflow: 'hidden',
        cursor: 'grab',
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={(e) => {
        handleMouseMove(e)
        handleMouseMoveParallax(e)
      }}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Full-size image */}
      <div
        ref={imageContainerRef}
        style={{ 
          position: 'relative', 
          width: '100%', 
          height: '100vh',
          transition: 'transform 0.3s ease'
        }}
      >
        <Image
          src={meals[activeIndex].image}
          alt={meals[activeIndex].title}
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center center'
          }}
          priority
          quality={isMobile ? 60 : 75}
        />
      </div>

      {/* Gradient overlay for depth */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, transparent 0%, rgba(13,13,13,0.3) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Animated particles - disabled on mobile for performance */}
      {mounted && !isMobile && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            overflow: 'hidden',
          }}
        >
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: Math.random() * 4 + 2,
                height: Math.random() * 4 + 2,
                background: 'rgba(232, 80, 26, 0.3)',
                borderRadius: '50%',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Navigation dots */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(32px, 4vw, 48px)',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '12px',
          zIndex: 10,
        }}
      >
        {meals.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > activeIndex ? 'right' : 'left')
              setActiveIndex(index)
            }}
            style={{
              width: activeIndex === index ? '32px' : '12px',
              height: '12px',
              borderRadius: '6px',
              background: activeIndex === index ? 'var(--iron-orange)' : 'rgba(255, 255, 255, 0.3)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* Swipe hint */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(80px, 8vw, 100px)',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: '14px',
          fontFamily: 'var(--font-body)',
          letterSpacing: '1px',
          zIndex: 10,
          animation: 'pulse 2s ease-in-out infinite',
        }}
      >
        <span>← SWIPE →</span>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 1;
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  )
}
