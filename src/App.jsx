import Loader from './components/Loader'
import SmoothScroll from './components/SmoothScroll'
import Cursor from './components/Cursor'
import CursorTrail from './components/CursorTrail'
import Grain from './components/Grain'
import ScrollProgress from './components/ScrollProgress'
import ThemeSwitcher from './components/ThemeSwitcher'
import SoundToggle from './components/SoundToggle'
import KonamiEgg from './components/KonamiEgg'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Services from './components/Services'
import Skills from './components/Skills'
import Projects from './components/Projects'
import LogoWall from './components/LogoWall'
import GitHubStats from './components/GitHubStats'
import Process from './components/Process'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* page-level effects */}
      <Loader />
      <SmoothScroll />
      <Cursor />
      <CursorTrail />
      <Grain />
      <ScrollProgress />
      <KonamiEgg />
      <ThemeSwitcher />
      <SoundToggle />

      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <LogoWall />
        <Services />
        <Skills />
        <Projects />
        <GitHubStats />
        <Process />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
