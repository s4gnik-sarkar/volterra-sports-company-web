import { Link } from 'react-router-dom'
import { Instagram, Twitter, Youtube } from 'lucide-react'
import { Logo } from './Navbar'
import { sports } from '../data/products'
export default function Footer() {
  const h = 'mb-4 text-xl font-bold text-white'; const l = 'block py-1 text-white/60 hover:text-lime'
  return (
    <footer className="bg-ink pt-16 text-sm text-white">
      <div className="wrap grid gap-10 pb-12 md:grid-cols-4">
        <div><Logo light /><p className="mt-4 max-w-xs text-white/60">Play hard. Move faster. Performance sportswear and equipment for every athlete.</p>
          <div className="mt-5 flex gap-4 text-white/70"><Instagram size={20} /><Twitter size={20} /><Youtube size={20} /></div></div>
        <div><h3 className={h}>Sports</h3>{sports.slice(0, 5).map(s => <Link key={s.slug} className={l} to={`/shop?category=${s.slug}`}>{s.name}</Link>)}</div>
        <div><h3 className={h}>Company</h3><Link className={l} to="/about">Our story</Link><Link className={l} to="/shop?sale=1">Sale</Link><Link className={l} to="/shop?sort=newest">New arrivals</Link></div>
        <div><h3 className={h}>Support</h3><span className={l}>Shipping & returns</span><span className={l}>Size guide</span><span className={l}>Contact</span></div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/40">© 2026 VOLTERRA. A fictional brand created for demo purposes.</div>
    </footer>
  )
}
