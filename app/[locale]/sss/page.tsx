import { notFound } from 'next/navigation'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import FAQ from '@/components/sections/FAQ'
import { getContent } from '@/lib/content'

const locales = ['tr', 'en']

export default async function SSSPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!locales.includes(locale)) notFound()

  const messages = (await import(`@/messages/${locale}.json`)).default
  const content = getContent()

  return (
    <main style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <Navbar locale={locale} messages={messages} content={content} />
      <div style={{ paddingTop: '100px' }}>
        <FAQ locale={locale} messages={messages} />
      </div>
      <Footer locale={locale} messages={messages} />
    </main>
  )
}
