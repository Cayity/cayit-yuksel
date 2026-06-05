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
      padding: '6px 16px',
      fontWeight: 600,
      letterSpacing: '0.03em',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      fontSize: 'clamp(10px, 2.5vw, 13px)',
    }}>
      {text}
    </div>
  )
}
