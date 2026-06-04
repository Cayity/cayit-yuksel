import { SiteContent } from '@/lib/content'
import { CheckCircle2, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface Props {
  locale: string
  messages: Record<string, unknown>
  content: SiteContent
}

export default function About({ locale, messages, content }: Props) {
  const t = messages.about as Record<string, unknown>
  const areas = t.areas as string[]

  return (
    <section id="about" className="py-24 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 overflow-hidden">
              <Image
                src={content.aboutImage}
                alt="Cayit Yüksel"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Red border accent */}
              <div className="absolute inset-0 border-2 border-red-600 translate-x-3 translate-y-3 -z-10" />
            </div>

            {/* Badge */}
            <div className="absolute bottom-8 right-0 lg:-right-6 bg-red-600 p-4 text-white text-center shadow-xl">
              <div className="text-3xl font-black">10+</div>
              <div className="text-xs font-bold tracking-widest uppercase mt-0.5">
                {locale === 'tr' ? 'Yıl Deneyim' : 'Years Exp.'}
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="section-tag">{t.tag as string}</p>
            <h2 className="section-title mb-2">{t.title as string}</h2>
            <p className="text-red-500 font-bold text-lg mb-6 tracking-wide">{t.subtitle as string}</p>

            <div className="space-y-4 text-gray-300 leading-relaxed mb-8">
              <p>{t.bio1 as string}</p>
              <p>{t.bio2 as string}</p>
              <p>{t.bio3 as string}</p>
            </div>

            {/* Expertise */}
            <div>
              <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-4">
                {t.expertise as string}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {areas.map((area, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-red-500 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{area}</span>
                  </div>
                ))}
              </div>
            </div>

            <a href={`/${locale}/basvuru`} className="btn-primary mt-8 inline-flex">
              {t.cta as string} <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
