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
  const title = isTR ? 'KVKK Aydınlatma Metni | Cayit Yüksel' : 'Privacy Notice | Cayit Yüksel'
  return {
    title,
    description: isTR
      ? 'Kişisel verilerin korunması kanunu kapsamında aydınlatma metni.'
      : 'Personal data protection notice under applicable privacy laws.',
    alternates: { canonical: `${BASE_URL}/${locale}/kvkk` },
  }
}

const CONTENT = {
  tr: {
    tag: '/// YASAL BİLGİLENDİRME',
    title: 'KVKK AYDINLATMA METNİ',
    updated: 'Son güncelleme: Haziran 2025',
    sections: [
      {
        heading: '1. Veri Sorumlusu',
        body: 'Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca Cayit Yüksel tarafından hazırlanmıştır. Veri sorumlusu sıfatıyla kişisel verilerinizi aşağıda açıklanan amaçlar doğrultusunda işlemekteyiz.',
      },
      {
        heading: '2. İşlenen Kişisel Veriler',
        body: 'Başvuru formu aracılığıyla; ad-soyad, yaş, cinsiyet, e-posta adresi, telefon numarası, vücut ölçüleri ve sağlık durumuna ilişkin beyanlar işlenebilmektedir. Bu veriler yalnızca online koçluk hizmetinin sunulması amacıyla toplanmaktadır.',
      },
      {
        heading: '3. Verilerin İşlenme Amacı',
        body: 'Kişisel verileriniz; size özel antrenman ve beslenme programı hazırlanması, koçluk süreci takibi, iletişim sağlanması ve hizmet kalitesinin artırılması amaçlarıyla işlenmektedir.',
      },
      {
        heading: '4. Verilerin Aktarılması',
        body: 'Kişisel verileriniz üçüncü kişilere satılmaz veya kiralanmaz. Yalnızca yasal zorunluluk halinde yetkili kamu kurum ve kuruluşlarıyla paylaşılabilir.',
      },
      {
        heading: '5. Verilerin Saklanması',
        body: 'Kişisel verileriniz, hizmet ilişkisi süresince ve ilişkinin sona ermesinin ardından yasal saklama süreleri boyunca güvenli ortamlarda muhafaza edilmektedir.',
      },
      {
        heading: '6. Haklarınız',
        body: 'KVKK madde 11 uyarınca; verilerinize erişim, düzeltme, silme, işlemeyi kısıtlama ve itiraz etme haklarına sahipsiniz. Bu haklarınızı cayityuksel@hotmail.com adresine e-posta göndererek kullanabilirsiniz.',
      },
      {
        heading: '7. İletişim',
        body: 'Her türlü soru ve talebiniz için: cayityuksel@hotmail.com',
      },
    ],
  },
  en: {
    tag: '/// LEGAL INFORMATION',
    title: 'PRIVACY NOTICE',
    updated: 'Last updated: June 2025',
    sections: [
      {
        heading: '1. Data Controller',
        body: 'This privacy notice has been prepared by Cayit Yüksel in accordance with applicable personal data protection laws. As the data controller, we process your personal data for the purposes described below.',
      },
      {
        heading: '2. Personal Data Collected',
        body: 'Through the application form, we may collect: name, age, gender, email address, phone number, body measurements and self-declared health information. This data is collected solely for the purpose of providing online coaching services.',
      },
      {
        heading: '3. Purpose of Processing',
        body: 'Your personal data is processed for preparing personalized training and nutrition programs, tracking your coaching progress, communication, and improving service quality.',
      },
      {
        heading: '4. Data Sharing',
        body: 'Your personal data is never sold or rented to third parties. It may only be shared with authorized public institutions in cases required by law.',
      },
      {
        heading: '5. Data Retention',
        body: 'Your personal data is securely stored for the duration of the service relationship and for statutory retention periods thereafter.',
      },
      {
        heading: '6. Your Rights',
        body: 'You have the right to access, correct, delete, restrict processing of, and object to the processing of your data. You may exercise these rights by emailing cayityuksel@hotmail.com.',
      },
      {
        heading: '7. Contact',
        body: 'For any questions or requests: cayityuksel@hotmail.com',
      },
    ],
  },
}

export default async function KVKKPage({ params }: { params: Promise<{ locale: string }> }) {
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
