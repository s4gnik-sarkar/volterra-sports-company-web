import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Search, Heart, ShoppingBag, Menu, ChevronDown } from 'lucide-react'
import Drawer from './Drawer'
import Img from './Img'
import { useStore } from '../context/StoreContext'
import { sports, categories, sportImg } from '../data/products'
export const Logo = ({ light }) => <Link to="/" className={`font-display text-3xl font-black tracking-[.12em] ${light ? 'text-white' : ''}`}>VOLTERRA<span className="text-lime">.</span></Link>
export function Announcement() {
  return <div className="bg-lime py-2 text-center text-xs font-semibold md:text-sm">Free shipping over $100 · Use code MOVE20 for 20% off your first order</div>
}
export default function Navbar() {
  const { count, wish, setPanel, panel } = useStore()
  const [mega, setMega] = useState(false)
  const link = ({ isActive }) => `relative py-2 font-display text-lg font-bold uppercase tracking-wide after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:bg-ink after:transition-transform ${isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'}`
  const Icon = ({ onClick, label, n, children }) => (
    <button onClick={onClick} aria-label={label} className="relative p-2 hover:text-black/60">{children}
      {n > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center bg-lime px-1 text-[10px] font-bold">{n}</span>}</button>
  )
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur" onMouseLeave={() => setMega(false)}>
      <div className="wrap flex h-16 items-center justify-between md:h-20">
        <div className="flex items-center gap-3 lg:hidden"><button aria-label="Menu" onClick={() => setPanel('menu')}><Menu /></button></div>
        <Logo />
        <nav className="hidden items-center gap-9 lg:flex">
          <div onMouseEnter={() => setMega(true)}>
            <NavLink to="/shop" end className={link}>Shop <ChevronDown size={14} className="inline" /></NavLink>
          </div>
          <NavLink to="/shop?sale=1" className={link}>Sale</NavLink>
          <NavLink to="/shop?sort=newest" className={link}>New</NavLink>
          <NavLink to="/about" className={link}>About</NavLink>
        </nav>
        <div className="flex items-center">
          <Icon label="Search" onClick={() => setPanel('search')}><Search size={20} /></Icon>
          <Icon label="Wishlist" n={wish.length} onClick={() => setPanel('wish')}><Heart size={20} /></Icon>
          <Icon label="Cart" n={count} onClick={() => setPanel('cart')}><ShoppingBag size={20} /></Icon>
        </div>
      </div>
      {mega && (
        <div className="absolute inset-x-0 top-full hidden animate-fade border-t border-black/10 bg-white shadow-xl lg:block" onClick={() => setMega(false)}>
          <div className="wrap grid grid-cols-12 gap-10 py-10">
            <div className="col-span-5"><h3 className="mb-4 text-xl font-bold">Shop by sport</h3>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2">{sports.map(s => <li key={s.slug}><Link to={`/shop?category=${s.slug}`} className="text-black/70 hover:text-ink hover:underline">{s.name}</Link></li>)}</ul></div>
            <div className="col-span-3"><h3 className="mb-4 text-xl font-bold">Shop by type</h3>
              <ul className="space-y-2">{categories.map(c => <li key={c}><Link to={`/shop?type=${c}`} className="text-black/70 hover:text-ink hover:underline">{c}</Link></li>)}
                <li><Link to="/shop" className="font-semibold underline">All products</Link></li></ul></div>
            <Link to="/shop?category=running" className="group relative col-span-4 block h-56 overflow-hidden bg-ink">
              <Img src={sportImg('running', 0, 700)} alt="Running" className="h-full w-full opacity-70 transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute bottom-4 left-4 font-display text-4xl font-bold uppercase text-white">Run faster<br /><span className="text-lime">Shop running</span></span>
            </Link>
          </div>
        </div>
      )}
      <Drawer open={panel === 'menu'} onClose={() => setPanel(null)} title="Menu" side="left">
        <nav className="flex flex-col gap-1 font-display text-4xl font-bold uppercase" onClick={() => setPanel(null)}>
          <Link to="/shop" className="py-2">Shop all</Link><Link to="/shop?sale=1" className="py-2">Sale</Link><Link to="/about" className="py-2">About</Link>
        </nav>
        <h3 className="mb-3 mt-8 text-lg font-bold text-black/50">Shop by sport</h3>
        <ul className="grid grid-cols-2 gap-2" onClick={() => setPanel(null)}>{sports.map(s => <li key={s.slug}><Link to={`/shop?category=${s.slug}`} className="block border border-black/10 px-4 py-3 hover:bg-ink hover:text-white">{s.name}</Link></li>)}</ul>
      </Drawer>
    </header>
  )
}
