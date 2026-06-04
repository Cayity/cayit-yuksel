import { SiteContent } from '@/lib/content'
import { ChevronRight } from 'lucide-react'

interface Props {
  locale: string
  messages: Record<string, Record<string, string>>
  content: SiteContent
}

export default function Hero({ locale, messages, content }: Props) {
  const t = messages.hero

  return (
    <section
      className="relative min-h-screen flex items-center justify-start overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0000 50%, #0a0a0a 100%)',
      }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${content.heroImage})` }}
      />

      {/* Red gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />

      {/* Diagonal red accent */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10"
        style={{
          background: 'linear-gradient(135deg, transparent 40%, #dc2626 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
        <div className="max-w-3xl">
          <p className="section-tag mb-4">{t.tag}</p>

          <h1
            className="section-title mb-6"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
          >
            {t.title.split('\n').map((line, i) => (
              <span key={i} className="block">
                {i === 0 || i === 2 ? (
                  <span className="text-red-600">{line}</span>
                ) : (
                  line
                )}
              </span>
            ))}
          </h1>

          <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-xl">
            {t.subtitle}
          </p>

          <div className="flex flex-wrap gap-4">
            <a href={`/${locale}/basvuru`} className="btn-primary text-base py-4 px-8">
              {t.cta} <ChevronRight size={18} />
            </a>
            <a href="#packages" className="btn-outline text-base py-4 px-8">
              {t.cta2}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <div className="w-px h-12 bg-white animate-pulse" />
      </div>
    </section>
  )
}
