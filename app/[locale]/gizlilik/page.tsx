import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import AnnouncementBar from '@/components/sections/AnnouncementBar'
import { getContent } from '@/lib/content'

const locales = ['tr', 'en']
const BASE_URL = 'https://cayityuksel.com'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isTR = locale === 'tr'
  const title = isTR ? 'Gizlilik & Çerez Politikası | Cayit Yüksel' : 'Privacy & Cookie Policy | Cayit Yüksel'
  return {
    title,
    description: isTR
      ? 'Cayit Yüksel gizlilik politikası ve çerez kullanımı hakkında bilgi.'
      : 'Information about Cayit Yüksel privacy policy and cookie usage.',
    alternates: { canonical: `${BASE_URL}/${locale}/gizlilik` },
  }
}

const CONTENT = {
  tr: {
    tag: '/// YASAL BİLGİLENDİRME',
    title: 'GİZLİLİK & ÇEREZ POLİTİKASI',
    updated: 'Son güncelleme: Haziran 2025',
    sections: [
      {
        heading: '1. Gizlilik',
        body: 'cayityuksel.com olarak ziyaretçilerimizin gizliliğine önem veriyoruz. Bu politika, hangi verileri topladığımızı ve nasıl kullandığımızı açıklamaktadır. Topladığımız kişisel veriler yalnızca hizmet sunumu amacıyla kullanılmakta, üçüncü taraflarla paylaşılmamaktadır.',
      },
      {
        heading: '2. Çerezler (Cookies)',
        body: 'Sitemiz, temel işlevsellik için zorunlu çerezler kullanmaktadır. Bu çerezler oturum yönetimi gibi teknik amaçlarla kullanılır ve kişisel veri içermez. Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz; ancak bu durumda sitenin bazı özellikleri düzgün çalışmayabilir.',
      },
      {
        heading: '3. Üçüncü Taraf Servisler',
        body: 'Sitemizde WhatsApp, Instagram gibi üçüncü taraf platformlara yönlendirme bağlantıları bulunmaktadır. Bu platformların gizlilik politikaları kendi sorumluluklarındadır. Vercel altyapısı üzerinde barındırılan sitemiz, Vercel\'in güvenlik standartlarına uymaktadır.',
      },
      {
        heading: '4. Veri Güvenliği',
        body: 'Kişisel verileriniz HTTPS şifrelemesi ile iletilmektedir. Verilerinize yetkisiz erişimi önlemek için gerekli teknik ve idari tedbirler alınmaktadır.',
      },
      {
        heading: '5. Politika Değişiklikleri',
        body: 'Bu politikada yapılacak değişiklikler bu sayfada yayımlanacaktır. Siteyi kullanmaya devam etmeniz, güncellenmiş politikayı kabul ettiğiniz anlamına gelir.',
      },
      {
        heading: '6. İletişim',
        body: 'Gizlilik politikamıza ilişkin sorularınız için: cayityuksel@hotmail.com',
      },
    ],
  },
  en: {
    tag: '/// LEGAL INFORMATION',
    title: 'PRIVACY & COOKIE POLICY',
    updated: 'Last updated: June 2025',
    sections: [
      {
        heading: '1. Privacy',
        body: 'At cayityuksel.com, we value the privacy of our visitors. This policy explains what data we collect and how we use it. Personal data we collect is used solely for service delivery and is not shared with third parties.',
      },
      {
        heading: '2. Cookies',
        body: 'Our website uses essential cookies for basic functionality such as session management. These cookies contain no personal data. You may disable cookies in your browser settings; however, some features of the site may not work properly as a result.',
      },
      {
        heading: '3. Third-Party Services',
        body: 'Our site contains links to third-party platforms such as WhatsApp and Instagram. The privacy policies of these platforms are their own responsibility. Our site is hosted on Vercel infrastructure and complies with Vercel\'s security standards.',
      },
      {
        heading: '4. Data Security',
        body: 'Your personal data is transmitted via HTTPS encryption. Necessary technical and administrative measures are in place to prevent unauthorized access to your data.',
      },
      {
        heading: '5. Policy Changes',
        body: 'Any changes to this policy will be published on this page. Continued use of the site means you accept the updated policy.',
      },
      {
        heading: '6. Contact',
        body: 'For questions about our privacy policy: cayityuksel@hotmail.com',
      },
    ],
  },
}

export default async function GizlilikPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!locales.includes(locale)) notFound()

  const messages = (await import(`@/messages/${locale}.json`)).default
  const content = getContent()
  const t = CONTENT[locale as 'tr' | 'en']

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <AnnouncementBar text={locale === 'tr' ? content.announcement.tr : content.announcement.en} active={content.announcement.active} locale={locale} />
      <Navbar locale={locale} messages={messages} content={content} />

      <section style={{ paddingTop: '160px', paddingBottom: '100px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
          <p style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.2em', color: '#dc2626', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            {t.tag}
          </p>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: 'white', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            {t.title}
          </h1>
          <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '3rem' }}>{t.updated}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {t.sections.map((section, i) => (
              <div key={i} style={{ borderLeft: '3px solid #dc2626', paddingLeft: '1.5rem' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                  {section.heading}
                </h2>
                <p style={{ color: '#9ca3af', lineHeight: 1.8, fontSize: '0.95rem' }}>
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer locale={locale} messages={messages} content={content} />
    </main>
  )
}
