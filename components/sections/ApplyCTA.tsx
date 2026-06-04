import { ChevronRight } from 'lucide-react'

interface Props {
  locale: string
  messages: Record<string, unknown>
}

export default function ApplyCTA({ locale, messages }: Props) {
  const t = messages.apply as Record<string, string>

  return (
    <section className="py-24 bg-red-600 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.5) 10px, rgba(255,255,255,0.5) 20px)',
        }}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-red-200 text-sm font-bold tracking-widest uppercase mb-4">{t.tag}</p>
        <h2 className="text-white font-black text-5xl lg:text-6xl uppercase tracking-tight mb-4">
          {t.title}
        </h2>
        <p className="text-red-100 text-xl mb-10">{t.subtitle}</p>
        <a
          href={`/${locale}/basvuru`}
          className="inline-flex items-center gap-2 bg-white text-red-600 font-black text-sm tracking-widest uppercase px-10 py-5 hover:bg-red-50 transition-colors"
        >
          {t.cta} <ChevronRight size={18} />
        </a>
      </div>
    </section>
  )
}
