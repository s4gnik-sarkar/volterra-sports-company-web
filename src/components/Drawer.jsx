import { useEffect } from 'react'
import { X } from 'lucide-react'
export default function Drawer({ open, onClose, title, side = 'right', children, footer }) {
  useEffect(() => {
    if (!open) return
    const k = e => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', k); document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [open, onClose])
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 animate-fade bg-ink/60" onClick={onClose} />
      <aside className={`absolute top-0 flex h-full w-full max-w-md flex-col bg-white ${side === 'right' ? 'right-0 animate-slide' : 'left-0 animate-slideL'}`}>
        <header className="flex items-center justify-between border-b border-black/10 px-6 py-5">
          <h2 className="text-3xl font-bold">{title}</h2>
          <button onClick={onClose} aria-label="Close" className="p-1 hover:rotate-90 transition-transform"><X /></button>
        </header>
        <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
        {footer && <footer className="border-t border-black/10 px-6 py-5">{footer}</footer>}
      </aside>
    </div>
  )
}
