# Cayit Yüksel — Online Coaching Website

## Proje Özeti
Cayit Yüksel (Level 1 Bodybuilding Coach) için TR/EN ikidilli online koçluk tanıtım sitesi.

## Stack
- Next.js 16 + TypeScript + Tailwind CSS
- Veri: `data/content.json` (dosya tabanlı, API route ile yazılır)
- Deploy hedefi: guzelhosting.net cPanel → Node.js Selector

## Dizin Yapısı
```
app/[locale]/page.tsx        — Ana sayfa (tr/en)
app/[locale]/basvuru/        — 9 bölümlü başvuru formu (WhatsApp'a yönlendirir)
app/admin/                   — Admin panel (şifresiz, TODO: koruma ekle)
app/api/admin/content/       — content.json kaydetme API
app/api/admin/images/        — Galeri listeleme + silme API
app/api/admin/upload/        — Fotoğraf yükleme API
components/sections/         — Tüm sayfa bölümleri
lib/content.ts               — SiteContent tipi + okuma/yazma
messages/tr.json / en.json   — Statik çeviriler
data/content.json            — Admin'den değiştirilebilen içerik
public/images/               — Yüklenen fotoğraflar
```

## İletişim Bilgileri
- WhatsApp: +90 544 571 55 43
- E-posta: cayityuksel@hotmail.com
- Instagram: @cayit.yuksel

## Paketler
- Starter: 6 Hafta / 3.000₺ / €75
- Pro: 12 Hafta / 5.000₺ / €125 (en popüler)
- Elite: 16 Hafta / 7.000₺ / €175

## Tasarım
- Renkler: Siyah (#0a0a0a) + Kırmızı (#dc2626) + Beyaz
- Navbar: top 30px, scroll'da top 0'a yapışır
- Hover: harf harf kırmızıya dönen stagger animasyon
- Admin panel: inline style kullanılıyor (Tailwind cache sorunları nedeniyle)

## Admin Panel
- URL: /admin — ŞİFRE KORUMASI YOK (canlıya çıkmadan ekle!)
- Sidebar layout
- Bölümler: Genel (logo+slider, slogan+font/lineHeight slider, istatistik, duyuru, sosyal), Fotoğraflar (upload+galeri), Dönüşümler, Yorumlar, Sponsor

## Yapılacaklar (Öncelik Sırasına Göre)
1. **Footer tasarımı** ← SIRA BURASI
2. Mobil uyumluluk kontrol
3. SEO meta tagları
4. EN dil desteği kontrolü

## Tamamlananlar ✅
- Admin panel şifre koruması (middleware + login sayfası, ADMIN_PASSWORD env var)
- Hakkımda sayfası (/tr/hakkimda) — admin panelden düzenlenebilir
- Paketler sayfası (/tr/paketler) — admin panelden düzenlenebilir
- Testimonials: otomatik loop slider
- Social: Instagram fotoğraf grid
- ApplyCTA: animasyonlu buton
- www.cayityuksel.com SSL sorunu çözüldü

## Deploy Durumu
- Vercel'e deploy edildi ✅
- Domain: cayityuksel.com — Nameserver'lar güzelhosting'de ns1/ns2.vercel-dns.com olarak değiştirildi, DNS yayılması bekleniyor
- **Vercel'de eklenecek env var'lar:** `ADMIN_PASSWORD` ve `ADMIN_TOKEN` (Vercel Dashboard → Settings → Environment Variables)

## Geliştirme
```bash
cd C:\projeler\cayit-yuksel
npm run dev   # localhost:3001
```
