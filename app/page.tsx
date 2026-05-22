import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import DishShowcase from '@/components/DishShowcase'
import BurgerBuild from '@/components/BurgerBuild'
import MenuGrid from '@/components/MenuGrid'
import SocialProof from '@/components/SocialProof'
import OrderCTA from '@/components/OrderCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main style={{ background: 'var(--iron-bg)', color: 'var(--iron-cream)', overflowX: 'hidden' }}>
      <Navbar />
      <HeroSection />
      <DishShowcase />
      <BurgerBuild />
      <MenuGrid />
      <SocialProof />
      <OrderCTA />
      <Footer />
    </main>
  )
}
