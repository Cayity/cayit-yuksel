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
      className="relative min-h-screen flex items-center justify-start overflow-hidden hero-section"
      style={{ background: '#0a0a0a' }}
    >
      {/* Background image — daha görünür */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat hero-bg"
        style={{ backgroundImage: `url(${content.heroImage})`, opacity: 0.65, backgroundPosition: 'center' }}
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
        className="relative z-10 w-full pt-28 pb-24 hero-content"
        style={{ paddingLeft: 'max(32px, calc((100vw - 1280px) / 2 + 32px))', paddingRight: '32px' }}
      >
        <div style={{ maxWidth: '620px', width: '100%' }}>
          <h1
            className="section-title"
            style={{
              fontSize: `clamp(2rem, 7vw, 3.8rem)`,
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
            <span className="hero-outline-btn" style={{ display: 'inline-block', padding: '2px', background: 'rgba(255,255,255,0.4)', clipPath: 'polygon(0 0, calc(100% - 13px) 0, 100% 13px, 100% 100%, 13px 100%, 0 calc(100% - 13px))', transition: 'transform 0.1s' }}>
              <a href="#packages" style={{ display: 'inline-flex', alignItems: 'center', background: '#0a0a0a', color: 'white', fontWeight: 800, fontSize: '0.875rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: 'calc(0.875rem - 2px) calc(2rem - 2px)', textDecoration: 'none', clipPath: 'polygon(0 0, calc(100% - 11px) 0, 100% 11px, 100% 100%, 11px 100%, 0 calc(100% - 11px))' }}>
                {t.cta2}
              </a>
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .hero-outline-btn:hover { transform: translateY(-1px); background: rgba(255,255,255,0.6) !important; }
        @media (max-width: 1023px) {
          .hero-section { align-items: flex-start !important; min-height: 70vh !important; }
          .hero-content { padding-top: 9rem !important; padding-bottom: 2rem !important; }
          .hero-bg { background-position: 70% center !important; }
        }
      `}</style>

      {/* Scroll indicator — sadece desktop */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden lg:flex"
        style={{ opacity: 0.3 }}
      >
        <div className="w-px h-12 bg-white animate-pulse" />
      </div>
    </section>
  )
}
