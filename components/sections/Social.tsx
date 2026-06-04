import { SiteContent } from '@/lib/content'
import InstagramIcon from '@/components/ui/InstagramIcon'

interface Props {
  locale: string
  messages: Record<string, unknown>
  content: SiteContent
}

export default function Social({ locale, messages, content }: Props) {
  const t = messages.social as Record<string, string>
  const { instagram, tiktok, youtube } = content.social

  const platforms = [
    instagram && {
      name: 'INSTAGRAM',
      handle: '@' + instagram.handle,
      followers: instagram.followers,
      url: instagram.url,
      icon: <InstagramIcon size={28} />,
      color: 'from-purple-600 to-pink-600',
    },
    youtube && {
      name: 'YOUTUBE',
      handle: '@' + youtube.handle,
      followers: youtube.followers,
      url: youtube.url,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z" />
        </svg>
      ),
      color: 'from-red-700 to-red-500',
    },
    tiktok && {
      name: 'TIKTOK',
      handle: '@' + tiktok.handle,
      followers: tiktok.followers,
      url: tiktok.url,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
          <path d="M19.6 3.4A4.5 4.5 0 0 1 15.1 0h-3.4v16.4a2.7 2.7 0 0 1-2.7 2.3 2.7 2.7 0 0 1-2.7-2.7 2.7 2.7 0 0 1 2.7-2.7c.27 0 .52.04.77.1V10a6.1 6.1 0 0 0-.77-.05A6.1 6.1 0 0 0 3 16.1 6.1 6.1 0 0 0 9.1 22.2a6.1 6.1 0 0 0 6.1-6.1V8.1a7.8 7.8 0 0 0 4.4 1.3V6a4.5 4.5 0 0 1-4.4-2.6H19.6z" />
        </svg>
      ),
      color: 'from-gray-800 to-gray-600',
    },
  ].filter(Boolean)

  return (
    <section id="contact" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <p className="section-tag">{t.tag}</p>
            <h2 className="section-title mb-4">
              {t.title.split('\n').map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h2>
            <p className="text-gray-400 text-lg">{t.subtitle}</p>
          </div>

          {/* Right - platform cards */}
          <div className="flex flex-col gap-4">
            {platforms.map((p) => p && (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card flex items-center gap-5 p-5 border border-white/10 hover:border-red-600/50 transition-colors group"
              >
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${p.color} flex items-center justify-center text-white flex-shrink-0`}>
                  {p.icon}
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-gray-500 tracking-widest">{p.name}</div>
                  <div className="text-white font-bold text-lg">{p.handle}</div>
                  {p.followers && (
                    <div className="text-red-500 font-black text-xl">{p.followers}</div>
                  )}
                </div>
                <div className="text-red-600 font-black text-sm tracking-widest group-hover:text-red-400 transition-colors">
                  {t.follow} ▶
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
