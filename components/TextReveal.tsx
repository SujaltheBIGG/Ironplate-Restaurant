'use client'
import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface TextRevealProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  threshold?: number
}

export default function TextReveal({
  children,
  delay = 0,
  duration = 0.8,
  threshold = 0.8
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Skip animation on mobile for performance
    if (isMobile) return

    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current,
        {
          y: 20,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 90%',
            once: true,
          }
        }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [delay, duration, isMobile])

  return (
    <div ref={containerRef} style={{ overflow: 'hidden' }}>
      {children}
    </div>
  )
}
