import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import Drawer from '../components/Drawer'
import { products, sports, categories } from '../data/products'
const allSizes = [...new Set(products.flatMap(p => p.sizes))].filter(s => s !== 'One Size')
export default function Shop() {
  const [sp, setSp] = useSearchParams()
  const sport = sp.get('category') || 'all', type = sp.get('type') || 'all', q = sp.get('q') || '', sort = sp.get('sort') || 'featured', sale = sp.get('sale')
  const [max, setMax] = useState(200), [size, setSize] = useState(null), [open, setOpen] = useState(false)
  const set = (k, v) => { const n = new URLSearchParams(sp); v && v !== 'all' ? n.set(k, v) : n.delete(k); setSp(n, { replace: true }) }
  const list = useMemo(() => {
    let r = products.filter(p => (sport === 'all' || p.sport === sport) && (type === 'all' || p.category === type) && p.price <= max
      && (!size || p.sizes.includes(size)) && (!sale || p.discount >= 25) && (!q || `${p.name} ${p.sport} ${p.category}`.toLowerCase().includes(q.toLowerCase())))
    const by = { 'price-asc': (a, b) => a.price - b.price, 'price-desc': (a, b) => b.price - a.price, rating: (a, b) => b.rating - a.rating, discount: (a, b) => b.discount - a.discount, newest: (a, b) => b.isNew - a.isNew || b.id - a.id }
    return by[sort] ? [...r].sort(by[sort]) : r
  }, [sport, type, max, size, sale, q, sort])
  const reset = () => { setSp({}, { replace: true }); setMax(200); setSize(null) }
  const Chip = ({ on, onClick, children }) => <button onClick={onClick} className={`border px-3 py-1.5 text-sm transition ${on ? 'border-ink bg-ink text-white' : 'border-black/15 hover:border-ink'}`}>{children}</button>
  const filters = (
    <div className="space-y-8">
      <div><h3 className="mb-3 text-xl font-bold">Sport</h3><div className="flex flex-wrap gap-2">
        <Chip on={sport === 'all'} onClick={() => set('category', 'all')}>All</Chip>{sports.map(s => <Chip key={s.slug} on={sport === s.slug} onClick={() => set('category', s.slug)}>{s.name}</Chip>)}</div></div>
      <div><h3 className="mb-3 text-xl font-bold">Category</h3><div className="flex flex-wrap gap-2">
        <Chip on={type === 'all'} onClick={() => set('type', 'all')}>All</Chip>{categories.map(c => <Chip key={c} on={type === c} onClick={() => set('type', c)}>{c}</Chip>)}</div></div>
      <div><h3 className="mb-3 text-xl font-bold">Max price: ${max}</h3><input type="range" min="20" max="200" step="10" value={max} onChange={e => setMax(+e.target.value)} className="w-full accent-ink" aria-label="Max price" /></div>
      <div><h3 className="mb-3 text-xl font-bold">Size</h3><div className="flex flex-wrap gap-2">{allSizes.map(s => <Chip key={s} on={size === s} onClick={() => setSize(size === s ? null : s)}>{s}</Chip>)}</div></div>
      <button onClick={reset} className="text-sm underline">Clear all filters</button>
    </div>
  )
  return (
    <div className="wrap py-10 md:py-16">
      <h1 className="text-6xl font-bold md:text-8xl">{sale ? 'Sale' : sport === 'all' ? 'All products' : sports.find(s => s.slug === sport)?.name}</h1>
      <div className="mt-8 flex flex-wrap items-center gap-3 border-y border-black/10 py-4">
        <button onClick={() => setOpen(true)} className="flex items-center gap-2 border border-black/15 px-4 py-2 text-sm lg:hidden"><SlidersHorizontal size={16} /> Filters</button>
        <div className="flex flex-1 items-center gap-2 border border-black/15 px-3 sm:max-w-xs"><input value={q} onChange={e => set('q', e.target.value)} placeholder="Search products" aria-label="Search products" className="w-full py-2 text-sm outline-none" />
          {q && <button aria-label="Clear search" onClick={() => set('q', '')}><X size={14} /></button>}</div>
        <span className="ml-auto text-sm text-black/50">{list.length} products</span>
        <select value={sort} onChange={e => set('sort', e.target.value)} aria-label="Sort" className="border border-black/15 bg-white px-3 py-2 text-sm">
          <option value="featured">Featured</option><option value="newest">Newest</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="rating">Top rated</option><option value="discount">Biggest discount</option></select>
      </div>
      <div className="mt-10 grid gap-12 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">{filters}</aside>
        {list.length === 0 ? <div className="py-20 text-center"><p className="text-xl">No products match those filters.</p><button onClick={reset} className="btn btn-dark mt-6">Reset filters</button></div>
          : <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 xl:gap-x-6">{list.map(p => <ProductCard key={p.id} p={p} />)}</div>}
      </div>
      <Drawer open={open} onClose={() => setOpen(false)} title="Filters" side="left" footer={<button onClick={() => setOpen(false)} className="btn btn-dark w-full">Show {list.length} products</button>}>{filters}</Drawer>
    </div>
  )
}
