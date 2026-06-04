'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import InstagramIcon from '@/components/ui/InstagramIcon'
import { SiteContent } from '@/lib/content'

interface Props {
  locale: string
  messages: Record<string, Record<string, string>>
  content?: SiteContent
}

export default function Navbar({ locale, messages, content }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const t = messages.nav
  const otherLocale = locale === 'tr' ? 'en' : 'tr'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = [
    { label: t.home, href: `/${locale}` },
    { label: t.about, href: `#about` },
    { label: t.packages, href: `#packages` },
    { label: t.apply, href: `/${locale}/basvuru` },
    { label: t.contact, href: `#contact` },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/95 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}
      style={{ top: 'var(--announcement-height, 0px)' }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2 group">
          {content?.logo ? (
            <Image
              src={content.logo}
              alt="Cayit Yüksel Logo"
              width={content.logoWidth || 120}
              height={48}
              style={{ objectFit: 'contain', maxHeight: '48px', width: 'auto' }}
              priority
            />
          ) : (
            <>
              <div className="w-9 h-9 bg-red-600 flex items-center justify-center font-black text-white text-sm leading-none">
                CY
              </div>
              <span className="font-black text-white text-lg tracking-tight hidden sm:block">
                CAYIT YÜKSEL
              </span>
            </>
          )}
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-7">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-semibold text-gray-300 hover:text-white tracking-wide uppercase transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Lang toggle */}
          <Link
            href={`/${otherLocale}`}
            className="text-xs font-bold text-gray-400 hover:text-white border border-gray-600 hover:border-white px-2 py-1 transition-colors"
          >
            {otherLocale.toUpperCase()}
          </Link>

          {/* Instagram */}
          <a
            href="https://instagram.com/cayit.yuksel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors hidden sm:block"
          >
            <InstagramIcon size={18} />
          </a>

          {/* CTA */}
          <a href={`/${locale}/basvuru`} className="btn-primary hidden lg:inline-flex text-xs py-2.5 px-4">
            {t.cta} ▶
          </a>

          {/* Mobile menu btn */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-1"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-black/98 border-t border-white/10 px-4 py-6 flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-base font-semibold text-gray-300 hover:text-white tracking-wide uppercase transition-colors py-2 border-b border-white/5"
            >
              {link.label}
            </a>
          ))}
          <a href={`/${locale}/basvuru`} className="btn-primary mt-2 justify-center">
            {t.cta} ▶
          </a>
        </div>
      )}
    </header>
  )
}
