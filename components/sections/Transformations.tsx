import { SiteContent } from '@/lib/content'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface Props {
  locale: string
  messages: Record<string, unknown>
  content: SiteContent
}

export default function Transformations({ locale, messages, content }: Props) {
  const t = messages.transformations as Record<string, string>

  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="section-tag">{t.tag}</p>
            <h2 className="section-title">{t.title}</h2>
          </div>
          {content.transformations.length > 0 && (
            <a href="#" className="btn-primary text-sm hidden sm:inline-flex">
              {t.see_all} <ChevronRight size={14} />
            </a>
          )}
        </div>

        {/* Cards or empty */}
        {content.transformations.length === 0 ? (
          <div className="card border-dashed border-2 border-white/20 py-20 text-center">
            <p className="text-gray-500 text-lg">{t.empty}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.transformations.map((item) => (
              <div key={item.id} className="card rounded-none overflow-hidden border border-white/10">
                <div className="bg-red-600/10 border-b border-red-600/30 px-4 py-3">
                  <span className="text-red-400 font-bold text-sm tracking-wide">{item.package}</span>
                </div>
                <div className="grid grid-cols-2">
                  <div className="relative aspect-square">
                    <Image src={item.before} alt="before" fill className="object-cover" sizes="200px" />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-center py-1.5">
                      <span className="text-white text-xs font-black tracking-widest">{t.before}</span>
                    </div>
                  </div>
                  <div className="relative aspect-square">
                    <Image src={item.after} alt="after" fill className="object-cover" sizes="200px" />
                    <div className="absolute bottom-0 left-0 right-0 bg-red-600/80 text-center py-1.5">
                      <span className="text-white text-xs font-black tracking-widest">{t.after}</span>
                    </div>
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
