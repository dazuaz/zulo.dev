/** Code-native social artwork, rendered to PNG by the prerendered OG endpoint. */
export function SocialCard() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', width: '100%', height: '100%',
      background: '#151915', color: '#f5f6f3', padding: '48px 64px',
      fontFamily: 'Manrope', fontWeight: 500,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', fontFamily: 'Sora', fontWeight: 600, fontSize: 56, letterSpacing: '-3px' }}>
          zulo<span style={{ color: '#c7f36b' }}>.</span>
        </div>
        <div style={{ display: 'flex', color: '#c7f36b', fontSize: 22 }}>AI transformation partner</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 54, fontFamily: 'Sora', fontWeight: 600, fontSize: 70, letterSpacing: '-3px', lineHeight: 1.16 }}>
        <div>Better operations.</div>
        <div>Stronger teams.</div>
        <div style={{ color: '#c7f36b' }}>Powered by AI.</div>
      </div>
      <svg width="182" height="234" viewBox="0 0 182 234" style={{ position: 'absolute', right: 66, top: 196 }}>
        <path d="M30 30 H152 V117 H30 V204 H152" fill="none" stroke="#48543e" strokeWidth="2" />
        <rect x="14" y="14" width="32" height="32" rx="5" fill="#151915" stroke="#c7f36b" strokeWidth="2" />
        <rect x="14" y="101" width="32" height="32" rx="5" fill="#151915" stroke="#c7f36b" strokeWidth="2" />
        <rect x="136" y="188" width="32" height="32" rx="5" fill="#c7f36b" />
        <path d="m145 204 5 5 10-11" fill="none" stroke="#151915" strokeWidth="2.5" />
        <circle cx="152" cy="30" r="5" fill="#c7f36b" />
        <circle cx="152" cy="117" r="5" fill="#c7f36b" />
      </svg>
      <div style={{ display: 'flex', marginTop: 'auto', paddingTop: 24, borderTop: '1px solid #48543e', justifyContent: 'space-between', fontSize: 21, color: '#c8d0c3' }}>
        <div>Strategy. Systems. Implementation.</div>
        <div style={{ display: 'flex', gap: 22 }}><span>Daniel Zuloaga</span><span style={{ color: '#c7f36b' }}>zulo.dev</span></div>
      </div>
    </div>
  );
}
