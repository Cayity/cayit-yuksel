import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Cayit Yüksel | Online Bodybuilding Coach",
  description: "Level 1 Bodybuilding Coach. Kişiye özel antrenman ve beslenme programları ile online koçluk hizmeti. Personalized online coaching worldwide.",
  keywords: "online koçluk, bodybuilding, fitness coach, cayit yuksel, antrenman programı, beslenme planı",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  )
}
