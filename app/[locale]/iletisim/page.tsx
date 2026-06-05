import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import AnnouncementBar from '@/components/sections/AnnouncementBar'
import { getContent } from '@/lib/content'
import { Mail, Clock, MapPin, MessageCircle } from 'lucide-react'
import InstagramIcon from '@/components/ui/InstagramIcon'

const locales = ['tr', 'en']

const BASE_URL = 'https://cayityuksel.com'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isTR = locale === 'tr'
  const title = isTR ? 'İletişim | Cayit Yüksel' : 'Contact | Cayit Yüksel'
  const description = isTR
    ? 'Cayit Yüksel ile iletişime geçin. WhatsApp, e-posta veya Instagram üzerinden ulaşın.'
    : 'Get in touch with Cayit Yüksel. Reach via WhatsApp, email or Instagram.'
  const url = `${BASE_URL}/${locale}/iletisim`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Cayit Yüksel',
      locale: isTR ? 'tr_TR' : 'en_US',
      type: 'website',
      images: [{ url: `${BASE_URL}/opengraph-image`, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [`${BASE_URL}/opengraph-image`] },
  }
}

export default async function IletisimPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!locales.includes(locale)) notFound()

  const messages = (await import(`@/messages/${locale}.json`)).default
  const content = getContent()
  const isTR = locale === 'tr'

  const cards = [
    {
      icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 28, height: 28 }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
      label: 'WhatsApp',
      value: '+90 544 571 55 43',
      sub: isTR ? 'En hızlı yanıt kanalı' : 'Fastest response channel',
      href: 'https://wa.me/905445715543',
      color: '#25D366',
    },
    {
      icon: <Mail size={28} />,
      label: isTR ? 'E-Posta' : 'Email',
      value: 'cayityuksel@hotmail.com',
      sub: isTR ? '24 saat içinde yanıt' : 'Reply within 24 hours',
      href: 'mailto:cayityuksel@hotmail.com',
      color: '#dc2626',
    },
    {
      icon: <InstagramIcon size={28} />,
      label: 'Instagram',
      value: '@cayit.yuksel',
      sub: isTR ? 'DM\'den ulaşabilirsiniz' : 'Reach via DM',
      href: 'https://instagram.com/cayit.yuksel',
      color: '#E1306C',
    },
  ]

  const faqs = isTR ? [
    { q: 'Hangi kanaldan ulaşmam daha hızlı?', a: 'WhatsApp üzerinden mesaj atmanız en hızlı yanıt almanızı sağlar. Genellikle birkaç saat içinde dönüş yapılmaktadır.' },
    { q: 'Yurt dışından başvurabilir miyim?', a: 'Evet, 15+ farklı ülkeden danışanlarımız bulunmaktadır. WhatsApp veya e-posta ile iletişime geçebilirsiniz.' },
    { q: 'Görüşme saatleri nedir?', a: 'Hafta içi 09:00 – 21:00 saatleri arasında aktifim. Acil durumlarda mesajınızı bırakabilirsiniz.' },
  ] : [
    { q: 'Which channel gets the fastest response?', a: 'Sending a message via WhatsApp will get you the fastest response. Replies are usually made within a few hours.' },
    { q: 'Can I apply from abroad?', a: 'Yes, we have clients from 15+ different countries. You can reach us via WhatsApp or email.' },
    { q: 'What are the working hours?', a: 'I am active on weekdays between 09:00 – 21:00. For urgent matters, you can leave a message anytime.' },
  ]

  return (
    <main style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <AnnouncementBar text={locale === 'tr' ? content.announcement.tr : content.announcement.en} active={content.announcement.active} locale={locale} />
      <Navbar locale={locale} messages={messages} content={content} />

      {/* Hero */}
      <section className="page-hero" style={{ position: 'relative', minHeight: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', paddingTop: '120px' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src={content.aboutImage} alt="İletişim" fill style={{ objectFit: 'cover', objectPosition: 'top' }} sizes="100vw" className="grayscale" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.85) 60%, #0a0a0a 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.5) 0%, transparent 50%, rgba(10,10,10,0.5) 100%)' }} />
        </div>
        <div className="page-hero-content" style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '60px 2rem' }}>
          <p style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '0.2em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            {isTR ? '/// İLETİŞİM' : '/// CONTACT'}
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.05, color: 'white', marginBottom: '0.5rem' }}>
            {isTR ? 'İLETİŞİME GEÇ' : 'GET IN TOUCH'}
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            {isTR
              ? 'Sorularınız için aşağıdaki kanallardan bana ulaşabilirsiniz.'
              : 'You can reach me through the channels below for your questions.'}
          </p>
        </div>
      </section>

      {/* İletişim Kartları */}
      <section style={{ padding: '80px 0', background: '#0a0a0a' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
          <div className="contact-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {cards.map((card) => (
              <a
                key={card.label}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card"
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                  padding: '2.5rem 2rem', background: '#111', border: '1px solid rgba(255,255,255,0.08)',
                  textDecoration: 'none', transition: 'border-color 0.2s, transform 0.2s',
                  gap: '1rem',
                }}
              >
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: `${card.color}18`, border: `2px solid ${card.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: card.color }}>
                  {card.icon}
                </div>
                <div>
                  <div style={{ color: '#6b7280', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px' }}>{card.label}</div>
                  <div style={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>{card.value}</div>
                  <div style={{ color: '#9ca3af', fontSize: '0.8rem', marginTop: '4px' }}>{card.sub}</div>
                </div>
                <div style={{ color: card.color, fontWeight: 800, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {isTR ? 'YAZIN' : 'CONTACT'} ▶
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Bilgi Kutuları */}
      <section style={{ padding: '0 0 80px', background: '#0a0a0a' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
          <div className="contact-info" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>

            {/* Çalışma Saatleri */}
            <div style={{ padding: '2rem', background: '#111', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem' }}>
                <Clock size={20} style={{ color: '#dc2626', flexShrink: 0 }} />
                <h3 style={{ color: 'white', fontWeight: 800, fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
                  {isTR ? 'ÇALIŞMA SAATLERİ' : 'WORKING HOURS'}
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {(isTR ? [
                  ['Pazartesi – Cuma', '09:00 – 21:00'],
                  ['Cumartesi', '10:00 – 18:00'],
                  ['Pazar', 'Kapalı'],
                ] : [
                  ['Monday – Friday', '09:00 – 21:00'],
                  ['Saturday', '10:00 – 18:00'],
                  ['Sunday', 'Closed'],
                ]).map(([day, hour]) => (
                  <div key={day} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>
                    <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>{day}</span>
                    <span style={{ color: hour === 'Kapalı' || hour === 'Closed' ? '#6b7280' : 'white', fontWeight: 600, fontSize: '0.875rem' }}>{hour}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Konum + Hızlı Yanıt */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ padding: '2rem', background: '#111', border: '1px solid rgba(255,255,255,0.08)', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.5rem' }}>
                  <MapPin size={20} style={{ color: '#dc2626', flexShrink: 0 }} />
                  <h3 style={{ color: 'white', fontWeight: 800, fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
                    {isTR ? 'HİZMET BÖLGESİ' : 'SERVICE AREA'}
                  </h3>
                </div>
                <p style={{ color: '#9ca3af', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>
                  {isTR
                    ? 'Türkiye & Yurt Dışı — %100 online hizmet. Avrupa, Amerika ve Orta Doğu başta olmak üzere 15+ ülkeden danışanlara koçluk yapıyorum.'
                    : 'Turkey & Worldwide — 100% online service. I coach clients from 15+ countries including Europe, America, and the Middle East.'}
                </p>
              </div>

              {/* CTA */}
              <a
                href={`https://wa.me/905445715543?text=${encodeURIComponent(isTR ? 'Merhaba, bilgi almak istiyorum.' : 'Hello, I would like to get information.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ justifyContent: 'center', fontSize: '14px', padding: '1.25rem' }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18, flexShrink: 0 }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                {isTR ? 'HEMEN WHATSAPP\'TAN YAZ' : 'MESSAGE ON WHATSAPP NOW'}
              </a>
            </div>
          </div>
        </div>

        {/* SSS benzeri kısa sorular */}
        <div style={{ maxWidth: '1280px', margin: '3rem auto 0', padding: '0 2rem' }}>
          <h2 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', fontWeight: 900, textTransform: 'uppercase', color: 'white', marginBottom: '0.5rem' }}>
            {isTR ? 'SIKÇA SORULANLAR' : 'QUICK FAQ'}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(255,255,255,0.06)' }}>
            {faqs.map((item, i) => (
              <div key={i} style={{ background: '#111', padding: '1.25rem 1.5rem' }}>
                <div style={{ color: '#dc2626', fontWeight: 700, fontSize: '0.875rem', marginBottom: '6px' }}>Q: {item.q}</div>
                <div style={{ color: '#9ca3af', fontSize: '0.875rem', lineHeight: 1.7 }}>{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer locale={locale} messages={messages} content={content} />

      <style>{`
        .contact-card:hover { border-color: rgba(220,38,38,0.6) !important; transform: translateY(-4px); }
        @media (max-width: 768px) {
          .contact-cards { grid-template-columns: 1fr !important; }
          .contact-info { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
