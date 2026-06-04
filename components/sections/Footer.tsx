import Link from 'next/link'
import InstagramIcon from '@/components/ui/InstagramIcon'

interface Props {
  locale: string
  messages: Record<string, unknown>
}

export default function Footer({ locale, messages }: Props) {
  const t = messages.footer as Record<string, string>
  const pkg = messages.packages as Record<string, unknown>
  const pkgItems = pkg.items as Array<{ name: string; id: string }>

  return (
    <footer className="bg-[#080808] border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-red-600 flex items-center justify-center font-black text-white">
                CY
              </div>
              <span className="font-black text-white text-lg tracking-tight">CAYIT YÜKSEL</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-6">
              {t.tagline}
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/cayit.yuksel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-red-500 transition-colors"
              >
                <InstagramIcon size={20} />
              </a>
            </div>
          </div>

          {/* Packages */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-widest uppercase mb-4">{t.packages}</h4>
            <ul className="space-y-2">
              {pkgItems.map((item) => (
                <li key={item.id}>
                  <a href="#packages" className="text-gray-500 hover:text-white text-sm transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Other */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-widest uppercase mb-4">{t.other}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">{t.kvkk}</a></li>
              <li><a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">{t.cookies}</a></li>
              <li><a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">{t.terms}</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">{t.copyright}</p>
          <div className="flex gap-4 items-center">
            <Link href="/tr" className="text-gray-600 hover:text-white text-xs font-bold tracking-wider transition-colors">TR</Link>
            <span className="text-gray-700">|</span>
            <Link href="/en" className="text-gray-600 hover:text-white text-xs font-bold tracking-wider transition-colors">EN</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
