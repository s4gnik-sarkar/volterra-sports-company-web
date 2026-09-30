import { Link } from 'react-router-dom'
import { Heart, Star, ShoppingBag } from 'lucide-react'
import Img from './Img'
import { useStore } from '../context/StoreContext'
export const Stars = ({ value, size = 14 }) => (
  <span className="inline-flex items-center gap-0.5" aria-label={`${value} out of 5`}>
    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={size} className={i <= Math.round(value) ? 'fill-ink text-ink' : 'text-black/20'} />)}
  </span>
)
export default function ProductCard({ p }) {
  const { addToCart, toggleWish, wish } = useStore()
  const liked = wish.includes(p.id)
  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
        <Link to={`/product/${p.id}`} aria-label={p.name}>
          <Img src={p.images[0]} alt={p.name} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
        </Link>
        <span className="absolute left-3 top-3 bg-lime px-2 py-1 font-display text-sm font-bold uppercase">-{p.discount}%</span>
        <button onClick={() => toggleWish(p)} aria-label="Toggle wishlist" aria-pressed={liked} className="absolute right-3 top-3 grid h-9 w-9 place-items-center bg-white transition hover:bg-lime">
          <Heart size={18} className={liked ? 'fill-ink' : ''} />
        </button>
        <button onClick={() => addToCart(p)} className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-ink py-3 font-display text-lg font-bold uppercase text-white transition-transform duration-300 hover:text-lime group-hover:translate-y-0 max-md:translate-y-0">
          <ShoppingBag size={16} /> Add to cart
        </button>
      </div>
      <div className="pt-3">
        <p className="text-xs text-black/50">{p.category} · {p.sport}</p>
        <Link to={`/product/${p.id}`} className="mt-0.5 block font-medium hover:underline">{p.name}</Link>
        <div className="mt-1 flex items-center gap-2 text-sm"><Stars value={p.rating} /><span className="text-black/50">{p.rating}</span></div>
        <p className="mt-1"><span className="font-semibold">${p.price}</span> <span className="ml-1 text-sm text-black/40 line-through">${p.original}</span></p>
      </div>
    </article>
  )
}
