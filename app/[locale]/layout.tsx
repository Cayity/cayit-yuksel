import WhatsAppFloat from '@/components/ui/WhatsAppFloat'
import ScrollToTop from '@/components/ui/ScrollToTop'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  return (
    <>
      {children}
      <WhatsAppFloat />
      <ScrollToTop />
    </>
  )
}
