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

/* Harf harf kırmızıya dönen animasyonlu link */
function StaggerLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ textDecoration: 'none', display: 'inline-flex', letterSpacing: '0.08em' }}
    >
      {label.split('').map((char, i) => (
        <span
          key={i}
          style={{
            color: hovered ? '#dc2626' : '#d1d5db',
            transition: `color 0.03s ease ${i * 30}ms`,
            fontSize: '13px',
            fontWeight: 700,
            textTransform: 'uppercase',
            whiteSpace: 'pre',
          }}
        >
          {char}
        </span>
      ))}
    </a>
  )
}

export default function Navbar({ locale, messages, content }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const t = messages.nav
  const otherLocale = locale === 'tr' ? 'en' : 'tr'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Menü açıkken body scroll kilitle
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const links = [
    { label: t.home,     href: `/${locale}` },
    { label: t.about,    href: `/${locale}/hakkimda` },
    { label: t.packages, href: `/${locale}/paketler` },
    { label: t.apply,    href: `/${locale}/basvuru` },
    { label: t.faq,      href: `/${locale}/sss` },
    { label: t.contact,  href: `/${locale}/iletisim` },
  ]

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: scrolled ? '0' : '30px',
          left: 0, right: 0,
          zIndex: 100,
          transition: 'top 0.3s, background 0.3s',
          background: scrolled || open ? 'rgba(0,0,0,0.97)' : 'transparent',
          backdropFilter: scrolled || open ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
        }}
      >
        <nav className="navbar-nav" style={{
          maxWidth: '1280px', margin: '0 auto',
          padding: '0 32px', height: '68px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px',
        }}>
          {/* Logo */}
          <Link href={`/${locale}`} onClick={() => setOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
            {content?.logo ? (
              <Image src={content.logo} alt="Logo" width={content.logoWidth || 120} height={44} style={{ objectFit: 'contain', maxHeight: '44px', width: 'auto' }} priority />
            ) : (
              <>
                <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #dc2626 0%, #ff4444 60%, #ff6b35 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: 'white', fontSize: '18px', borderRadius: '2px', flexShrink: 0 }}>CY</div>
                <span style={{ fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif', color: 'white', fontSize: '36px', letterSpacing: '0.08em', lineHeight: 1, fontWeight: 900 }}>CAYİT YÜKSEL</span>
              </>
            )}
          </Link>

          {/* Desktop links — lg ve üzeri */}
          <div style={{ alignItems: 'center', gap: '32px' }} className="navbar-links">
            {links.map((link) => (
              <StaggerLink key={link.label} href={link.href} label={link.label} />
            ))}
          </div>

          {/* Sağ taraf */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            {/* Dil toggle */}
            <Link
              href={`/${otherLocale}`}
              style={{ fontSize: '11px', fontWeight: 800, color: 'white', border: '1px solid rgba(255,255,255,0.4)', padding: '4px 8px', textDecoration: 'none', letterSpacing: '0.06em', transition: 'border-color 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'white' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.4)' }}
            >
              {otherLocale.toUpperCase()}
            </Link>

            {/* Instagram — her ekranda görünür */}
            <a href="https://instagram.com/cayit.yuksel" target="_blank" rel="noopener noreferrer"
              style={{ color: 'white', transition: 'opacity 0.2s', lineHeight: 0 }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              <InstagramIcon size={18} />
            </a>

            {/* Desktop CTA — sadece lg ve üzeri */}
            <a href={`/${locale}/basvuru`} className="btn-primary navbar-cta" style={{ fontSize: '12px', padding: '10px 18px', clipPath: 'none' }}>
              {t.cta} ▶
            </a>

            {/* Hamburger — sadece < lg */}
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
              className="navbar-hamburger"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', padding: '0', lineHeight: 0 }}
            >
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobil / tablet full-screen overlay — sadece < lg */}
      <div
        className="navbar-overlay"
        style={{
          position: 'fixed', inset: 0,
          zIndex: 90,
          background: '#0a0a0a',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          pointerEvents: open ? 'all' : 'none',
          opacity: open ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        {/* Sol kırmızı çizgi */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: 'linear-gradient(to bottom, transparent, #dc2626 30%, #dc2626 70%, transparent)' }} />

        <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '100%', padding: '0 32px' }}>
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: 'clamp(1.8rem, 6vw, 3rem)',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                lineHeight: 1.3,
                textAlign: 'center',
                display: 'block',
                opacity: open ? 1 : 0,
                transform: open ? 'translateY(0)' : 'translateY(16px)',
                transition: 'color 0.2s, opacity 0.25s, transform 0.25s',
                transitionDelay: open ? `${i * 50}ms` : '0ms',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#dc2626' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#ffffff' }}
            >
              {link.label}
            </a>
          ))}

          <a
            href={`/${locale}/basvuru`}
            onClick={() => setOpen(false)}
            className="btn-primary"
            style={{
              marginTop: '32px',
              fontSize: '14px',
              clipPath: 'none',
              opacity: open ? 1 : 0,
              transform: open ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.25s, transform 0.25s',
              transitionDelay: open ? `${links.length * 50}ms` : '0ms',
            }}
          >
            {t.cta} ▶
          </a>
        </nav>
      </div>
      <style>{`
        .navbar-links   { display: none; }
        .navbar-cta     { display: none !important; }
        .navbar-hamburger { display: flex; }
        .navbar-overlay { display: flex; }
        .navbar-nav { padding: 0 20px !important; }
        @media (min-width: 1024px) {
          .navbar-links     { display: flex; }
          .navbar-cta       { display: inline-flex !important; }
          .navbar-hamburger { display: none; }
          .navbar-overlay   { display: none !important; }
          .navbar-nav { padding: 0 32px !important; }
        }
      `}</style>
    </>
  )
}
