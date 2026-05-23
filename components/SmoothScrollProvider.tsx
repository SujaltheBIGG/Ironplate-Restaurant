'use client'
import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    })

    lenisRef.current = lenis

    // 2. Connect to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // 3. Register Lenis ticker with GSAP gsap.ticker
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerUpdate)

    // 4. Disable lagSmoothing during scroll ticks for perfect sync
    gsap.ticker.lagSmoothing(0)

    // 5. Intercept hash/anchor clicks for smooth scroll behavior
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a')
      if (!anchor) return
      
      const href = anchor.getAttribute('href')
      if (href && href.startsWith('#')) {
        // Only override if it's an internal link
        e.preventDefault()
        if (href === '#') {
          lenis.scrollTo(0, {
            duration: 1.5,
          })
        } else {
          const targetElement = document.querySelector(href) as HTMLElement
          if (targetElement) {
            lenis.scrollTo(targetElement, {
              offset: 0,
              duration: 1.5,
            })
          }
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    // 6. Add global CSS styles dynamically to support Lenis smooth scroll features
    const style = document.createElement('style')
    style.innerHTML = `
      html.lenis, html.lenis body {
        height: auto;
      }
      .lenis.lenis-smooth {
        scroll-behavior: auto !important;
      }
      .lenis.lenis-smooth [data-lenis-prevent] {
        overscroll-behavior: contain;
      }
      .lenis.lenis-stopped {
        overflow: hidden;
      }
      .lenis.lenis-scrolling iframe {
        pointer-events: none;
      }
    `
    document.head.appendChild(style)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(tickerUpdate)
      document.removeEventListener('click', handleAnchorClick)
      document.head.removeChild(style)
    }
  }, [])

  return <>{children}</>
}
