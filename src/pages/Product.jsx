import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Heart, Minus, Plus, Truck } from 'lucide-react'
import Img from '../components/Img'
import ProductCard, { Stars } from '../components/ProductCard'
import { useStore } from '../context/StoreContext'
import { products } from '../data/products'
const reviews = [['Arjun M.', 5, 'Best gear I have owned. Comfortable from the first session.'], ['Sara K.', 4, 'Great build quality and the fit is spot on. Colour looks even better in person.'], ['Leo T.', 5, 'Held up through a brutal season. Worth every dollar.']]
export default function Product() {
  const { id } = useParams()
  const p = products.find(x => x.id === +id)
  const { addToCart, toggleWish, wish } = useStore()
  const [img, setImg] = useState(0), [color, setColor] = useState(null), [size, setSize] = useState(null), [qty, setQty] = useState(1)
  useEffect(() => { setImg(0); setColor(null); setSize(null); setQty(1) }, [id])
  if (!p) return <div className="wrap py-32 text-center"><h1 className="text-6xl font-bold">Product not found</h1><Link to="/shop" className="btn btn-dark mt-8">Back to shop</Link></div>
  const c = color || p.colors[0].name, s = size || p.sizes[0]
  const related = products.filter(x => x.id !== p.id && (x.sport === p.sport || x.category === p.category)).slice(0, 4)
  return (
    <div className="wrap py-8 md:py-14">
      <p className="mb-6 text-sm text-black/50"><Link to="/shop" className="hover:underline">Shop</Link> / <Link to={`/shop?category=${p.sport}`} className="capitalize hover:underline">{p.sport}</Link> / {p.name}</p>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="grid gap-3 md:grid-cols-[80px_1fr]">
          <div className="order-2 flex gap-3 md:order-1 md:flex-col">{p.images.map((im, i) => (
            <button key={i} onClick={() => setImg(i)} aria-label={`Image ${i + 1}`} className={`aspect-square w-20 overflow-hidden border-2 ${i === img ? 'border-ink' : 'border-transparent opacity-60 hover:opacity-100'}`}><Img src={im} alt={`${p.name} ${i + 1}`} className="h-full w-full" /></button>))}</div>
          <div className="order-1 aspect-[4/5] overflow-hidden bg-neutral-100 md:order-2"><Img src={p.images[img]} alt={p.name} className="h-full w-full" /></div>
        </div>
        <div>
          <p className="text-sm capitalize text-black/50">{p.category} · {p.sport}</p>
          <h1 className="mt-2 text-5xl font-bold md:text-7xl">{p.name}</h1>
          <div className="mt-4 flex items-center gap-2 text-sm"><Stars value={p.rating} size={16} /><span>{p.rating}</span><a href="#reviews" className="text-black/50 underline">{p.reviews} reviews</a></div>
          <p className="mt-5 flex items-baseline gap-3"><span className="text-3xl font-semibold">${p.price}</span><span className="text-black/40 line-through">${p.original}</span><span className="bg-lime px-2 py-0.5 text-sm font-bold">Save {p.discount}%</span></p>
          <p className="mt-5 max-w-lg text-black/70">{p.description}</p>
          <h3 className="mb-2 mt-8 text-lg font-bold">Colour: <span className="font-sans text-sm font-normal normal-case">{c}</span></h3>
          <div className="flex gap-3">{p.colors.map(k => <button key={k.name} onClick={() => setColor(k.name)} aria-label={k.name} style={{ background: k.hex }} className={`h-9 w-9 rounded-full border border-black/20 ${c === k.name ? 'outline outline-2 outline-offset-2 outline-ink' : ''}`} />)}</div>
          <h3 className="mb-2 mt-6 text-lg font-bold">Size</h3>
          <div className="flex flex-wrap gap-2">{p.sizes.map(z => <button key={z} onClick={() => setSize(z)} className={`min-w-12 border px-4 py-2.5 text-sm ${s === z ? 'border-ink bg-ink text-white' : 'border-black/15 hover:border-ink'}`}>{z}</button>)}</div>
          <div className="mt-8 flex flex-wrap gap-3">
            <div className="flex items-center border border-black/15"><button aria-label="Decrease" onClick={() => setQty(Math.max(1, qty - 1))} className="p-4"><Minus size={16} /></button><span className="w-10 text-center">{qty}</span><button aria-label="Increase" onClick={() => setQty(qty + 1)} className="p-4"><Plus size={16} /></button></div>
            <button onClick={() => addToCart(p, { size: s, color: c, qty })} className="btn btn-dark flex-1">Add to cart</button>
            <button onClick={() => toggleWish(p)} aria-label="Wishlist" aria-pressed={wish.includes(p.id)} className="grid w-14 place-items-center border border-black/15 hover:bg-lime"><Heart className={wish.includes(p.id) ? 'fill-ink' : ''} /></button>
          </div>
          <p className="mt-5 flex items-center gap-2 text-sm text-black/60"><Truck size={16} /> Free shipping over $100 · 30-day returns</p>
          <div className="mt-10 grid gap-8 border-t border-black/10 pt-8 sm:grid-cols-2">
            <div><h3 className="mb-3 text-xl font-bold">Features</h3><ul className="space-y-2 text-sm text-black/70">{p.features.map(f => <li key={f} className="flex gap-2"><span className="mt-1.5 h-2 w-2 shrink-0 bg-lime outline outline-1 outline-ink" />{f}</li>)}</ul></div>
            <div><h3 className="mb-3 text-xl font-bold">Specifications</h3><dl className="space-y-2 text-sm">{p.specs.map(([k, v]) => <div key={k} className="flex justify-between gap-4 border-b border-black/10 pb-1"><dt className="text-black/50">{k}</dt><dd className="text-right">{v}</dd></div>)}</dl></div>
          </div>
        </div>
      </div>
      <section id="reviews" className="mt-20 scroll-mt-28"><h2 className="mb-8 text-5xl font-bold">Reviews</h2>
        <div className="grid gap-6 md:grid-cols-3">{reviews.map(([n, r, t]) => <div key={n} className="border border-black/10 p-6"><Stars value={r} /><p className="mt-3 text-black/70">{t}</p><p className="mt-4 text-sm font-semibold">{n}</p></div>)}</div></section>
      <section className="mt-20"><h2 className="mb-8 text-5xl font-bold">You may also like</h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">{related.map(x => <ProductCard key={x.id} p={x} />)}</div></section>
    </div>
  )
}
