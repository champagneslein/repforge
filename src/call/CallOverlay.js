import React, { useEffect, useState } from 'react';

function fmt(s) {
  return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
}

// One call experience for every outcome: dialing, live AI conversation,
// gatekeeper, voicemail, no answer. Minimal audio-call aesthetic.
export default function CallOverlay({ emp, company, phase, outcome, line, callStatus, isSpeaking, onEnd, onFollowUpEmail }) {
  const [seconds, setSeconds] = useState(0);
  const live = outcome === 'connected';

  useEffect(() => {
    if (callStatus !== 'active') return;
    setSeconds(0);
    const iv = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(iv);
  }, [callStatus]);

  if (!emp) return null;

  const pulsing = phase === 'dialing' || (live && callStatus === 'connecting');
  const statusText =
    phase === 'dialing' ? 'Calling…'
    : live ? (callStatus === 'active' ? fmt(seconds) : callStatus === 'connecting' ? 'Connecting…' : 'Call ended')
    : outcome === 'gatekeeper' ? 'Gatekeeper'
    : outcome === 'voicemail' ? 'Voicemail'
    : 'No answer';
  const statusColor = live && callStatus === 'active' ? '#16a34a' : outcome === 'no-answer' ? '#4A6B8A' : '#7A9CC4';

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#070C18', zIndex: 9995, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui' }}>
      <style>{`
        @keyframes callRing{0%{transform:scale(1);opacity:.7}100%{transform:scale(1.55);opacity:0}}
        @keyframes callFade{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
      `}</style>
      <div style={{ animation: 'callFade .35s ease', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 420, padding: '0 24px', width: '100%' }}>

        <div style={{ position: 'relative', width: 128, height: 128, marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {(pulsing || isSpeaking) && (<>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid rgba(99,102,241,0.5)', animation: 'callRing 1.4s ease-out infinite' }} />
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid rgba(99,102,241,0.3)', animation: 'callRing 1.4s ease-out .5s infinite' }} />
          </>)}
          <img
            src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${emp.id}`}
            alt=""
            onError={e => { e.target.style.display = 'none'; }}
            style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', background: 'linear-gradient(135deg,#1B3154,#0D1525)', border: '2px solid ' + (isSpeaking ? '#6366f1' : '#1B3154'), transition: 'border-color .3s', boxShadow: isSpeaking ? '0 0 32px rgba(99,102,241,0.45)' : '0 8px 32px rgba(0,0,0,0.5)' }}
          />
        </div>

        <div style={{ fontSize: 22, fontWeight: 800, color: '#F8FAFC', letterSpacing: '-0.02em' }}>{emp.first} {emp.last}</div>
        <div style={{ fontSize: 13, color: '#7A9CC4', marginTop: 3 }}>{emp.title}{company?.name ? ' · ' + company.name : ''}</div>
        <div style={{ fontSize: live && callStatus === 'active' ? 17 : 14, fontFamily: live && callStatus === 'active' ? 'ui-monospace,monospace' : 'inherit', fontWeight: 600, color: statusColor, marginTop: 14, minHeight: 22 }}>{statusText}</div>

        {!live && phase === 'outcome' && line && (
          <div style={{ marginTop: 18, padding: '12px 16px', background: '#0D1525', border: '1px solid #1B3154', borderRadius: 10, fontSize: 13, color: '#D4E5FF', fontStyle: 'italic', lineHeight: 1.5, textAlign: 'center' }}>
            “{line}”
          </div>
        )}
        {outcome === 'no-answer' && (
          <div style={{ marginTop: 14, fontSize: 12, color: '#4A6B8A' }}>Rang out. Try again later or follow up by email.</div>
        )}

        <div style={{ display: 'flex', gap: 18, marginTop: 34, alignItems: 'center' }}>
          <button onClick={onEnd} title="End call" style={{ width: 58, height: 58, borderRadius: '50%', border: 'none', background: '#dc2626', color: '#fff', fontSize: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 24px rgba(220,38,38,0.35)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 3h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 10.91" /><line x1="22" y1="2" x2="2" y2="22" /></svg>
          </button>
          {phase === 'outcome' && (outcome === 'voicemail' || outcome === 'gatekeeper') && onFollowUpEmail && (
            <button onClick={onFollowUpEmail} style={{ padding: '10px 18px', borderRadius: 10, border: '1px solid #1B3154', background: 'transparent', color: '#38BDF8', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Follow up by email</button>
          )}
        </div>
      </div>
    </div>
  );
}
