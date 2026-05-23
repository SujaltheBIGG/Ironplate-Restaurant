'use client'
import { useRef, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function MediaSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(imageRef.current, { opacity: 1, scale: 1 })
      
      gsap.fromTo(imageRef.current,
        { 
          opacity: 0,
          scale: 1.1
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        background: 'var(--iron-bg)',
        overflow: 'hidden',
      }}
    >
      <div
        ref={imageRef}
        style={{ 
          position: 'relative', 
          width: '100%', 
          height: '100vh',
          opacity: 1
        }}
      >
        <Image
          src="/media-section.png"
          alt="Media Section"
          fill
          style={{ objectFit: 'cover' }}
          priority
          quality={100}
        />
      </div>
    </section>
  )
}
