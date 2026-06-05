export default function Loading() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#0a0a0a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        {/* CY logo */}
        <div style={{
          width: '48px',
          height: '48px',
          background: '#dc2626',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 900,
          color: 'white',
          fontSize: '16px',
          borderRadius: '2px',
          animation: 'cy-pulse 1.2s ease-in-out infinite',
        }}>
          CY
        </div>

        {/* Bar animasyonu */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: '4px',
                height: '20px',
                background: '#dc2626',
                borderRadius: '2px',
                animation: `cy-bar 0.9s ease-in-out ${i * 0.15}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes cy-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(0.92); }
        }
        @keyframes cy-bar {
          0%, 100% { transform: scaleY(0.4); opacity: 0.4; }
          50% { transform: scaleY(1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
