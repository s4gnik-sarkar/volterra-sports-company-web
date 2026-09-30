import { useState } from 'react'
export default function Img({ src, alt, className = '' }) {
  const [bad, setBad] = useState(false)
  if (bad) return <div role="img" aria-label={alt} className={`grid place-items-center bg-gradient-to-br from-char to-ink p-4 text-center font-display text-2xl font-bold uppercase text-lime ${className}`}>{alt}</div>
  return <img src={src} alt={alt} loading="lazy" onError={() => setBad(true)} className={`object-cover ${className}`} />
}
