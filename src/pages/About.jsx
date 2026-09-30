import { Link } from 'react-router-dom'
import { Zap, Shield, Leaf, Users } from 'lucide-react'
import Img from '../components/Img'
import { sportImg } from '../data/products'
const values = [[Zap, 'Speed', 'Every gram, seam and stud is chosen to help you move faster.'], [Shield, 'Durability', 'Tested past the point of failure so it never fails you.'], [Leaf, 'Responsibility', 'Recycled materials and lower-waste packaging in every drop.'], [Users, 'Community', 'We back local clubs, coaches and grassroots teams.']]
const stats = [['2M+', 'Athletes equipped'], ['48', 'Countries shipped to'], ['120', 'Products tested yearly'], ['92%', 'Recycled packaging']]
export default function About() {
  return (
    <>
      <section className="relative isolate flex min-h-[70vh] items-end overflow-hidden bg-ink text-white">
        <Img src={sportImg('training', 0, 1800)} alt="Training" className="absolute inset-0 -z-10 h-full w-full opacity-50" />
        <div className="wrap pb-16"><h1 className="animate-up text-[18vw] font-black leading-[.8] md:text-[11rem]">We are<br /><span className="text-lime">Volterra</span></h1></div>
      </section>
      <section className="wrap grid gap-10 py-20 md:grid-cols-2 md:py-28">
        <h2 className="text-5xl font-bold md:text-7xl">Born from a<br />better question</h2>
        <div className="space-y-5 text-lg text-black/70"><p>VOLTERRA began in a small workshop with one question: why does great gear still hold athletes back? We stripped kit down to what matters and rebuilt it around movement.</p>
          <p>Today we design for eight sports and every level, from Sunday league to national squads, with one standard: it has to perform when it counts.</p></div>
      </section>
      <section className="bg-char py-20 text-white md:py-28"><div className="wrap grid gap-10 md:grid-cols-2">
        <div><h2 className="text-5xl font-bold md:text-7xl">Our mission</h2><p className="mt-6 max-w-md text-xl text-white/70">Give every athlete gear that makes them faster, stronger and more confident, at a price that respects the grind.</p></div>
        <Img src={sportImg('basketball', 1, 1000)} alt="Basketball" className="aspect-[4/3] w-full" /></div></section>
      <section className="wrap py-20 md:py-28"><h2 className="mb-10 text-5xl font-bold md:text-7xl">What we value</h2>
        <div className="grid gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-4">{values.map(([I, t, d]) => <div key={t} className="bg-white p-8"><I className="mb-6" /><h3 className="text-3xl font-bold">{t}</h3><p className="mt-3 text-sm text-black/60">{d}</p></div>)}</div></section>
      <section className="bg-lime py-16"><div className="wrap grid grid-cols-2 gap-8 lg:grid-cols-4">{stats.map(([n, l]) => <div key={l}><p className="font-display text-6xl font-black md:text-8xl">{n}</p><p className="text-sm font-medium">{l}</p></div>)}</div></section>
      <section className="wrap grid items-center gap-10 py-20 md:grid-cols-2 md:py-28">
        <Img src={sportImg('running', 0, 1000)} alt="Runner" className="aspect-[4/5] w-full" />
        <div><h2 className="text-5xl font-bold md:text-7xl">Performance philosophy</h2>
          <p className="mt-6 max-w-md text-lg text-black/70">Design for the moment of effort. We test in real conditions, measure what matters, and remove everything that does not help you move. Performance is a discipline, not a claim.</p></div></section>
      <section className="bg-ink py-20 text-center text-white"><h2 className="text-6xl font-bold md:text-8xl">Ready to move faster?</h2><Link to="/shop" className="btn btn-lime mt-8">Shop VOLTERRA</Link></section>
    </>
  )
}
