'use client'

import { useState, useEffect, useRef } from 'react'
import { SiteContent } from '@/lib/content'
import {
  Save, Plus, Trash2, LayoutDashboard, Image as ImageIcon,
  Star, Users, Settings, ExternalLink, Upload, X, Check, BarChart2
} from 'lucide-react'
import Image from 'next/image'

interface Props {
  initialContent: SiteContent
}

type Section = 'general' | 'about' | 'packages' | 'images' | 'transformations' | 'testimonials' | 'sponsor' | 'entegrasyon'

const NAV: { key: Section; label: string; icon: React.ReactNode }[] = [
  { key: 'general', label: 'Genel Ayarlar', icon: <Settings size={18} /> },
  { key: 'about', label: 'Hakkımda', icon: <Users size={18} /> },
  { key: 'packages', label: 'Paketler', icon: <LayoutDashboard size={18} /> },
  { key: 'images', label: 'Fotoğraflar', icon: <ImageIcon size={18} /> },
  { key: 'transformations', label: 'Dönüşümler', icon: <Users size={18} /> },
  { key: 'testimonials', label: 'Yorumlar', icon: <Star size={18} /> },
  { key: 'sponsor', label: 'Sponsor', icon: <LayoutDashboard size={18} /> },
  { key: 'entegrasyon', label: 'Entegrasyon', icon: <BarChart2 size={18} /> },
]

export default function AdminPanel({ initialContent }: Props) {
  const [content, setContent] = useState<SiteContent>(initialContent)
  const [section, setSection] = useState<Section>('general')
  const [saving, setSaving] = useState(false)
  const [savedOk, setSavedOk] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => { fetchImages() }, [])

  const fetchImages = async () => {
    const res = await fetch('/api/admin/images')
    const data = await res.json()
    setImages(data.images || [])
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    const data = await res.json()
    if (data.path) {
      await fetchImages()
    }
    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  const handleDelete = async (img: string) => {
    if (!confirm('Bu fotoğrafı silmek istiyor musun?')) return
    await fetch('/api/admin/images', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename: img.split('/').pop() }),
    })
    await fetchImages()
  }

  const copyPath = (path: string) => {
    navigator.clipboard.writeText(path)
  }

  const update = (path: string, value: unknown) => {
    setContent((prev) => {
      const next = JSON.parse(JSON.stringify(prev))
      const keys = path.split('.')
      let obj: Record<string, unknown> = next
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]] as Record<string, unknown>
      }
      obj[keys[keys.length - 1]] = value
      return next
    })
  }

  const save = async () => {
    setSaving(true)
    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content),
    })
    setSaving(false)
    setSavedOk(true)
    setTimeout(() => setSavedOk(false), 2500)
  }

  const inp: React.CSSProperties = { width: '100%', background: '#2a2a2a', border: '1px solid rgba(255,255,255,0.12)', color: 'white', padding: '10px 14px', fontSize: '14px', borderRadius: '6px', outline: 'none', boxSizing: 'border-box' }
  const lbl: React.CSSProperties = { color: '#9ca3af', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#111', color: 'white' }}>
      {/* SIDEBAR */}
      <aside style={{ width: '240px', flexShrink: 0, background: '#000', borderRight: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        {/* Brand */}
        <div style={{ padding: '28px 20px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '38px', height: '38px', background: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: 'white', fontSize: '13px', flexShrink: 0, borderRadius: '4px' }}>CY</div>
            <div>
              <div style={{ fontWeight: 900, color: 'white', fontSize: '14px', letterSpacing: '0.03em', lineHeight: 1.2 }}>CAYIT YÜKSEL</div>
              <div style={{ color: '#4b5563', fontSize: '11px', marginTop: '3px' }}>Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '24px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {NAV.map((item) => (
            <button
              key={item.key}
              onClick={() => setSection(item.key)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '12px 16px', borderRadius: '6px', border: 'none',
                cursor: 'pointer', width: '100%', textAlign: 'left',
                fontSize: '14px', fontWeight: 600, transition: 'background 0.15s',
                background: section === item.key ? '#dc2626' : 'transparent',
                color: section === item.key ? '#fff' : '#9ca3af',
              }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <a href="/tr" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', color: '#6b7280', textDecoration: 'none', fontSize: '13px', borderRadius: '6px' }}>
            <ExternalLink size={14} /> Siteyi Gör
          </a>
          <button
            onClick={async () => { await fetch('/admin/api/logout', { method: 'POST' }); window.location.href = '/admin/login' }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', borderRadius: '6px', width: '100%', textAlign: 'left' }}
          >
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Topbar */}
        <div style={{ flexShrink: 0, background: '#1a1a1a', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 style={{ color: 'white', fontWeight: 700, fontSize: '18px', margin: 0 }}>
            {NAV.find((n) => n.key === section)?.label}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a href="/tr" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>
              <ExternalLink size={15} /> Siteyi Gör
            </a>
            <button
              onClick={save}
              disabled={saving}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '10px 20px', border: 'none', cursor: 'pointer',
                fontSize: '14px', fontWeight: 700, borderRadius: '6px',
                background: savedOk ? '#16a34a' : '#dc2626',
                color: 'white', opacity: saving ? 0.6 : 1,
              }}
            >
              {savedOk ? <><Check size={16} /> Kaydedildi</> : saving ? <><Save size={16} /> Kaydediliyor...</> : <><Save size={16} /> Kaydet</>}
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', background: '#161616' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 32px' }}>

          {/* GENERAL */}
          {section === 'general' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <Card title="Logo">
                <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
                  {/* Preview */}
                  <div style={{ flexShrink: 0 }}>
                    <label style={lbl}>Önizleme</label>
                    <div style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '16px 24px', display: 'flex', alignItems: 'center', minWidth: '180px', minHeight: '64px' }}>
                      {content.logo ? (
                        <Image src={content.logo} alt="Logo" width={content.logoWidth} height={60} style={{ objectFit: 'contain', maxHeight: '60px', width: content.logoWidth }} />
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '36px', height: '36px', background: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: 'white', fontSize: '12px', borderRadius: '4px' }}>CY</div>
                          <span style={{ fontWeight: 900, color: 'white', fontSize: '14px' }}>CAYIT YÜKSEL</span>
                        </div>
                      )}
                    </div>
                    <p style={{ color: '#4b5563', fontSize: '11px', marginTop: '6px' }}>Logo yüklenmezse CY text logo gösterilir</p>
                  </div>

                  {/* Controls */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={lbl}>Logo Görseli</label>
                      <ImagePathInput value={content.logo} onChange={(v) => update('logo', v)} images={images} />
                    </div>

                    <div>
                      <label style={{ ...lbl, marginBottom: '10px' }}>
                        Logo Genişliği: <span style={{ color: 'white', fontWeight: 700 }}>{content.logoWidth}px</span>
                      </label>
                      <input
                        type="range"
                        min={40}
                        max={220}
                        step={5}
                        value={content.logoWidth}
                        onChange={(e) => update('logoWidth', Number(e.target.value))}
                        style={{ width: '100%', accentColor: '#dc2626', cursor: 'pointer' }}
                      />
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4b5563', fontSize: '11px', marginTop: '4px' }}>
                        <span>40px</span><span>220px</span>
                      </div>
                    </div>

                    {content.logo && (
                      <button
                        onClick={() => update('logo', '')}
                        style={{ alignSelf: 'flex-start', background: 'none', border: '1px solid rgba(239,68,68,0.4)', color: '#f87171', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
                      >
                        Logoyu Kaldır (Text Logo'ya Dön)
                      </button>
                    )}
                  </div>
                </div>
              </Card>

              <Card title="İstatistikler">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                  {[
                    { key: 'stats.clients', label: 'Danışan Sayısı' },
                    { key: 'stats.years', label: 'Yıl Deneyim' },
                    { key: 'stats.countries', label: 'Ülke Sayısı' },
                    { key: 'stats.successRate', label: 'Başarı Oranı (%)' },
                  ].map((s) => (
                    <div key={s.key}>
                      <label style={lbl}>{s.label}</label>
                      <input type="number" style={inp} value={getDeep(content, s.key) as number} onChange={(e) => update(s.key, Number(e.target.value))} />
                    </div>
                  ))}
                </div>
              </Card>

              <Card title="Slogan (Hero)">
                <p style={{ color: '#6b7280', fontSize: '12px', marginBottom: '16px' }}>
                  Her satır için Enter kullan. Satır 1 ve 3 kırmızı, diğerleri beyaz görünür.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={lbl}>Türkçe Slogan</label>
                    <textarea
                      rows={5}
                      style={{ ...inp, resize: 'none', fontFamily: 'monospace', lineHeight: 1.6 }}
                      value={content.slogan?.tr || ''}
                      onChange={(e) => update('slogan.tr', e.target.value)}
                    />
                  </div>
                  <div>
                    <label style={lbl}>İngilizce Slogan</label>
                    <textarea
                      rows={5}
                      style={{ ...inp, resize: 'none', fontFamily: 'monospace', lineHeight: 1.6 }}
                      value={content.slogan?.en || ''}
                      onChange={(e) => update('slogan.en', e.target.value)}
                    />
                  </div>
                </div>
                {/* Font size + line height */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '20px' }}>
                  <div>
                    <label style={{ ...lbl, marginBottom: '10px' }}>
                      Font Boyutu: <span style={{ color: 'white', fontWeight: 700 }}>{content.slogan?.fontSize ?? 5}rem</span>
                    </label>
                    <input type="range" min={2} max={8} step={0.1}
                      value={content.slogan?.fontSize ?? 5}
                      onChange={(e) => update('slogan.fontSize', Number(e.target.value))}
                      style={{ width: '100%', accentColor: '#dc2626', cursor: 'pointer' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4b5563', fontSize: '11px', marginTop: '4px' }}>
                      <span>2rem</span><span>8rem</span>
                    </div>
                  </div>
                  <div>
                    <label style={{ ...lbl, marginBottom: '10px' }}>
                      Satir Araligi: <span style={{ color: 'white', fontWeight: 700 }}>{content.slogan?.lineHeight ?? 1.0}</span>
                    </label>
                    <input type="range" min={0.8} max={1.8} step={0.05}
                      value={content.slogan?.lineHeight ?? 1.0}
                      onChange={(e) => update('slogan.lineHeight', Number(e.target.value))}
                      style={{ width: '100%', accentColor: '#dc2626', cursor: 'pointer' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4b5563', fontSize: '11px', marginTop: '4px' }}>
                      <span>0.8</span><span>1.8</span>
                    </div>
                  </div>
                </div>
                {/* Onizleme */}
                <div style={{ marginTop: '20px', background: '#0a0a0a', borderRadius: '8px', padding: '20px 24px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <p style={{ color: '#4b5563', fontSize: '11px', marginBottom: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Onizleme (TR)</p>
                  <div style={{ fontWeight: 900, lineHeight: content.slogan?.lineHeight ?? 1.0, fontSize: `${(content.slogan?.fontSize ?? 5) * 0.4}rem` }}>
                    {(content.slogan?.tr || '').split('\n').map((line, i) => (
                      <div key={i} style={{ color: i === 0 || i === 2 ? '#dc2626' : 'white' }}>{line || ' '}</div>
                    ))}
                  </div>
                </div>
              </Card>

              <Card title="Görseller">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <ImagePathInput label="Hero Görsel" value={content.heroImage} onChange={(v) => update('heroImage', v)} images={images} />
                  <ImagePathInput label="Hakkımda Görsel" value={content.aboutImage} onChange={(v) => update('aboutImage', v)} images={images} />
                </div>
                <p style={{ color: '#4b5563', fontSize: '12px', marginTop: '12px' }}>
                  💡 Fotoğraf yüklemek için{' '}
                  <button onClick={() => setSection('images')} style={{ color: '#f87171', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline', fontSize: '12px' }}>
                    Fotoğraflar
                  </button>{' '}
                  bölümüne git, yükle ve yolu buraya yapıştır.
                </p>
              </Card>

              <Card title="Duyuru Bandı">
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginBottom: '20px' }}>
                  <input type="checkbox" checked={content.announcement.active} onChange={(e) => update('announcement.active', e.target.checked)} style={{ accentColor: '#dc2626', width: '16px', height: '16px' }} />
                  <span style={{ color: 'white', fontSize: '14px', fontWeight: 600 }}>Duyuru bandını göster</span>
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={lbl}>Türkçe Metin</label>
                    <input style={inp} value={content.announcement.tr} onChange={(e) => update('announcement.tr', e.target.value)} />
                  </div>
                  <div>
                    <label style={lbl}>İngilizce Metin</label>
                    <input style={inp} value={content.announcement.en} onChange={(e) => update('announcement.en', e.target.value)} />
                  </div>
                </div>
              </Card>

              <Card title="Sosyal Medya — Instagram">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={lbl}>Kullanıcı Adı</label>
                    <input style={inp} value={content.social.instagram.handle} onChange={(e) => update('social.instagram.handle', e.target.value)} />
                  </div>
                  <div>
                    <label style={lbl}>Takipçi Sayısı</label>
                    <input style={inp} placeholder="örn: 50.000" value={content.social.instagram.followers} onChange={(e) => update('social.instagram.followers', e.target.value)} />
                  </div>
                  <div>
                    <label style={lbl}>Profil URL</label>
                    <input style={inp} value={content.social.instagram.url} onChange={(e) => update('social.instagram.url', e.target.value)} />
                  </div>
                </div>
              </Card>

              <Card title="Sosyal Medya — TikTok">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={lbl}>Kullanıcı Adı</label>
                    <input style={inp} placeholder="örn: cayit.yuksel" value={content.social.tiktok?.handle || ''} onChange={(e) => update('social.tiktok', { ...(content.social.tiktok || { handle: '', followers: '', url: '' }), handle: e.target.value })} />
                  </div>
                  <div>
                    <label style={lbl}>Takipçi Sayısı</label>
                    <input style={inp} placeholder="örn: 10.000" value={content.social.tiktok?.followers || ''} onChange={(e) => update('social.tiktok', { ...(content.social.tiktok || { handle: '', followers: '', url: '' }), followers: e.target.value })} />
                  </div>
                  <div>
                    <label style={lbl}>Profil URL</label>
                    <input style={inp} placeholder="https://tiktok.com/@..." value={content.social.tiktok?.url || ''} onChange={(e) => update('social.tiktok', { ...(content.social.tiktok || { handle: '', followers: '', url: '' }), url: e.target.value })} />
                  </div>
                </div>
              </Card>

              <Card title="Sosyal Medya — YouTube">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={lbl}>Kanal Adı</label>
                    <input style={inp} placeholder="örn: Cayit Yüksel" value={content.social.youtube?.handle || ''} onChange={(e) => update('social.youtube', { ...(content.social.youtube || { handle: '', followers: '', url: '' }), handle: e.target.value })} />
                  </div>
                  <div>
                    <label style={lbl}>Abone Sayısı</label>
                    <input style={inp} placeholder="örn: 5.000" value={content.social.youtube?.followers || ''} onChange={(e) => update('social.youtube', { ...(content.social.youtube || { handle: '', followers: '', url: '' }), followers: e.target.value })} />
                  </div>
                  <div>
                    <label style={lbl}>Kanal URL</label>
                    <input style={inp} placeholder="https://youtube.com/@..." value={content.social.youtube?.url || ''} onChange={(e) => update('social.youtube', { ...(content.social.youtube || { handle: '', followers: '', url: '' }), url: e.target.value })} />
                  </div>
                </div>
              </Card>

              <Card title="Sosyal Medya Fotoğrafları (Grid)">
                <p style={{ color: '#6b7280', fontSize: '12px', marginBottom: '16px' }}>En fazla 6 fotoğraf gösterilir. Sosyal medya bölümünde Instagram grid görünümü için kullanılır.</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px' }}>
                  {(content.socialPhotos || []).map((photo, i) => (
                    <div key={i} style={{ position: 'relative', aspectRatio: '1', background: '#1a1a1a', borderRadius: '4px', overflow: 'hidden' }}>
                      <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <button
                        onClick={() => update('socialPhotos', (content.socialPhotos || []).filter((_, idx) => idx !== i))}
                        style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(220,38,38,0.9)', border: 'none', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  {(content.socialPhotos || []).length < 6 && (
                    <label style={{ aspectRatio: '1', background: '#1a1a1a', border: '1px dashed rgba(255,255,255,0.15)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexDirection: 'column', gap: '4px', color: '#6b7280' }}>
                      <Upload size={20} />
                      <span style={{ fontSize: '10px' }}>Ekle</span>
                      <input type="file" accept="image/*" style={{ display: 'none' }} onChange={async (e) => {
                        const file = e.target.files?.[0]
                        if (!file) return
                        const fd = new FormData()
                        fd.append('file', file)
                        const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
                        const data = await res.json()
                        if (data.path) update('socialPhotos', [...(content.socialPhotos || []), data.path])
                        e.target.value = ''
                      }} />
                    </label>
                  )}
                </div>
              </Card>
            </div>
          )}

          {/* HAKKIMDA */}
          {section === 'about' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <Card title="Biyografi">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {(['bio1', 'bio2', 'bio3', 'bio4', 'bio5'] as const).map((key, i) => (
                    <div key={key}>
                      <label style={lbl}>Paragraf {i + 1}</label>
                      <textarea
                        style={{ ...inp, minHeight: '80px', resize: 'vertical' }}
                        value={(content.about as unknown as Record<string, string>)[key] || ''}
                        onChange={(e) => update(`about.${key}`, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </Card>

              <Card title="Sertifikalar">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {content.about.certifications.map((cert, i) => (
                    <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input
                        style={{ ...inp, flex: 1 }}
                        value={cert}
                        onChange={(e) => {
                          const updated = [...content.about.certifications]
                          updated[i] = e.target.value
                          update('about.certifications', updated)
                        }}
                      />
                      <button
                        onClick={() => {
                          const updated = content.about.certifications.filter((_, idx) => idx !== i)
                          update('about.certifications', updated)
                        }}
                        style={{ background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.3)', color: '#ef4444', padding: '8px', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => update('about.certifications', [...content.about.certifications, ''])}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'rgba(255,255,255,0.05)', border: '1px dashed rgba(255,255,255,0.2)', color: '#9ca3af', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}
                  >
                    <Plus size={14} /> Sertifika Ekle
                  </button>
                </div>
              </Card>
            </div>
          )}

          {/* PAKETLER */}
          {section === 'packages' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {content.packages.map((pkg, pkgIdx) => {
                const borderColor = pkg.color === 'red' ? 'rgba(220,38,38,0.4)' : pkg.color === 'gold' ? 'rgba(234,179,8,0.4)' : 'rgba(255,255,255,0.1)'
                return (
                  <Card key={pkg.id} title={`${pkg.name} Paketi`}>
                    <div style={{ borderLeft: `3px solid ${borderColor}`, paddingLeft: '16px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                        <div>
                          <label style={lbl}>Paket Adı</label>
                          <input style={inp} value={pkg.name} onChange={(e) => {
                            const updated = [...content.packages]
                            updated[pkgIdx] = { ...pkg, name: e.target.value }
                            update('packages', updated)
                          }} />
                        </div>
                        <div>
                          <label style={lbl}>Süre</label>
                          <input style={inp} value={pkg.duration} onChange={(e) => {
                            const updated = [...content.packages]
                            updated[pkgIdx] = { ...pkg, duration: e.target.value }
                            update('packages', updated)
                          }} />
                        </div>
                        <div>
                          <label style={lbl}>Renk (gray / red / gold)</label>
                          <input style={inp} value={pkg.color} onChange={(e) => {
                            const updated = [...content.packages]
                            updated[pkgIdx] = { ...pkg, color: e.target.value }
                            update('packages', updated)
                          }} />
                        </div>
                        <div>
                          <label style={lbl}>Fiyat (₺)</label>
                          <input style={inp} value={pkg.price} onChange={(e) => {
                            const updated = [...content.packages]
                            updated[pkgIdx] = { ...pkg, price: e.target.value }
                            update('packages', updated)
                          }} />
                        </div>
                        <div>
                          <label style={lbl}>Fiyat (€)</label>
                          <input style={inp} value={pkg.priceEur} onChange={(e) => {
                            const updated = [...content.packages]
                            updated[pkgIdx] = { ...pkg, priceEur: e.target.value }
                            update('packages', updated)
                          }} />
                        </div>
                        <div>
                          <label style={lbl}>WhatsApp Mesajı</label>
                          <input style={inp} value={pkg.whatsapp_msg} onChange={(e) => {
                            const updated = [...content.packages]
                            updated[pkgIdx] = { ...pkg, whatsapp_msg: e.target.value }
                            update('packages', updated)
                          }} />
                        </div>
                      </div>
                      <div style={{ marginBottom: '16px' }}>
                        <label style={lbl}>Açıklama</label>
                        <input style={inp} value={pkg.description} onChange={(e) => {
                          const updated = [...content.packages]
                          updated[pkgIdx] = { ...pkg, description: e.target.value }
                          update('packages', updated)
                        }} />
                      </div>
                      <div style={{ marginBottom: '16px' }}>
                        <label style={lbl}>Alt Not (emoji + kısa açıklama)</label>
                        <input style={inp} value={pkg.tag} onChange={(e) => {
                          const updated = [...content.packages]
                          updated[pkgIdx] = { ...pkg, tag: e.target.value }
                          update('packages', updated)
                        }} />
                      </div>
                      <div>
                        <label style={lbl}>Özellikler</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {pkg.features.map((feat, featIdx) => (
                            <div key={featIdx} style={{ display: 'flex', gap: '8px' }}>
                              <input
                                style={{ ...inp, flex: 1 }}
                                value={feat}
                                onChange={(e) => {
                                  const updated = [...content.packages]
                                  const updatedFeats = [...pkg.features]
                                  updatedFeats[featIdx] = e.target.value
                                  updated[pkgIdx] = { ...pkg, features: updatedFeats }
                                  update('packages', updated)
                                }}
                              />
                              <button
                                onClick={() => {
                                  const updated = [...content.packages]
                                  updated[pkgIdx] = { ...pkg, features: pkg.features.filter((_, i) => i !== featIdx) }
                                  update('packages', updated)
                                }}
                                style={{ background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.3)', color: '#ef4444', padding: '8px', borderRadius: '4px', cursor: 'pointer' }}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() => {
                              const updated = [...content.packages]
                              updated[pkgIdx] = { ...pkg, features: [...pkg.features, ''] }
                              update('packages', updated)
                            }}
                            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'rgba(255,255,255,0.05)', border: '1px dashed rgba(255,255,255,0.2)', color: '#9ca3af', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}
                          >
                            <Plus size={14} /> Özellik Ekle
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}

          {/* IMAGES */}
          {section === 'images' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* Upload area */}
              <div
                onClick={() => fileRef.current?.click()}
                style={{
                  border: `2px dashed ${uploading ? '#dc2626' : 'rgba(255,255,255,0.15)'}`,
                  borderRadius: '12px',
                  padding: '40px 24px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: uploading ? 'rgba(220,38,38,0.05)' : 'rgba(255,255,255,0.02)',
                  transition: 'all 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#dc2626')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = uploading ? '#dc2626' : 'rgba(255,255,255,0.15)')}
              >
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(220,38,38,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4px' }}>
                  <Upload size={24} color={uploading ? '#dc2626' : '#9ca3af'} />
                </div>
                <p style={{ color: 'white', fontWeight: 700, fontSize: '15px', margin: 0 }}>
                  {uploading ? 'Yükleniyor...' : 'Dosya seç veya buraya sürükle'}
                </p>
                <p style={{ color: '#6b7280', fontSize: '13px', margin: 0 }}>JPG, PNG, WebP — max 10MB</p>
                {!uploading && (
                  <div style={{ marginTop: '8px', background: '#dc2626', color: 'white', padding: '8px 20px', borderRadius: '6px', fontSize: '13px', fontWeight: 700 }}>
                    Dosya Seç
                  </div>
                )}
              </div>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUpload} />

              {/* Gallery */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <h3 style={{ color: 'white', fontWeight: 700, fontSize: '15px', margin: 0 }}>
                    Mevcut Fotoğraflar
                  </h3>
                  <span style={{ background: 'rgba(220,38,38,0.15)', color: '#f87171', fontSize: '12px', fontWeight: 700, padding: '4px 10px', borderRadius: '20px' }}>
                    {images.length} dosya
                  </span>
                </div>

                {images.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '48px', color: '#4b5563', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    Henüz fotoğraf yüklenmedi.
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                    {images.map((img) => (
                      <ImageCard key={img} img={img} onCopy={copyPath} onDelete={handleDelete} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TRANSFORMATIONS */}
          {section === 'transformations' && (
            <div className="max-w-3xl space-y-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-400 text-sm">Öncesi/sonrası fotoğraf çiftleri ekle.</p>
                <button
                  onClick={() => setContent((c) => ({ ...c, transformations: [...c.transformations, { id: Date.now().toString(), package: '', before: '', after: '' }] }))}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-4 py-2 rounded transition-colors"
                >
                  <Plus size={16} /> Yeni Ekle
                </button>
              </div>

              {content.transformations.length === 0 && (
                <div className="border-2 border-dashed border-white/10 rounded py-16 text-center text-gray-500">
                  Henüz başarı hikayesi eklenmedi.
                </div>
              )}

              {content.transformations.map((item, i) => (
                <Card key={item.id} title={`#${i + 1}`} action={
                  <button onClick={() => setContent((c) => ({ ...c, transformations: c.transformations.filter((_, j) => j !== i) }))} className="text-red-500 hover:text-red-400 p-1">
                    <Trash2 size={16} />
                  </button>
                }>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label style={lbl}>Paket adı</label>
                      <input style={inp} placeholder="örn: Pro Paket – 12 Hafta" value={item.package} onChange={(e) => {
                        const t = [...content.transformations]; t[i] = { ...t[i], package: e.target.value }; update('transformations', t)
                      }} />
                    </div>
                    <div>
                      <label style={lbl}>Öncesi görsel</label>
                      <ImagePathInput value={item.before} onChange={(v) => {
                        const t = [...content.transformations]; t[i] = { ...t[i], before: v }; update('transformations', t)
                      }} images={images} />
                    </div>
                    <div>
                      <label style={lbl}>Sonrası görsel</label>
                      <ImagePathInput value={item.after} onChange={(v) => {
                        const t = [...content.transformations]; t[i] = { ...t[i], after: v }; update('transformations', t)
                      }} images={images} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* TESTIMONIALS */}
          {section === 'testimonials' && (
            <div className="max-w-3xl space-y-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-400 text-sm">Müşteri yorumlarını buradan yönet.</p>
                <button
                  onClick={() => setContent((c) => ({ ...c, testimonials: [...c.testimonials, { id: Date.now().toString(), name: '', rating: 5, text: '', avatar: '', package: '' }] }))}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-4 py-2 rounded transition-colors"
                >
                  <Plus size={16} /> Yeni Ekle
                </button>
              </div>

              {content.testimonials.length === 0 && (
                <div className="border-2 border-dashed border-white/10 rounded py-16 text-center text-gray-500">
                  Henüz yorum eklenmedi.
                </div>
              )}

              {content.testimonials.map((item, i) => (
                <Card key={item.id} title={item.name || `Yorum #${i + 1}`} action={
                  <button onClick={() => setContent((c) => ({ ...c, testimonials: c.testimonials.filter((_, j) => j !== i) }))} className="text-red-500 hover:text-red-400 p-1">
                    <Trash2 size={16} />
                  </button>
                }>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <label style={lbl}>Ad</label>
                      <input style={inp} value={item.name} onChange={(e) => {
                        const t = [...content.testimonials]; t[i] = { ...t[i], name: e.target.value }; update('testimonials', t)
                      }} />
                    </div>
                    <div>
                      <label style={lbl}>Puan (1-5)</label>
                      <input type="number" min={1} max={5} style={inp} value={item.rating} onChange={(e) => {
                        const t = [...content.testimonials]; t[i] = { ...t[i], rating: Number(e.target.value) }; update('testimonials', t)
                      }} />
                    </div>
                    <div>
                      <label style={lbl}>Paket</label>
                      <input style={inp} placeholder="Pro Paket" value={item.package} onChange={(e) => {
                        const t = [...content.testimonials]; t[i] = { ...t[i], package: e.target.value }; update('testimonials', t)
                      }} />
                    </div>
                    <div>
                      <label style={lbl}>Avatar</label>
                      <ImagePathInput value={item.avatar} onChange={(v) => {
                        const t = [...content.testimonials]; t[i] = { ...t[i], avatar: v }; update('testimonials', t)
                      }} images={images} />
                    </div>
                  </div>
                  <div>
                    <label style={lbl}>Yorum</label>
                    <textarea rows={3} style={{ ...inp, resize: 'none' }} value={item.text} onChange={(e) => {
                      const t = [...content.testimonials]; t[i] = { ...t[i], text: e.target.value }; update('testimonials', t)
                    }} />
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* SPONSOR */}
          {section === 'sponsor' && (
            <div className="max-w-2xl">
              <Card title="Sponsor">
                <label className="flex items-center gap-2 cursor-pointer mb-6">
                  <input type="checkbox" checked={!!content.sponsor} onChange={(e) => update('sponsor', e.target.checked ? { name: '', logo: '', url: '' } : null)} className="accent-red-600 w-4 h-4" />
                  <span className="text-white text-sm font-semibold">Sponsor bölümünü etkinleştir</span>
                </label>
                {content.sponsor && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label style={lbl}>Firma Adı</label>
                        <input style={inp} value={content.sponsor.name} onChange={(e) => update('sponsor.name', e.target.value)} />
                      </div>
                      <div>
                        <label style={lbl}>Website URL</label>
                        <input style={inp} value={content.sponsor.url} onChange={(e) => update('sponsor.url', e.target.value)} />
                      </div>
                    </div>
                    <div>
                      <label style={lbl}>Logo</label>
                      <ImagePathInput value={content.sponsor.logo} onChange={(v) => update('sponsor.logo', v)} images={images} />
                    </div>
                  </div>
                )}
              </Card>
            </div>
          )}

          {section === 'entegrasyon' && (
            <div className="max-w-2xl" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <Card title="Google Analytics 4">
                <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px', lineHeight: 1.6 }}>
                  Google Analytics hesabınızdan aldığınız <strong style={{ color: '#d1d5db' }}>Measurement ID</strong>&apos;yi girin.
                  Kaydettiğinizde site otomatik olarak ziyaretçi takibine başlar.
                </p>
                <label style={lbl}>Measurement ID</label>
                <input
                  style={{ ...inp, fontFamily: 'monospace', letterSpacing: '0.05em' }}
                  value={content.gaId || ''}
                  onChange={(e) => update('gaId', e.target.value)}
                  placeholder="G-XXXXXXXXXX"
                />
                {content.gaId && (
                  <div style={{ marginTop: '12px', padding: '10px 14px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '4px' }}>
                    <span style={{ color: '#4ade80', fontSize: '12px', fontWeight: 600 }}>✓ Aktif — {content.gaId}</span>
                  </div>
                )}
                {!content.gaId && (
                  <div style={{ marginTop: '12px', padding: '10px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px' }}>
                    <span style={{ color: '#6b7280', fontSize: '12px' }}>
                      Nasıl alınır? → analytics.google.com → Yönetici → Veri Akışları → Web → Measurement ID
                    </span>
                  </div>
                )}
              </Card>
            </div>
          )}

        </div>
        </div>
      </main>
    </div>
  )
}

/* --- Helper components --- */

function ImageCard({ img, onCopy, onDelete }: { img: string; onCopy: (p: string) => void; onDelete: (p: string) => void }) {
  const [hovered, setHovered] = useState(false)
  const [copied, setCopied] = useState(false)
  const name = img.split('/').pop() || ''

  const handleCopy = () => {
    onCopy(img)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div
      style={{ borderRadius: '8px', overflow: 'hidden', background: '#2a2a2a', border: '1px solid rgba(255,255,255,0.08)', position: 'relative', cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div style={{ position: 'relative', aspectRatio: '1', width: '100%' }}>
        <Image src={img} alt={name} fill style={{ objectFit: 'cover' }} sizes="200px" />
      </div>

      {/* Filename bar */}
      <div style={{ padding: '8px 10px', background: '#1e1e1e', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <p style={{ color: '#9ca3af', fontSize: '11px', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={name}>{name}</p>
      </div>

      {/* Hover overlay */}
      {hovered && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', backdropFilter: 'blur(2px)' }}>
          <button
            onClick={handleCopy}
            style={{ width: '100%', background: copied ? '#16a34a' : 'white', color: copied ? 'white' : '#111', border: 'none', borderRadius: '6px', padding: '8px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
          >
            {copied ? <><Check size={13} /> Kopyalandı!</> : 'Yolu Kopyala'}
          </button>
          <button
            onClick={() => onDelete(img)}
            style={{ width: '100%', background: '#dc2626', color: 'white', border: 'none', borderRadius: '6px', padding: '8px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
          >
            <Trash2 size={13} /> Sil
          </button>
        </div>
      )}
    </div>
  )
}

function Card({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div style={{ background: '#1e1e1e', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.3)' }}>
      <div style={{ padding: '14px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)' }}>
        <h3 style={{ color: 'white', fontWeight: 700, fontSize: '14px', margin: 0, letterSpacing: '0.02em' }}>{title}</h3>
        {action}
      </div>
      <div style={{ padding: '24px' }}>{children}</div>
    </div>
  )
}

function ImagePathInput({ label, value, onChange, images: initialImages }: {
  label?: string
  value: string
  onChange: (v: string) => void
  images: string[]
}) {
  const [open, setOpen] = useState(false)
  const [images, setImages] = useState(initialImages)
  const [uploading, setUploading] = useState(false)
  const uploadRef = useRef<HTMLInputElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [pickerPos, setPickerPos] = useState({ top: 0, left: 0 })
  const fieldStyle: React.CSSProperties = { flex: 1, background: '#2a2a2a', border: '1px solid rgba(255,255,255,0.12)', color: 'white', padding: '10px 14px', fontSize: '14px', borderRadius: '6px', outline: 'none', minWidth: 0 }

  // initialImages güncellenince senkronize et
  useEffect(() => { setImages(initialImages) }, [initialImages])

  const handleInlineUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    const data = await res.json()
    if (data.path) {
      const refreshed = await fetch('/api/admin/images')
      const refreshedData = await refreshed.json()
      const newImages = refreshedData.images || []
      setImages(newImages)
      onChange(data.path)
      setOpen(false)
    }
    setUploading(false)
    if (uploadRef.current) uploadRef.current.value = ''
  }

  return (
    <div style={{ position: 'relative' }}>
      {label && <span style={{ color: '#9ca3af', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>{label}</span>}
      <div style={{ display: 'flex', gap: '8px' }}>
        <input style={fieldStyle} value={value} onChange={(e) => onChange(e.target.value)} placeholder="/images/foto.jpg" />
        <button
          ref={triggerRef}
          type="button"
          onClick={() => {
            const rect = triggerRef.current?.getBoundingClientRect()
            if (rect) setPickerPos({ top: rect.bottom + 6, left: rect.left - 280 })
            setOpen((o) => !o)
          }}
          style={{ flexShrink: 0, background: open ? '#dc2626' : '#2a2a2a', border: '1px solid rgba(255,255,255,0.12)', color: open ? 'white' : '#9ca3af', padding: '0 12px', borderRadius: '6px', cursor: 'pointer', transition: 'all 0.15s' }}
          title="Galeriden seç"
        >
          <ImageIcon size={16} />
        </button>
      </div>

      {/* Preview */}
      {value && (
        <div style={{ marginTop: '8px', position: 'relative', width: '64px', height: '64px', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
          <Image src={value} alt="preview" fill style={{ objectFit: 'cover' }} sizes="64px" onError={() => {}} />
        </div>
      )}

      {/* Gallery picker — fixed, overflow sorununu bypass eder */}
      {open && (
        <div style={{ position: 'fixed', zIndex: 9999, top: pickerPos.top, left: Math.max(8, pickerPos.left), width: '320px', background: '#1e1e1e', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', boxShadow: '0 12px 40px rgba(0,0,0,0.6)', padding: '12px' }}>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: 'white', fontSize: '12px', fontWeight: 700 }}>Fotoğraf Seç</span>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', padding: '2px' }}>
              <X size={14} />
            </button>
          </div>

          {/* Bilgisayardan Yükle butonu */}
          <button
            type="button"
            onClick={() => uploadRef.current?.click()}
            disabled={uploading}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: uploading ? '#374151' : '#dc2626', color: 'white', border: 'none', borderRadius: '6px', padding: '9px', fontSize: '12px', fontWeight: 700, cursor: uploading ? 'not-allowed' : 'pointer', marginBottom: '10px', opacity: uploading ? 0.7 : 1, transition: 'background 0.15s' }}
          >
            <Upload size={14} />
            {uploading ? 'Yükleniyor...' : 'Bilgisayardan Yükle'}
          </button>
          <input ref={uploadRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleInlineUpload} />

          {/* Galeri grid */}
          {images.length === 0 ? (
            <p style={{ color: '#6b7280', fontSize: '12px', textAlign: 'center', padding: '16px 0' }}>Henüz fotoğraf yok</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', maxHeight: '200px', overflowY: 'auto' }}>
              {images.map((img) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => { onChange(img); setOpen(false) }}
                  style={{ position: 'relative', aspectRatio: '1', borderRadius: '4px', overflow: 'hidden', border: `2px solid ${value === img ? '#dc2626' : 'transparent'}`, cursor: 'pointer', padding: 0, background: 'none', transition: 'border-color 0.15s' }}
                  title={img.split('/').pop()}
                >
                  <Image src={img} alt={img} fill style={{ objectFit: 'cover' }} sizes="70px" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function getDeep(obj: unknown, path: string): unknown {
  return path.split('.').reduce((o: unknown, k) => (o as Record<string, unknown>)?.[k], obj)
}
