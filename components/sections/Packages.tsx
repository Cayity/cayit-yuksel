import { Check, MessageCircle } from 'lucide-react'

interface Props {
  locale: string
  messages: Record<string, unknown>
}

const WHATSAPP_NUMBER = '905445715543'

function getWhatsappUrl(msg: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
}

export default function Packages({ locale, messages }: Props) {
  const t = messages.packages as Record<string, unknown>
  const features = t.features as Record<string, string>
  const items = t.items as Array<{
    id: string
    name: string
    color: string
    duration: string
    price: string
    description: string
    tag: string
    features: string[]
    whatsapp_msg: string
  }>
  const currency = t.currency as string

  const colorMap: Record<string, string> = {
    gray: 'border-gray-600',
    red: 'border-red-600',
    gold: 'border-yellow-500',
  }

  const badgeMap: Record<string, string> = {
    gray: 'bg-gray-700 text-gray-200',
    red: 'bg-red-600 text-white',
    gold: 'bg-yellow-500 text-black',
  }

  return (
    <section id="packages" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-tag">{t.tag as string}</p>
          <h2 className="section-title">
            {(t.title as string).split('\n').map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h2>
          <p className="text-gray-400 mt-4 text-lg max-w-xl mx-auto">{t.subtitle as string}</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {items.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative card rounded-none border-2 ${colorMap[pkg.color]} flex flex-col transition-transform hover:-translate-y-1 duration-200`}
            >
              {/* Popular badge */}
              {pkg.color === 'red' && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className={`${badgeMap[pkg.color]} text-xs font-black px-4 py-1 tracking-widest uppercase`}>
                    {t.popular as string}
                  </span>
                </div>
              )}

              {/* Card header */}
              <div className={`p-6 border-b border-white/10`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-black px-3 py-1 ${badgeMap[pkg.color]} tracking-widest`}>
                    {pkg.name}
                  </span>
                  <span className="text-gray-400 text-sm font-semibold">{pkg.duration}</span>
                </div>
                <div className="mt-4">
                  <span className="text-5xl font-black text-white">{pkg.price}</span>
                  <span className="text-2xl font-bold text-gray-300 ml-1">{currency}</span>
                </div>
                <p className="text-gray-400 text-sm mt-3 leading-relaxed">{pkg.description}</p>
              </div>

              {/* Features */}
              <div className="p-6 flex-1 flex flex-col gap-3">
                {pkg.features.map((key) => (
                  <div key={key} className="flex items-start gap-3">
                    <Check size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{features[key]}</span>
                  </div>
                ))}

                <p className="text-gray-500 text-xs mt-2 italic">{pkg.tag}</p>
              </div>

              {/* CTA */}
              <div className="p-6 pt-0">
                <a
                  href={getWhatsappUrl(pkg.whatsapp_msg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full justify-center text-sm"
                  style={{ clipPath: 'none' }}
                >
                  <MessageCircle size={16} />
                  {t.whatsapp as string}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
