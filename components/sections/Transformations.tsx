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
    <section style={{ padding: '50px 0', background: '#0a0a0a' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '0.2em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '0.75rem' }}>{t.tag}</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.4rem)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.05, letterSpacing: '-0.02em', color: 'white', marginBottom: '20px' }}>{t.title}</h2>
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

        {content.transformations.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
            <a href="#" className="btn-primary text-sm inline-flex">
              {t.see_all} <ChevronRight size={14} />
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
