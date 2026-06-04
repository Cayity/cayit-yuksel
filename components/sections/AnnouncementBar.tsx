'use client'

interface Props {
  text: string
  active: boolean
  locale: string
}

export default function AnnouncementBar({ text, active }: Props) {
  if (!active) return null

  return (
    <div style={{
      background: '#dc2626',
      color: 'white',
      textAlign: 'center',
      padding: '6px 24px',
      fontSize: '13px',
      fontWeight: 600,
      letterSpacing: '0.03em',
    }}>
      {text}
    </div>
  )
}
