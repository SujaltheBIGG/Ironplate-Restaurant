import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'

// Lazy load below-the-fold components
const MealShowcase = dynamic(() => import('@/components/MealShowcase'), { loading: () => null })
const MenuGrid = dynamic(() => import('@/components/MenuGrid'), { loading: () => null })
const Testimonials = dynamic(() => import('@/components/Testimonials'), { loading: () => null })
const MediaSection = dynamic(() => import('@/components/MediaSection'), { loading: () => null })
const AboutSection = dynamic(() => import('@/components/AboutSection'), { loading: () => null })
const OrderCTA = dynamic(() => import('@/components/OrderCTA'), { loading: () => null })
const Footer = dynamic(() => import('@/components/Footer'), { loading: () => null })

export default function Home() {
  return (
    <main style={{ background: 'var(--iron-bg)', color: 'var(--iron-cream)', overflowX: 'hidden' }}>
      <Navbar />
      <HeroSection />
      
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          background: 'var(--iron-bg)',
          overflow: 'hidden',
        }}
      >
        <MealShowcase />
        <MenuGrid />
        <Testimonials />
        <MediaSection />
        <AboutSection />
        <OrderCTA />
        <Footer />
      </div>
    </main>
  )
}
