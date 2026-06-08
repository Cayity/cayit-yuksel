import { ImageResponse } from 'next/og'

export const size = { width: 48, height: 48 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 48,
          height: 48,
          background: '#dc2626',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            color: 'white',
            fontSize: 18,
            fontWeight: 900,
            letterSpacing: '-0.5px',
            fontFamily: 'sans-serif',
          }}
        >
          CY
        </span>
      </div>
    ),
    { ...size }
  )
}
