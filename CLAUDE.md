# Cayit Yüksel — Online Coaching Website

## Proje Özeti
Cayit Yüksel (Level 1 Bodybuilding Coach) için TR/EN ikidilli online koçluk tanıtım sitesi.

## Stack
- Next.js 16 + TypeScript + Tailwind CSS
- Veri: `data/content.json` (dosya tabanlı, API route ile yazılır) ⚠️ KALICI DEĞİL — Vercel KV'ye taşınacak
- Deploy: Vercel — cayityuksel.com
- Fontlar: Bebas Neue (başlıklar h1-h6) + Inter (body) — next/font/google

## Sayfalar
```
/[locale]/                — Ana sayfa
/[locale]/hakkimda        — Hakkımda
/[locale]/paketler        — Paketler (ayrı sayfa, hero'lu)
/[locale]/basvuru         — 9 bölümlü başvuru formu (client component)
/[locale]/sss             — Sıkça Sorulan Sorular
/[locale]/iletisim        — İletişim sayfası
/admin                    — Admin panel (ADMIN_PASSWORD env var ile korumalı)
```

## Dizin Yapısı
```
app/[locale]/page.tsx        — Ana sayfa (tr/en)
components/sections/         — Tüm sayfa bölümleri
lib/content.ts               — SiteContent tipi + okuma/yazma
messages/tr.json / en.json   — Statik çeviriler
data/content.json            — Admin'den değiştirilebilen içerik
public/images/               — Yüklenen fotoğraflar
app/globals.css              — Global stiller + mobil media query'ler
```

## Tasarım
- Renkler: Siyah (#0a0a0a) + Kırmızı (#dc2626) + Beyaz
- Navbar: desktop'ta yatay linkler, mobil/tablette hamburger (overlay)
- btn-primary: clip-path köşe kesimli kırmızı buton
- btn-outline: clip-path köşe kesimli şeffaf buton (wrapper tekniği)
- Sayfa hero'ları: .page-hero / .page-hero-content class'ları (globals.css'te mobil kurallar)
- Admin panel: inline style (Tailwind cache sorunları nedeniyle)

## İletişim Bilgileri
- WhatsApp: +90 544 571 55 43
- E-posta: cayityuksel@hotmail.com
- Instagram: @cayit.yuksel

## Paketler
- Starter: 6 Hafta / 3.000₺ / €75
- Pro: 12 Hafta / 5.000₺ / €125 (en popüler)
- Elite: 16 Hafta / 7.000₺ / €175

## Deploy Durumu
- Vercel'e deploy edildi ✅
- Domain: cayityuksel.com
- Env var'lar: `ADMIN_PASSWORD` ve `ADMIN_TOKEN` (Vercel Dashboard → Settings → Environment Variables)

## Yapılacaklar (Öncelik Sırasına Göre)
1. ~~**SEO** — Her sayfa için ayrı metadata (title, description)~~ ✅
2. ~~**Open Graph** — Sosyal medya link önizleme görseli + başlık~~ ✅
3. ~~**`lang` attribute** — locale'e göre dinamik (`<html lang="tr/en">`)~~ ✅ (middleware → root layout)
4. ~~**Favicon** — Tarayıcı sekmesi ikonu~~ ✅ (app/icon.tsx — kırmızı zeminde CY)
5. ~~**sitemap.xml + robots.txt** — Google indexleme~~ ✅
6. ~~**KVKK / Çerez / Kullanım Koşulları** — Footer linkleri şu an `#`~~ ✅ (/kvkk + /gizlilik sayfaları + footer linkler)
7. ~~**Form validasyonu** — Başvuru formu boş gönderilebiliyor~~ ✅ (Ad Soyad + Hedef zorunlu)
8. ~~**WhatsApp floating butonu** — Her sayfada sağ altta sabit~~ ✅ (components/ui/WhatsAppFloat.tsx)
9. ~~**`CAYİT` tutarsızlığı** — Başvuru sayfası alt başlığında `Cayit` yazıyor (büyük İ yok)~~ ✅
10. ~~**OG image**~~ ✅ — `app/opengraph-image.tsx` (dinamik, 1200×630, foto05.jpg + metin overlay)

## ✅ Vercel KV + Blob Entegrasyonu TAMAMLANDI

- `lib/content.ts` → `getContent()` ve `saveContent()` async; KV öncelikli, lokal dosya fallback
- `app/api/admin/upload/route.ts` → Blob `put()` ile yükleme; lokal fallback
- `app/api/admin/images/route.ts` → Blob `list()` / `del()`; lokal fallback
- Tüm sayfa ve layout'larda `await getContent()` güncellendi
- Paket: `@vercel/kv` + `@vercel/blob` yüklü

**Deploy için yapılması gerekenler:**
1. Vercel Dashboard → Integrations → **Upstash Redis** ekle (KV_REST_API_URL, KV_REST_API_TOKEN otomatik gelir)
2. Vercel Dashboard → Storage → **Blob** oluştur (BLOB_READ_WRITE_TOKEN otomatik gelir)
3. Deploy et — env var'lar yokken lokal dosya/klasör sistemi devreye girer

**Google Analytics** — `components/Analytics.tsx` hazır, admin paneli Entegrasyon sekmesinden GA ID girilince aktif olur (KV'ye kalıcı kaydedilir)

## Tamamlananlar ✅
- Admin panel şifre koruması
- Footer (logo + telefon + copyright, 1280px max-width)
- Navbar hamburger menü (mobil/tablet overlay, desktop normal)
- Tüm sayfalar mobil uyumlu (Stats, About, Packages, Testimonials, Social, Hero)
- Sayfa hero'ları standartlaştırıldı (Hakkımda, Paketler, SSS, Başvuru, İletişim)
- İletişim sayfası (/iletisim) oluşturuldu
- AnnouncementBar tüm sayfalarda
- Başvuru + Paketler sayfaları mobil uyumlu
- Vercel deploy
- Google Analytics altyapısı (NEXT_PUBLIC_GA_ID env var ile aktif olur)
- Loading animasyonu (app/[locale]/loading.tsx — kırmızı CY logo + bar)
- WhatsApp floating butonu (tüm locale sayfalarında)
- CAYİT yazım tutarlılığı düzeltildi
- OG image dinamik (app/opengraph-image.tsx — foto05.jpg + overlay)

## Geliştirme
```bash
cd C:\projeler\cayit-yuksel
npm run dev   # localhost:3001
```
