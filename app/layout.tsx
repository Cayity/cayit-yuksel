import type { Metadata } from "next"
import { headers } from "next/headers"
import { Bebas_Neue, Inter } from 'next/font/google'
import Analytics from "@/components/Analytics"
import { getContent } from "@/lib/content"
import "./globals.css"

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Cayit Yüksel | Online Bodybuilding Coach",
  description: "Level 1 Bodybuilding Coach. Kişiye özel antrenman ve beslenme programları ile online koçluk hizmeti. Personalized online coaching worldwide.",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers()
  const locale = headersList.get('x-locale') || 'tr'
  const { gaId } = await getContent()
  return (
    <html lang={locale} className={`${bebasNeue.variable} ${inter.variable}`}>
      <body>
        {children}
        <Analytics gaId={gaId} />
      </body>
    </html>
  )
}
