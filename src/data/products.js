const u = (id, w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`
export const sports = [
  { slug: 'football', name: 'Football', imgs: ['1574629810360-7efbbe195018', '1517466787929-bc90951d0974'] },
  { slug: 'cricket', name: 'Cricket', imgs: ['1531415074968-036ba1b575da', '1540747913346-19e32dc3e97e'] },
  { slug: 'basketball', name: 'Basketball', imgs: ['1546519638-68e109498ffc', '1504450758481-7338eef7ccf6'] },
  { slug: 'badminton', name: 'Badminton', imgs: ['1626224583764-f87db24ac4ea', '1613918431703-aa50889e3be9'] },
  { slug: 'running', name: 'Running', imgs: ['1552674605-db6ffd4facb5', '1461896836934-ffe607ba8211'] },
  { slug: 'tennis', name: 'Tennis', imgs: ['1554068865-24cecd4e34b8', '1595435934249-5df7ed86e1c0'] },
  { slug: 'training', name: 'Training', imgs: ['1517836357463-d25dfeac3438', '1534438327276-14e5300c3a48'] },
  { slug: 'fitness', name: 'Fitness', imgs: ['1571902943202-507ec2618e8f', '1518611012118-696072aa579a'] },
]
export const categories = ['Footwear', 'Apparel', 'Equipment', 'Accessories']
export const sportImg = (slug, i = 0, w = 900) => u(sports.find(s => s.slug === slug).imgs[i % 2], w)
const SIZES = { Footwear: ['6', '7', '8', '9', '10', '11'], Apparel: ['S', 'M', 'L', 'XL'], Equipment: ['One Size'], Accessories: ['One Size'] }
const PAL = [
  [{ name: 'Black', hex: '#0a0a0a' }, { name: 'Lime', hex: '#c6ff00' }, { name: 'White', hex: '#f5f5f5' }],
  [{ name: 'Charcoal', hex: '#2a2a2e' }, { name: 'Lime', hex: '#c6ff00' }],
  [{ name: 'White', hex: '#f5f5f5' }, { name: 'Black', hex: '#0a0a0a' }, { name: 'Steel', hex: '#8a8f98' }],
]
const FEAT = {
  Footwear: ['Responsive foam midsole', 'Breathable engineered mesh', 'High-traction outsole', 'Lockdown heel counter'],
  Apparel: ['Moisture-wicking fabric', 'Four-way stretch', 'Flatlock seams', 'Reflective VOLTERRA detailing'],
  Equipment: ['Tournament-grade build', 'Tested by pro athletes', 'Durable, weather-ready finish', 'Balanced for control and power'],
  Accessories: ['Lightweight and compact', 'Reinforced stitching', 'Sweat-resistant materials', 'Built for daily training'],
}
const raw = `Apex Pro Firm Ground Boots|football|Footwear|129
Stadium Match Football|football|Equipment|39
Pitch Performance Jersey|football|Apparel|55
Keeper Grip Gloves|football|Accessories|34
Willow Elite Cricket Bat|cricket|Equipment|149
Wicket Pro Batting Gloves|cricket|Accessories|45
Crease Match Whites|cricket|Apparel|62
Court Rise Basketball Shoes|basketball|Footwear|139
Grip Pro Indoor Basketball|basketball|Equipment|42
Fastbreak Mesh Shorts|basketball|Apparel|38
Smash Carbon Racket|badminton|Equipment|119
Feather Shuttle Tube|badminton|Equipment|24
Court Flex Badminton Shoes|badminton|Footwear|89
Velocity Run Shoes|running|Footwear|149
Aero Run Singlet|running|Apparel|36
Tempo Running Tights|running|Apparel|58
Baseline Tennis Racket|tennis|Equipment|159
Ace Court Tennis Shoes|tennis|Footwear|119
Serve Performance Polo|tennis|Apparel|52
Forge Training Hoodie|training|Apparel|74
Power Training Duffel|training|Accessories|64
Flex Cross-Training Shoes|training|Footwear|99
Iron Adjustable Dumbbell|fitness|Equipment|189
Core Grip Yoga Mat|fitness|Equipment|44
Pulse Fitness Band|fitness|Accessories|79
Sculpt Compression Tee|fitness|Apparel|42`
const disc = [15, 20, 25, 30, 10, 35]
export const products = raw.split('\n').map((l, i) => {
  const [name, sport, category, price] = l.split('|')
  const d = disc[i % 6]
  const p = +price
  return {
    id: i + 1, name, sport, category, price: p, original: Math.round(p / (1 - d / 100)), discount: d,
    rating: +(4.3 + ((i * 7) % 7) / 10).toFixed(1), reviews: 40 + ((i * 53) % 400),
    sizes: SIZES[category], colors: PAL[i % 3],
    isNew: i % 3 === 0, trending: i % 4 === 1, featured: i % 5 === 0 || i % 7 === 0,
    images: [0, 1, 0, 1].map((k, j) => sportImg(sport, k, 700 + j * 10)),
    description: `${name} is engineered for athletes who refuse to slow down. Designed in our lab and proven on the pitch, court and track, it pairs a clean, minimal look with performance you can feel from the first minute.`,
    features: FEAT[category],
    specs: [['Sport', sport[0].toUpperCase() + sport.slice(1)], ['Category', category], ['Fit', 'True to size'], ['Care', 'Machine wash cold / wipe clean'], ['SKU', `VLT-${1000 + i * 13}`]],
  }
})
