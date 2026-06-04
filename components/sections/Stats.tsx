import { SiteContent } from '@/lib/content'

interface Props {
  locale: string
  messages: Record<string, Record<string, string>>
  content: SiteContent
}

export default function Stats({ locale, messages, content }: Props) {
  const t = messages.stats

  const stats = [
    { value: content.stats.clients + '+', label: t.clients },
    { value: content.stats.years, label: t.years },
    { value: content.stats.countries + '+', label: t.countries },
    { value: '%' + content.stats.successRate, label: t.success },
  ]

  return (
    <section className="relative bg-red-600 py-10 overflow-hidden">
      {/* Diagonal stripes */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.5) 10px, rgba(255,255,255,0.5) 20px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
          {/* Title */}
          <div className="lg:w-1/3 text-center lg:text-left">
            <h2 className="text-white font-black text-xl uppercase tracking-wider italic">
              {t.title}
            </h2>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px h-16 bg-white/30 mx-8" />

          {/* Stats */}
          <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 divide-x-0 lg:divide-x lg:divide-white/30">
            {stats.map((stat, i) => (
              <div key={i} className="text-center px-4">
                <div className="text-4xl font-black text-white">{stat.value}</div>
                <div className="text-white/80 font-semibold text-xs tracking-widest mt-1 uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
