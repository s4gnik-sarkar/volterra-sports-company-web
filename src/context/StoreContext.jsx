import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import { products } from '../data/products'
const Ctx = createContext(null)
export const useStore = () => useContext(Ctx)
function useLocal(k, init) {
  const [v, s] = useState(() => { try { return JSON.parse(localStorage.getItem(k)) ?? init } catch { return init } })
  useEffect(() => { try { localStorage.setItem(k, JSON.stringify(v)) } catch { /* ignore */ } }, [k, v])
  return [v, s]
}
export function StoreProvider({ children }) {
  const [cart, setCart] = useLocal('volterra-cart', [])
  const [wish, setWish] = useLocal('volterra-wish', [])
  const [panel, setPanel] = useState(null) // cart | wish | search | menu
  const [toasts, setToasts] = useState([])
  const toast = useCallback(m => {
    const id = Date.now() + Math.random()
    setToasts(t => [...t, { id, m }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2600)
  }, [])
  const addToCart = (p, { size, color, qty = 1 } = {}) => {
    size = size || p.sizes[0]; color = color || p.colors[0].name
    const key = `${p.id}-${size}-${color}`
    setCart(c => c.find(i => i.key === key) ? c.map(i => i.key === key ? { ...i, qty: i.qty + qty } : i) : [...c, { key, id: p.id, size, color, qty }])
    toast(`${p.name} added to cart`)
  }
  const setQty = (key, qty) => setCart(c => qty < 1 ? c.filter(i => i.key !== key) : c.map(i => i.key === key ? { ...i, qty } : i))
  const removeItem = key => setCart(c => c.filter(i => i.key !== key))
  const toggleWish = p => {
    const has = wish.includes(p.id)
    setWish(w => has ? w.filter(x => x !== p.id) : [...w, p.id])
    toast(has ? 'Removed from wishlist' : 'Saved to wishlist')
  }
  const lines = useMemo(() => cart.map(i => ({ ...i, product: products.find(p => p.id === i.id) })).filter(l => l.product), [cart])
  const count = lines.reduce((n, l) => n + l.qty, 0)
  const subtotal = lines.reduce((n, l) => n + l.qty * l.product.price, 0)
  const checkout = () => { setCart([]); setPanel(null); toast('Demo checkout complete. Thanks for playing hard!') }
  return (
    <Ctx.Provider value={{ cart, lines, count, subtotal, wish, panel, setPanel, toasts, toast, addToCart, setQty, removeItem, toggleWish, checkout }}>
      {children}
    </Ctx.Provider>
  )
}
