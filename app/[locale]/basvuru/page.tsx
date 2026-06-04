'use client'

import { useState } from 'react'
import { use } from 'react'
import Link from 'next/link'
import Navbar from '@/components/sections/Navbar'
import { ChevronRight, Send } from 'lucide-react'

const WHATSAPP_NUMBER = '905445715543'

const TR = {
  title: 'ONLINE COACHING BAŞVURU FORMU',
  subtitle: 'Cayit Yüksel | Online Bodybuilding Coach',
  sections: {
    personal: '1. KİŞİSEL BİLGİLER',
    goal: '2. HEDEF BİLGİLERİ',
    training: '3. ANTRENMAN GEÇMİŞİ',
    nutrition: '4. BESLENME DURUMU',
    health: '5. SAĞLIK DURUMU',
    lifestyle: '6. GÜNLÜK YAŞAM',
    motivation: '7. MOTİVASYON & CİDDİYET',
    photo: '8. FİZİKSEL DURUM (OPSİYONEL)',
    final: '9. SON SORU',
  },
  submit: 'WHATSAPP\'TAN GÖNDER',
  privacy: 'Bu form, sana en uygun antrenman ve beslenme programını oluşturmak için kullanılacaktır. Verdiğin bilgiler gizli tutulur.',
}

const EN = {
  title: 'ONLINE COACHING APPLICATION FORM',
  subtitle: 'Cayit Yüksel | Online Bodybuilding Coach',
  sections: {
    personal: '1. PERSONAL INFORMATION',
    goal: '2. GOAL INFORMATION',
    training: '3. TRAINING HISTORY',
    nutrition: '4. NUTRITION STATUS',
    health: '5. HEALTH STATUS',
    lifestyle: '6. DAILY LIFE',
    motivation: '7. MOTIVATION & COMMITMENT',
    photo: '8. PHYSICAL STATUS (OPTIONAL)',
    final: '9. FINAL QUESTION',
  },
  submit: 'SEND VIA WHATSAPP',
  privacy: 'This form will be used to create the most suitable training and nutrition program for you. Your information is kept confidential.',
}

function buildWhatsappMessage(data: Record<string, string>, locale: string) {
  const lines = Object.entries(data)
    .filter(([, v]) => v)
    .map(([k, v]) => `• ${k}: ${v}`)
    .join('\n')
  const header = locale === 'tr'
    ? 'Merhaba, Online Coaching Başvuru Formu doldurmak istiyorum:\n\n'
    : 'Hello, I would like to fill out the Online Coaching Application Form:\n\n'
  return header + lines
}

export default function BasvuruPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params)
  const t = locale === 'tr' ? TR : EN
  const [form, setForm] = useState<Record<string, string>>({})

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const msg = buildWhatsappMessage(form, locale)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const input = (label: string, key: string, type = 'text', placeholder = '') => (
    <div className="flex flex-col gap-1.5">
      <label className="text-gray-300 text-sm font-semibold">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[key] || ''}
        onChange={(e) => set(key, e.target.value)}
        className="bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-red-600 transition-colors"
      />
    </div>
  )

  const radio = (label: string, key: string, options: string[]) => (
    <div className="flex flex-col gap-2">
      <label className="text-gray-300 text-sm font-semibold">{label}</label>
      <div className="flex flex-wrap gap-3">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={key}
              value={opt}
              checked={form[key] === opt}
              onChange={() => set(key, opt)}
              className="accent-red-600"
            />
            <span className="text-gray-300 text-sm">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  )

  const checkbox = (label: string, key: string, options: string[]) => (
    <div className="flex flex-col gap-2">
      <label className="text-gray-300 text-sm font-semibold">{label}</label>
      <div className="flex flex-wrap gap-3">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={(form[key] || '').includes(opt)}
              onChange={(e) => {
                const cur = (form[key] || '').split(',').filter(Boolean)
                set(key, e.target.checked ? [...cur, opt].join(', ') : cur.filter((v) => v !== opt).join(', '))
              }}
              className="accent-red-600"
            />
            <span className="text-gray-300 text-sm">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  )

  const textarea = (label: string, key: string) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-gray-300 text-sm font-semibold">{label}</label>
      <textarea
        rows={3}
        value={form[key] || ''}
        onChange={(e) => set(key, e.target.value)}
        className="bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-red-600 transition-colors resize-none"
      />
    </div>
  )

  const sectionTitle = (text: string) => (
    <div className="flex items-center gap-3 mt-8 mb-4">
      <div className="h-px flex-1 bg-white/10" />
      <h3 className="text-red-500 font-black text-sm tracking-widest uppercase whitespace-nowrap">{text}</h3>
      <div className="h-px flex-1 bg-white/10" />
    </div>
  )

  const isTR = locale === 'tr'

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <div className="pt-8 pb-4 px-4 text-center border-b border-white/10 bg-[#111111]">
        <Link href={`/${locale}`} className="text-gray-500 text-sm hover:text-white transition-colors">
          ← {isTR ? 'Ana Sayfaya Dön' : 'Back to Home'}
        </Link>
        <h1 className="text-white font-black text-2xl lg:text-4xl mt-4 tracking-tight">{t.title}</h1>
        <p className="text-red-500 font-semibold mt-1">{t.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-4 sm:px-6 py-12 flex flex-col gap-4">

        {sectionTitle(t.sections.personal)}
        {input(isTR ? 'Ad Soyad' : 'Full Name', 'Ad Soyad')}
        {input(isTR ? 'Yaş' : 'Age', 'Yaş', 'number')}
        {input(isTR ? 'Boy (cm)' : 'Height (cm)', 'Boy')}
        {input(isTR ? 'Kilo (kg)' : 'Weight (kg)', 'Kilo')}
        {input(isTR ? 'Yaşadığın Ülke / Şehir' : 'Country / City', 'Ülke/Şehir')}

        {sectionTitle(t.sections.goal)}
        {checkbox(
          isTR ? 'Hedefin nedir?' : 'What is your goal?',
          'Hedef',
          isTR
            ? ['Kas kazanımı', 'Yağ kaybı', 'Vücut şekillendirme', 'Güç artışı', 'Performans geliştirme']
            : ['Muscle gain', 'Fat loss', 'Body recomposition', 'Strength increase', 'Performance improvement']
        )}
        {input(isTR ? 'Hedef kilon nedir?' : 'Target weight?', 'Hedef Kilo')}
        {input(isTR ? 'Bu hedefe ulaşmak istediğin süre?' : 'Timeline to reach your goal?', 'Süre')}

        {sectionTitle(t.sections.training)}
        {radio(isTR ? 'Daha önce spor yaptın mı?' : 'Have you exercised before?', 'Spor Geçmişi', isTR ? ['Evet', 'Hayır'] : ['Yes', 'No'])}
        {input(isTR ? 'Eğer evet ise ne kadar süre?' : 'If yes, for how long?', 'Spor Süresi')}
        {radio(isTR ? 'Haftada kaç gün antrenman yapabilirsin?' : 'How many days/week can you train?', 'Haftalık Gün', ['1-2', '3-4', '5-6', '6+'])}
        {radio(isTR ? 'Antrenman yaptığın ortam' : 'Training environment', 'Ortam', isTR ? ['Fitness salonu', 'Ev', 'İkisi de'] : ['Gym', 'Home', 'Both'])}
        {radio(isTR ? 'Şu an aktif spor yapıyor musun?' : 'Are you currently active?', 'Aktif Spor', isTR ? ['Evet', 'Hayır'] : ['Yes', 'No'])}

        {sectionTitle(t.sections.nutrition)}
        {radio(isTR ? 'Beslenme düzenin nasıl?' : 'How is your diet?', 'Beslenme', isTR ? ['Düzensiz', 'Orta', 'Disiplinli'] : ['Irregular', 'Moderate', 'Disciplined'])}
        {input(isTR ? 'Günlük öğün sayın' : 'Daily meal count', 'Öğün')}
        {input(isTR ? 'Günlük su tüketimin (litre)' : 'Daily water intake (liters)', 'Su')}
        {radio(isTR ? 'Daha önce diyet yaptın mı?' : 'Have you dieted before?', 'Diyet', isTR ? ['Evet', 'Hayır'] : ['Yes', 'No'])}
        {input(isTR ? 'Alerjin / özel beslenme durumun' : 'Allergies / special dietary needs', 'Alerji')}

        {sectionTitle(t.sections.health)}
        {radio(isTR ? 'Herhangi bir kronik rahatsızlığın var mı?' : 'Any chronic conditions?', 'Kronik', isTR ? ['Evet', 'Hayır'] : ['Yes', 'No'])}
        {input(isTR ? 'Varsa belirtiniz' : 'If yes, please specify', 'Kronik Detay')}
        {radio(isTR ? 'Daha önce ameliyat geçirdin mi?' : 'Have you had surgery before?', 'Ameliyat', isTR ? ['Evet', 'Hayır'] : ['Yes', 'No'])}
        {input(isTR ? 'Varsa açıklama' : 'If yes, explain', 'Ameliyat Detay')}
        {radio(isTR ? 'Düzenli ilaç kullanıyor musun?' : 'Do you use medication regularly?', 'İlaç', isTR ? ['Evet', 'Hayır'] : ['Yes', 'No'])}
        {radio(isTR ? 'Sporu engelleyen ağrı / sakatlık var mı?' : 'Any pain/injury that limits exercise?', 'Sakatlık', isTR ? ['Evet', 'Hayır'] : ['Yes', 'No'])}
        {textarea(isTR ? 'Varsa açıklayınız' : 'If yes, explain', 'Sakatlık Detay')}

        {sectionTitle(t.sections.lifestyle)}
        {radio(isTR ? 'İş durumun' : 'Work type', 'İş', isTR ? ['Aktif (hareketli)', 'Masa başı', 'Karma'] : ['Active (physical)', 'Desk job', 'Mixed'])}
        {input(isTR ? 'Günlük uyku süren (saat)' : 'Daily sleep (hours)', 'Uyku')}
        {radio(isTR ? 'Stres seviyen' : 'Stress level', 'Stres', isTR ? ['Düşük', 'Orta', 'Yüksek'] : ['Low', 'Medium', 'High'])}

        {sectionTitle(t.sections.motivation)}
        {input(isTR ? 'Bu sürece ne kadar ciddisin? (1-10)' : 'How serious are you? (1-10)', 'Ciddiyet')}
        {textarea(isTR ? 'Daha önce neden sonuç alamadığını düşünüyorsun?' : 'Why do you think you haven\'t gotten results before?', 'Engel')}
        {textarea(isTR ? 'En büyük engelin nedir?' : 'What is your biggest obstacle?', 'Büyük Engel')}

        {sectionTitle(t.sections.final)}
        {radio(isTR ? 'Başlamaya hazır mısın?' : 'Are you ready to start?', 'Hazır', isTR ? ['Evet', 'Hayır'] : ['Yes', 'No'])}

        {/* Privacy note */}
        <div className="border border-white/10 bg-[#1a1a1a] p-4 mt-4">
          <p className="text-gray-500 text-xs leading-relaxed">🔒 {t.privacy}</p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn-primary w-full justify-center text-base py-5 mt-4"
          style={{ clipPath: 'none' }}
        >
          <Send size={18} />
          {t.submit}
        </button>
      </form>
    </main>
  )
}
