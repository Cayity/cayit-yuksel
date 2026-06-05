import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const runtime = 'nodejs'
export const alt = 'Cayit Yüksel | Online Bodybuilding Coach'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  const imgPath = join(process.cwd(), 'public', 'images', '1780594863371_foto05.jpg')
  const imgBuffer = readFileSync(imgPath)
  const imgBase64 = `data:image/jpeg;base64,${imgBuffer.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          background: '#0a0a0a',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Fotoğraf — sağ taraf */}
        <img
          src={imgBase64}
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            height: '100%',
            width: '55%',
            objectFit: 'cover',
            objectPosition: 'center top',
          }}
        />

        {/* Gradient overlay sol'dan sağa */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, #0a0a0a 40%, rgba(10,10,10,0.85) 60%, rgba(10,10,10,0.2) 100%)',
            display: 'flex',
          }}
        />

        {/* Sol içerik */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '60px 80px',
            width: '60%',
          }}
        >
          {/* Kırmızı accent çizgi */}
          <div style={{ width: 60, height: 4, background: '#dc2626', marginBottom: 32, display: 'flex' }} />

          {/* Tag */}
          <div
            style={{
              color: '#dc2626',
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: 20,
              display: 'flex',
            }}
          >
            /// ONLİNE BODYBUILDING KOÇLUĞU
          </div>

          {/* İsim */}
          <div
            style={{
              color: 'white',
              fontSize: 72,
              fontWeight: 900,
              lineHeight: 1,
              textTransform: 'uppercase',
              letterSpacing: '-2px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ display: 'flex' }}>CAYİT</span>
            <span style={{ color: '#dc2626', display: 'flex' }}>YÜKSEL</span>
          </div>

          {/* Alt bilgi */}
          <div
            style={{
              color: '#9ca3af',
              fontSize: 22,
              marginTop: 24,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <span style={{ display: 'flex' }}>Level 1 Bodybuilding Coach</span>
            <span style={{ color: '#6b7280', fontSize: 18, display: 'flex' }}>cayityuksel.com</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
