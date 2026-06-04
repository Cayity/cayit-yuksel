'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface Props {
  text: string
  active: boolean
  locale: string
}

export default function AnnouncementBar({ text, active, locale }: Props) {
  const [visible, setVisible] = useState(true)

  if (!active || !visible) return null

  return (
    <div className="relative bg-red-600 text-white text-center py-2.5 px-12 text-sm font-semibold tracking-wide">
      <span>{text}</span>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 transition-opacity"
      >
        <X size={16} />
      </button>
    </div>
  )
}
