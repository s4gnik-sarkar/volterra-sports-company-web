import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, Trash2, Search, ShoppingBag, Heart } from 'lucide-react'
import Drawer from './Drawer'
import Img from './Img'
import { useStore } from '../context/StoreContext'
import { products } from '../data/products'
const Empty = ({ icon: Icon, text }) => (
  <div className="grid h-full place-items-center text-center text-black/50"><div><Icon className="mx-auto mb-3" size={40} /><p>{text}</p></div></div>
)
export function CartDrawer() {
  const { panel, setPanel, lines, subtotal, setQty, removeItem, checkout } = useStore()
  const close = () => setPanel(null)
  const free = Math.max(0, 100 - subtotal)
  return (
    <Drawer open={panel === 'cart'} onClose={close} title={`Cart (${lines.length})`}
      footer={lines.length > 0 && (
        <div>
          <p className="mb-3 text-sm text-black/60">{free > 0 ? `Add $${free} more for free shipping` : 'You unlocked free shipping'}</p>
          <div className="mb-4 flex justify-between text-lg font-semibold"><span>Subtotal</span><span>${subtotal}</span></div>
          <button onClick={checkout} className="btn btn-dark w-full">Checkout</button>
        </div>)}>
      {lines.length === 0 ? <Empty icon={ShoppingBag} text="Your cart is empty. Time to gear up." /> : lines.map(l => (
        <div key={l.key} className="flex gap-4 border-b border-black/10 py-4">
          <Img src={l.product.images[0]} alt={l.product.name} className="h-24 w-20 shrink-0" />
          <div className="flex-1">
            <Link onClick={close} to={`/product/${l.id}`} className="font-medium hover:underline">{l.product.name}</Link>
            <p className="text-sm text-black/50">{l.color} · {l.size}</p>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center border border-black/15">
                <button aria-label="Decrease" onClick={() => setQty(l.key, l.qty - 1)} className="p-2"><Minus size={14} /></button>
                <span className="w-8 text-center text-sm">{l.qty}</span>
                <button aria-label="Increase" onClick={() => setQty(l.key, l.qty + 1)} className="p-2"><Plus size={14} /></button>
              </div>
              <span className="font-semibold">${l.product.price * l.qty}</span>
            </div>
          </div>
          <button aria-label="Remove" onClick={() => removeItem(l.key)} className="self-start p-1 text-black/40 hover:text-ink"><Trash2 size={16} /></button>
        </div>
      ))}
    </Drawer>
  )
}
export function WishlistDrawer() {
  const { panel, setPanel, wish, toggleWish, addToCart } = useStore()
  const items = wish.map(id => products.find(p => p.id === id)).filter(Boolean)
  const close = () => setPanel(null)
  return (
    <Drawer open={panel === 'wish'} onClose={close} title={`Wishlist (${items.length})`}>
      {items.length === 0 ? <Empty icon={Heart} text="Nothing saved yet. Tap the heart on any product." /> : items.map(p => (
        <div key={p.id} className="flex gap-4 border-b border-black/10 py-4">
          <Img src={p.images[0]} alt={p.name} className="h-24 w-20 shrink-0" />
          <div className="flex-1">
            <Link onClick={close} to={`/product/${p.id}`} className="font-medium hover:underline">{p.name}</Link>
            <p className="text-sm text-black/50">${p.price}</p>
            <button onClick={() => addToCart(p)} className="mt-2 text-sm font-semibold underline underline-offset-4 hover:text-black/60">Add to cart</button>
          </div>
          <button aria-label="Remove" onClick={() => toggleWish(p)} className="self-start p-1 text-black/40 hover:text-ink"><Trash2 size={16} /></button>
        </div>
      ))}
    </Drawer>
  )
}
export function SearchModal() {
  const { panel, setPanel } = useStore()
  const [q, setQ] = useState('')
  const nav = useNavigate()
  if (panel !== 'search') return null
  const close = () => { setPanel(null); setQ('') }
  const res = q.trim() ? products.filter(p => `${p.name} ${p.sport} ${p.category}`.toLowerCase().includes(q.toLowerCase())) : []
  const go = e => { e.preventDefault(); if (q.trim()) { nav(`/shop?q=${encodeURIComponent(q)}`); close() } }
  return (
    <div className="fixed inset-0 z-[70] animate-fade bg-ink/90 p-5 md:p-16" role="dialog" aria-modal="true" aria-label="Search" onKeyDown={e => e.key === 'Escape' && close()}>
      <div className="mx-auto max-w-3xl">
        <form onSubmit={go} className="flex items-center gap-4 border-b-2 border-lime pb-3 text-white">
          <Search />
          <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Search boots, rackets, jerseys…" className="flex-1 bg-transparent font-display text-3xl uppercase outline-none placeholder:text-white/30 md:text-5xl" />
          <button type="button" onClick={close} className="text-sm text-white/60 hover:text-white">Close</button>
        </form>
        <div className="mt-6 max-h-[65vh] overflow-y-auto">
          {q && res.length === 0 && <p className="text-white/60">No results for “{q}”. Try a sport like running or tennis.</p>}
          {res.slice(0, 6).map(p => (
            <Link key={p.id} to={`/product/${p.id}`} onClick={close} className="flex items-center gap-4 border-b border-white/10 py-3 text-white hover:bg-white/5">
              <Img src={p.images[0]} alt={p.name} className="h-16 w-14" />
              <span className="flex-1">{p.name}<span className="block text-sm text-white/50">{p.category}</span></span>
              <span>${p.price}</span>
            </Link>
          ))}
          {res.length > 6 && <button onClick={go} className="mt-4 text-lime underline">View all {res.length} results</button>}
        </div>
      </div>
    </div>
  )
}
