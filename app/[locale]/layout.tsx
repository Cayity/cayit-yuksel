import WhatsAppFloat from '@/components/ui/WhatsAppFloat'

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
    </>
  )
}
