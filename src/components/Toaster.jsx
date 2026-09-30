import { CheckCircle2 } from 'lucide-react'
import { useStore } from '../context/StoreContext'
export default function Toaster() {
  const { toasts } = useStore()
  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-[90] flex -translate-x-1/2 flex-col gap-2" aria-live="polite">
      {toasts.map(t => <div key={t.id} className="flex animate-up items-center gap-2 bg-ink px-5 py-3 text-sm text-white shadow-xl"><CheckCircle2 size={16} className="text-lime" />{t.m}</div>)}
    </div>
  )
}
