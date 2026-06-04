'use client'

import { useState, useEffect, useRef } from 'react'
import { SiteContent } from '@/lib/content'
import {
  Save, Plus, Trash2, LayoutDashboard, Image as ImageIcon,
  Star, Users, Settings, ExternalLink, Upload, X, Check
} from 'lucide-react'
import Image from 'next/image'

interface Props {
  initialContent: SiteContent
}

type Section = 'general' | 'images' | 'transformations' | 'testimonials' | 'sponsor'

const NAV: { key: Section; label: string; icon: React.ReactNode }[] = [
  { key: 'general', label: 'Genel Ayarlar', icon: <Settings size={18} /> },
  { key: 'images', label: 'Fotoğraflar', icon: <ImageIcon size={18} /> },
  { key: 'transformations', label: 'Dönüşümler', icon: <Users size={18} /> },
  { key: 'testimonials', label: 'Yorumlar', icon: <Star size={18} /> },
  { key: 'sponsor', label: 'Sponsor', icon: <LayoutDashboard size={18} /> },
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
            </div>
          )}

          {/* IMAGES */}
          {section === 'images' && (
            <div className="max-w-4xl space-y-6">
              {/* Upload area */}
              <Card title="Fotoğraf Yükle">
                <div
                  className="border-2 border-dashed border-white/20 hover:border-red-600/50 transition-colors rounded p-8 text-center cursor-pointer"
                  onClick={() => fileRef.current?.click()}
                >
                  <Upload size={32} className="mx-auto mb-3 text-gray-500" />
                  <p className="text-white font-semibold">Dosya seç veya buraya sürükle</p>
                  <p className="text-gray-500 text-sm mt-1">JPG, PNG, WebP — max 10MB</p>
                  {uploading && <p className="text-red-400 text-sm mt-3 animate-pulse">Yükleniyor...</p>}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpload}
                />
              </Card>

              {/* Gallery */}
              <Card title={`Mevcut Fotoğraflar (${images.length})`}>
                {images.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Henüz fotoğraf yok.</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {images.map((img) => (
                      <div key={img} className="relative group rounded overflow-hidden bg-[#2a2a2a] aspect-square">
                        <Image src={img} alt={img} fill className="object-cover" sizes="200px" />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                          <button
                            onClick={() => copyPath(img)}
                            className="bg-white text-black text-xs font-bold px-3 py-1.5 rounded w-full hover:bg-gray-200 transition-colors"
                          >
                            Yolu Kopyala
                          </button>
                          <button
                            onClick={() => handleDelete(img)}
                            className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded w-full hover:bg-red-700 transition-colors flex items-center justify-center gap-1"
                          >
                            <Trash2 size={12} /> Sil
                          </button>
                        </div>
                        {/* Filename */}
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1 text-xs text-gray-300 truncate">
                          {img.split('/').pop()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
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

        </div>
        </div>
      </main>
    </div>
  )
}

/* --- Helper components --- */

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

function ImagePathInput({ label, value, onChange, images }: {
  label?: string
  value: string
  onChange: (v: string) => void
  images: string[]
}) {
  const [open, setOpen] = useState(false)
  const fieldStyle: React.CSSProperties = { flex: 1, background: '#2a2a2a', border: '1px solid rgba(255,255,255,0.12)', color: 'white', padding: '10px 14px', fontSize: '14px', borderRadius: '6px', outline: 'none', minWidth: 0 }

  return (
    <div style={{ position: 'relative' }}>
      {label && <span style={{ color: '#9ca3af', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>{label}</span>}
      <div style={{ display: 'flex', gap: '8px' }}>
        <input style={fieldStyle} value={value} onChange={(e) => onChange(e.target.value)} placeholder="/images/foto.jpg" />
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          style={{ flexShrink: 0, background: '#2a2a2a', border: '1px solid rgba(255,255,255,0.12)', color: '#9ca3af', padding: '0 12px', borderRadius: '6px', cursor: 'pointer' }}
          title="Galeriden seç"
        >
          <ImageIcon size={16} />
        </button>
      </div>

      {/* Preview */}
      {value && (
        <div className="mt-2 relative w-16 h-16 rounded overflow-hidden border border-white/10">
          <Image src={value} alt="preview" fill className="object-cover" sizes="64px" onError={() => {}} />
        </div>
      )}

      {/* Gallery picker */}
      {open && (
        <div className="absolute z-50 top-full left-0 mt-1 w-72 bg-[#1e1e1e] border border-white/20 rounded-lg shadow-2xl p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white text-xs font-bold">Galeriden Seç</span>
            <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-white"><X size={14} /></button>
          </div>
          {images.length === 0 ? (
            <p className="text-gray-500 text-xs text-center py-4">Fotoğraf yok</p>
          ) : (
            <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
              {images.map((img) => (
                <button
                  key={img}
                  onClick={() => { onChange(img); setOpen(false) }}
                  className={`relative aspect-square rounded overflow-hidden border-2 transition-colors ${value === img ? 'border-red-600' : 'border-transparent hover:border-white/30'}`}
                >
                  <Image src={img} alt={img} fill className="object-cover" sizes="80px" />
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
