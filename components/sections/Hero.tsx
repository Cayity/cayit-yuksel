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
      style={{ background: '#0a0a0a' }}
    >
      {/* Background image — daha görünür */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${content.heroImage})`, opacity: 0.65 }}
      />

      {/* Soldan sağa gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0.20) 60%, rgba(0,0,0,0) 100%)' }}
      />

      {/* Alt gradient */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: '180px', background: 'linear-gradient(to top, #0a0a0a, transparent)' }}
      />

      {/* İnce kırmızı sol şerit */}
      <div
        className="absolute left-0 top-0 bottom-0"
        style={{ width: '3px', background: 'linear-gradient(to bottom, transparent, #dc2626 30%, #dc2626 70%, transparent)' }}
      />

      {/* Content */}
      <div
        className="relative z-10 w-full pt-40 pb-24"
        style={{ paddingLeft: 'max(32px, calc((100vw - 1280px) / 2 + 32px))', paddingRight: '32px' }}
      >
        <div style={{ maxWidth: '620px' }}>
          <h1
            className="section-title"
            style={{
              fontSize: `clamp(2rem, 7vw, ${content.slogan?.fontSize ?? 5}rem)`,
              lineHeight: content.slogan?.lineHeight ?? 1.0,
              marginBottom: '0'
            }}
          >
            {(locale === 'tr' ? content.slogan?.tr : content.slogan?.en || t.title).split('\n').map((line, i) => (
              <span key={i} className="block">
                {i === 0 || i === 2
                  ? <span style={{ background: 'linear-gradient(90deg, #dc2626 0%, #ff6b35 60%, #ff4444 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{line}</span>
                  : line}
              </span>
            ))}
          </h1>

          {/* Subtitle — üstten ve alttan margin */}
          <p
            className="text-gray-300 leading-relaxed"
            style={{ fontSize: '1.05rem', maxWidth: '500px', marginTop: '28px', marginBottom: '36px' }}
          >
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
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0.3 }}
      >
        <div className="w-px h-12 bg-white animate-pulse" />
      </div>
    </section>
  )
}
