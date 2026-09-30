import { Link } from 'react-router-dom'
import { ArrowRight, Truck, RotateCcw, ShieldCheck } from 'lucide-react'
import Img from '../components/Img'
import ProductCard from '../components/ProductCard'
import { products, sports, sportImg } from '../data/products'
const Head = ({ title, to, dark }) => (
  <div className="mb-8 flex items-end justify-between"><h2 className={`text-5xl font-bold md:text-7xl ${dark ? 'text-white' : ''}`}>{title}</h2>
    {to && <Link to={to} className={`hidden items-center gap-2 font-semibold underline underline-offset-4 sm:flex ${dark ? 'text-lime' : ''}`}>View all <ArrowRight size={16} /></Link>}</div>
)
const Grid = ({ items }) => <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">{items.map(p => <ProductCard key={p.id} p={p} />)}</div>
export default function Home() {
  return (
    <>
      <section className="relative isolate flex min-h-[80vh] items-end overflow-hidden bg-ink text-white">
        <Img src={sportImg('football', 0, 1800)} alt="Football" className="absolute inset-0 -z-10 h-full w-full opacity-60" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
        <div className="wrap pb-14 md:pb-24">
          <h1 className="animate-up text-[22vw] font-black leading-[.8] md:text-[13rem]">Play hard.<br /><span className="text-lime">Move faster.</span></h1>
          <p className="mt-6 max-w-md animate-up text-lg text-white/80" style={{ animationDelay: '.15s' }}>Performance kit built in the lab, proven on the pitch. The Season 26 collection is here.</p>
          <div className="mt-8 flex flex-wrap gap-3 animate-up" style={{ animationDelay: '.3s' }}>
            <Link to="/shop" className="btn btn-lime">Shop the collection</Link><Link to="/shop?sort=newest" className="btn border border-white/50 hover:bg-white hover:text-ink">New arrivals</Link></div>
        </div>
      </section>
      <div className="border-b border-black/10"><div className="wrap grid gap-3 py-5 text-sm sm:grid-cols-3">
        {[[Truck, 'Free shipping over $100'], [RotateCcw, '30-day easy returns'], [ShieldCheck, 'Secure checkout']].map(([I, t]) => <div key={t} className="flex items-center gap-3"><I size={20} />{t}</div>)}</div></div>
      <section className="wrap py-16 md:py-24"><Head title="Shop by sport" to="/shop" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {sports.map(s => (
            <Link key={s.slug} to={`/shop?category=${s.slug}`} className="group relative aspect-[3/4] overflow-hidden bg-ink">
              <Img src={sportImg(s.slug, 0, 700)} alt={s.name} className="h-full w-full opacity-80 transition duration-700 group-hover:scale-110 group-hover:opacity-60" />
              <span className="absolute inset-x-4 bottom-4 flex items-center justify-between font-display text-3xl font-bold uppercase text-white md:text-4xl">{s.name}<ArrowRight className="-translate-x-2 text-lime opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" /></span>
            </Link>))}
        </div></section>
      <section className="wrap pb-16 md:pb-24"><Head title="Featured" to="/shop" /><Grid items={products.filter(p => p.featured).slice(0, 4)} /></section>
      <section className="wrap pb-16 md:pb-24"><Head title="New arrivals" to="/shop?sort=newest" /><Grid items={products.filter(p => p.isNew).slice(0, 4)} /></section>
      <section className="relative isolate overflow-hidden bg-lime py-20 md:py-32">
        <div className="wrap grid items-center gap-8 md:grid-cols-2">
          <h2 className="text-7xl font-black md:text-[9rem]">Up to<br />35% off</h2>
          <div><p className="max-w-sm text-xl">End-of-season deals on boots, rackets and training gear. Once they're gone, they're gone.</p><Link to="/shop?sale=1" className="btn btn-dark mt-6">Shop the sale</Link></div>
        </div></section>
      <section className="wrap py-16 md:py-24"><Head title="Trending now" to="/shop?sort=rating" /><Grid items={products.filter(p => p.trending).slice(0, 4)} /></section>
      <section className="bg-char py-20 text-white md:py-28"><div className="wrap grid items-center gap-10 md:grid-cols-2">
        <Img src={sportImg('running', 1, 1000)} alt="Athlete running" className="aspect-[4/3] w-full" />
        <div><h2 className="text-6xl font-bold md:text-8xl">Built by athletes.<br />Tested to break.</h2>
          <p className="mt-6 max-w-md text-white/70">VOLTERRA started with a simple frustration: kit that couldn't keep up. Every product is prototyped, pushed to failure and rebuilt until it moves the way you do.</p>
          <Link to="/about" className="btn btn-lime mt-8">Our story</Link></div></div></section>
      <section className="wrap py-16 text-center md:py-24"><h2 className="text-5xl font-bold md:text-7xl">Join the squad</h2>
        <p className="mx-auto mt-4 max-w-md text-black/60">Get 20% off your first order plus early access to drops.</p>
        <NewsletterForm /></section>
    </>
  )
}
import { useStore } from '../context/StoreContext'
function NewsletterForm() {
  const { toast } = useStore()
  return (
    <form onSubmit={e => { e.preventDefault(); toast('Welcome to the squad! Code MOVE20 is on its way.'); e.target.reset() }} className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row">
      <input required type="email" placeholder="Your email" aria-label="Email" className="flex-1 border border-black/20 px-4 py-3.5 outline-none focus:border-ink" />
      <button className="btn btn-dark">Subscribe</button>
    </form>
  )
}
