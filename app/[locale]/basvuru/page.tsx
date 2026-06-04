'use client'

import { useState } from 'react'
import { use } from 'react'
import Link from 'next/link'
import Navbar from '@/components/sections/Navbar'
import { ChevronRight, Send } from 'lucide-react'
import trMessages from '@/messages/tr.json'
import enMessages from '@/messages/en.json'

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

  const inputStyle: React.CSSProperties = {
    background: '#2a2a2a',
    border: '1px solid rgba(255,255,255,0.1)',
    borderLeft: '3px solid #dc2626',
    color: 'white',
    padding: '12px 16px',
    fontSize: '0.9rem',
    outline: 'none',
    width: '100%',
    transition: 'border-color 0.2s, background 0.2s',
  }

  const labelStyle: React.CSSProperties = {
    color: '#d1d5db',
    fontSize: '0.85rem',
    fontWeight: 600,
    marginBottom: '6px',
    display: 'block',
  }

  const input = (label: string, key: string, type = 'text', placeholder = '') => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[key] || ''}
        onChange={(e) => set(key, e.target.value)}
        style={inputStyle}
        onFocus={e => { e.currentTarget.style.background = '#222'; e.currentTarget.style.borderColor = '#dc2626' }}
        onBlur={e => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderLeftColor = '#dc2626' }}
      />
    </div>
  )

  const radio = (label: string, key: string, options: string[]) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label style={labelStyle}>{label}</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {options.map((opt) => (
          <label key={opt} style={{
            display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
            padding: '8px 16px', border: `1px solid ${form[key] === opt ? '#dc2626' : 'rgba(255,255,255,0.12)'}`,
            background: form[key] === opt ? 'rgba(220,38,38,0.15)' : '#1a1a1a',
            color: form[key] === opt ? 'white' : '#9ca3af', fontSize: '0.85rem', fontWeight: 500,
            transition: 'all 0.15s',
          }}>
            <input type="radio" name={key} value={opt} checked={form[key] === opt} onChange={() => set(key, opt)} style={{ display: 'none' }} />
            {opt}
          </label>
        ))}
      </div>
    </div>
  )

  const checkbox = (label: string, key: string, options: string[]) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label style={labelStyle}>{label}</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {options.map((opt) => {
          const checked = (form[key] || '').includes(opt)
          return (
            <label key={opt} style={{
              display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
              padding: '8px 16px', border: `1px solid ${checked ? '#dc2626' : 'rgba(255,255,255,0.12)'}`,
              background: checked ? 'rgba(220,38,38,0.15)' : '#1a1a1a',
              color: checked ? 'white' : '#9ca3af', fontSize: '0.85rem', fontWeight: 500,
              transition: 'all 0.15s',
            }}>
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => {
                  const cur = (form[key] || '').split(',').filter(Boolean)
                  set(key, e.target.checked ? [...cur, opt].join(', ') : cur.filter((v) => v !== opt).join(', '))
                }}
                style={{ display: 'none' }}
              />
              {opt}
            </label>
          )
        })}
      </div>
    </div>
  )

  const textarea = (label: string, key: string) => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label style={labelStyle}>{label}</label>
      <textarea
        rows={3}
        value={form[key] || ''}
        onChange={(e) => set(key, e.target.value)}
        style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }}
        onFocus={e => { e.currentTarget.style.background = '#222'; e.currentTarget.style.borderColor = '#dc2626' }}
        onBlur={e => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderLeftColor = '#dc2626' }}
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
  const navMessages = isTR ? trMessages : enMessages
  const col2: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem 2rem' }
  const colSpan: React.CSSProperties = { gridColumn: '1 / -1' }

  return (
    <main style={{ minHeight: '100vh', background: '#161616' }}>
      <Navbar locale={locale} messages={navMessages as unknown as Record<string, Record<string, string>>} />

      {/* Page header */}
      <div style={{ paddingTop: '120px', paddingBottom: '2rem', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', background: '#111' }}>
        <h1 style={{ color: 'white', fontWeight: 900, fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>{t.title}</h1>
        <p style={{ color: '#ef4444', fontWeight: 600, marginTop: '0.4rem' }}>{t.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

        {/* Row 1: Kişisel + Hedef */}
        <div style={col2}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {sectionTitle(t.sections.personal)}
            {input(isTR ? 'Ad Soyad' : 'Full Name', 'Ad Soyad')}
            {input(isTR ? 'Yaş' : 'Age', 'Yaş', 'number')}
            {input(isTR ? 'Boy (cm)' : 'Height (cm)', 'Boy')}
            {input(isTR ? 'Kilo (kg)' : 'Weight (kg)', 'Kilo')}
            {input(isTR ? 'Yaşadığın Ülke / Şehir' : 'Country / City', 'Ülke/Şehir')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
          </div>
        </div>

        {/* Row 2: Antrenman + Beslenme */}
        <div style={col2}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {sectionTitle(t.sections.training)}
            {radio(isTR ? 'Daha önce spor yaptın mı?' : 'Have you exercised before?', 'Spor Geçmişi', isTR ? ['Evet', 'Hayır'] : ['Yes', 'No'])}
            {input(isTR ? 'Eğer evet ise ne kadar süre?' : 'If yes, for how long?', 'Spor Süresi')}
            {radio(isTR ? 'Haftada kaç gün antrenman yapabilirsin?' : 'How many days/week can you train?', 'Haftalık Gün', ['1-2', '3-4', '5-6', '6+'])}
            {radio(isTR ? 'Antrenman yaptığın ortam' : 'Training environment', 'Ortam', isTR ? ['Fitness salonu', 'Ev', 'İkisi de'] : ['Gym', 'Home', 'Both'])}
            {radio(isTR ? 'Şu an aktif spor yapıyor musun?' : 'Are you currently active?', 'Aktif Spor', isTR ? ['Evet', 'Hayır'] : ['Yes', 'No'])}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {sectionTitle(t.sections.nutrition)}
            {radio(isTR ? 'Beslenme düzenin nasıl?' : 'How is your diet?', 'Beslenme', isTR ? ['Düzensiz', 'Orta', 'Disiplinli'] : ['Irregular', 'Moderate', 'Disciplined'])}
            {input(isTR ? 'Günlük öğün sayın' : 'Daily meal count', 'Öğün')}
            {input(isTR ? 'Günlük su tüketimin (litre)' : 'Daily water intake (liters)', 'Su')}
            {radio(isTR ? 'Daha önce diyet yaptın mı?' : 'Have you dieted before?', 'Diyet', isTR ? ['Evet', 'Hayır'] : ['Yes', 'No'])}
            {input(isTR ? 'Alerjin / özel beslenme durumun' : 'Allergies / special dietary needs', 'Alerji')}
          </div>
        </div>

        {/* Row 3: Sağlık + Günlük Yaşam */}
        <div style={col2}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {sectionTitle(t.sections.health)}
            {radio(isTR ? 'Herhangi bir kronik rahatsızlığın var mı?' : 'Any chronic conditions?', 'Kronik', isTR ? ['Evet', 'Hayır'] : ['Yes', 'No'])}
            {input(isTR ? 'Varsa belirtiniz' : 'If yes, please specify', 'Kronik Detay')}
            {radio(isTR ? 'Daha önce ameliyat geçirdin mi?' : 'Have you had surgery before?', 'Ameliyat', isTR ? ['Evet', 'Hayır'] : ['Yes', 'No'])}
            {input(isTR ? 'Varsa açıklama' : 'If yes, explain', 'Ameliyat Detay')}
            {radio(isTR ? 'Düzenli ilaç kullanıyor musun?' : 'Do you use medication regularly?', 'İlaç', isTR ? ['Evet', 'Hayır'] : ['Yes', 'No'])}
            {radio(isTR ? 'Sporu engelleyen ağrı / sakatlık var mı?' : 'Any pain/injury that limits exercise?', 'Sakatlık', isTR ? ['Evet', 'Hayır'] : ['Yes', 'No'])}
            {textarea(isTR ? 'Varsa açıklayınız' : 'If yes, explain', 'Sakatlık Detay')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {sectionTitle(t.sections.lifestyle)}
            {radio(isTR ? 'İş durumun' : 'Work type', 'İş', isTR ? ['Aktif (hareketli)', 'Masa başı', 'Karma'] : ['Active (physical)', 'Desk job', 'Mixed'])}
            {input(isTR ? 'Günlük uyku süren (saat)' : 'Daily sleep (hours)', 'Uyku')}
            {radio(isTR ? 'Stres seviyen' : 'Stress level', 'Stres', isTR ? ['Düşük', 'Orta', 'Yüksek'] : ['Low', 'Medium', 'High'])}

            {sectionTitle(t.sections.motivation)}
            {input(isTR ? 'Bu sürece ne kadar ciddisin? (1-10)' : 'How serious are you? (1-10)', 'Ciddiyet')}
            {textarea(isTR ? 'Daha önce neden sonuç alamadığını düşünüyorsun?' : "Why haven't you gotten results before?", 'Engel')}
            {textarea(isTR ? 'En büyük engelin nedir?' : 'What is your biggest obstacle?', 'Büyük Engel')}

            {sectionTitle(t.sections.final)}
            {radio(isTR ? 'Başlamaya hazır mısın?' : 'Are you ready to start?', 'Hazır', isTR ? ['Evet', 'Hayır'] : ['Yes', 'No'])}
          </div>
        </div>

        {/* Privacy note */}
        <div style={{ ...colSpan, border: '1px solid rgba(255,255,255,0.1)', background: '#2a2a2a', padding: '1rem' }}>
          <p style={{ color: '#6b7280', fontSize: '0.75rem', lineHeight: 1.6 }}>🔒 {t.privacy}</p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn-primary w-full justify-center text-base py-5"
          style={{ clipPath: 'none' }}
        >
          <Send size={18} />
          {t.submit}
        </button>
      </form>
    </main>
  )
}
