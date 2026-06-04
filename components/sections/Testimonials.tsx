'use client'

import { useState } from 'react'
import { SiteContent } from '@/lib/content'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import Image from 'next/image'

interface Props {
  locale: string
  messages: Record<string, unknown>
  content: SiteContent
}

export default function Testimonials({ locale, messages, content }: Props) {
  const t = messages.testimonials as Record<string, string>
  const [index, setIndex] = useState(0)
  const items = content.testimonials
  const perPage = 3

  const prev = () => setIndex((i) => Math.max(0, i - perPage))
  const next = () => setIndex((i) => Math.min(items.length - perPage, i + perPage))
  const visible = items.slice(index, index + perPage)

  return (
    <section style={{ padding: '50px 0', background: '#111111' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="section-tag">{t.tag}</p>
            <h2 className="section-title">{t.title}</h2>
          </div>
          {items.length > perPage && (
            <div className="flex gap-2">
              <button
                onClick={prev}
                disabled={index === 0}
                className="w-10 h-10 border border-white/20 flex items-center justify-center text-white hover:border-red-600 hover:text-red-500 disabled:opacity-30 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                disabled={index + perPage >= items.length}
                className="w-10 h-10 border border-white/20 flex items-center justify-center text-white hover:border-red-600 hover:text-red-500 disabled:opacity-30 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {items.length === 0 ? (
          <div className="card border-dashed border-2 border-white/20 py-20 text-center">
            <p className="text-gray-500 text-lg">{t.empty}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((item) => (
              <div key={item.id} className="card p-6 border border-white/10 flex flex-col gap-4">
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < item.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-300 text-sm leading-relaxed flex-1">"{item.text}"</p>

                {/* Author */}
                <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                  {item.avatar ? (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image src={item.avatar} alt={item.name} fill className="object-cover" sizes="40px" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-red-600/20 border border-red-600/30 flex items-center justify-center text-red-400 font-bold text-sm">
                      {item.name[0]}
                    </div>
                  )}
                  <div>
                    <div className="text-white font-semibold text-sm">{item.name}</div>
                    <div className="text-gray-500 text-xs">{item.package}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
