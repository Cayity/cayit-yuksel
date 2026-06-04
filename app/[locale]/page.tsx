import { notFound } from 'next/navigation'
import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import Packages from '@/components/sections/Packages'
import About from '@/components/sections/About'
import Transformations from '@/components/sections/Transformations'
import Testimonials from '@/components/sections/Testimonials'
import Social from '@/components/sections/Social'
import ApplyCTA from '@/components/sections/ApplyCTA'
import Footer from '@/components/sections/Footer'
import FAQ from '@/components/sections/FAQ'
import AnnouncementBar from '@/components/sections/AnnouncementBar'
import { getContent } from '@/lib/content'

const locales = ['tr', 'en']

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  if (!locales.includes(locale)) notFound()

  const messages = (await import(`@/messages/${locale}.json`)).default
  const content = getContent()

  return (
    <main>
      <AnnouncementBar text={locale === 'tr' ? content.announcement.tr : content.announcement.en} active={content.announcement.active} locale={locale} />
      <Navbar locale={locale} messages={messages} content={content} />
      <Hero locale={locale} messages={messages} content={content} />
      <Stats locale={locale} messages={messages} content={content} />
      <Packages locale={locale} messages={messages} />
      <About locale={locale} messages={messages} content={content} />
      <Transformations locale={locale} messages={messages} content={content} />
      <Testimonials locale={locale} messages={messages} content={content} />
      <Social locale={locale} messages={messages} content={content} />
      <ApplyCTA locale={locale} messages={messages} />
      <Footer locale={locale} messages={messages} />
    </main>
  )
}
