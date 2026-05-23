'use client'
import { useRef, useEffect } from 'react'
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
  duration = 2.5,
  threshold = 0.8 
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current,
        { 
          y: 30,
          opacity: 0,
          filter: 'blur(10px)'
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration,
          delay,
          ease: 'sine.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 95%',
            once: true,
          }
        }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [delay, duration])

  return (
    <div ref={containerRef} style={{ overflow: 'hidden' }}>
      {children}
    </div>
  )
}
