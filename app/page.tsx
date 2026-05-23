import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import MealShowcase from '@/components/MealShowcase'
import MenuGrid from '@/components/MenuGrid'
import Testimonials from '@/components/Testimonials'
import MediaSection from '@/components/MediaSection'
import AboutSection from '@/components/AboutSection'
import OrderCTA from '@/components/OrderCTA'
import Footer from '@/components/Footer'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'

export default function Home() {
  return (
    <main style={{ background: 'var(--iron-bg)', color: 'var(--iron-cream)', overflowX: 'hidden' }}>
      <SmoothScrollProvider>
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
      </SmoothScrollProvider>
    </main>
  )
}
