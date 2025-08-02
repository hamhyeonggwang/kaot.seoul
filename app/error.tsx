"use client"

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f9fafb' }}>
        <h2 style={{ color: '#dc2626', fontWeight: 'bold', fontSize: '2rem', marginBottom: '1rem' }}>문제가 발생했습니다.</h2>
        <pre style={{ color: '#6b7280', background: '#fff', padding: '1rem', borderRadius: '8px', maxWidth: '90vw', overflowX: 'auto' }}>{error.message}</pre>
        <button
          onClick={() => reset()}
          style={{ marginTop: '2rem', background: '#059669', color: '#fff', padding: '0.75rem 2rem', borderRadius: '8px', fontWeight: 'bold', fontSize: '1rem', border: 'none', cursor: 'pointer' }}
        >
          다시 시도
        </button>
      </body>
    </html>
  )
}