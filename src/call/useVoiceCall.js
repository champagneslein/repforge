import { useState, useCallback } from 'react';
import { useConversation } from '@elevenlabs/react';
import { buildPersonaPrompt, personaFirstMessage, selectVoice } from './voice';

// Request mic access once, ahead of the first call. After the user grants it,
// the browser remembers the decision for this origin and later calls connect
// without any permission popup.
export async function ensureMicPermission() {
  try {
    if (navigator.permissions?.query) {
      const st = await navigator.permissions.query({ name: 'microphone' });
      if (st.state === 'granted') return true;
      if (st.state === 'denied') return false;
    }
  } catch (e) { /* Safari doesn't support the query — fall through */ }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach(t => t.stop());
    return true;
  } catch (e) { return false; }
}

// Owns the ElevenLabs conversation lifecycle: who is on the line, connection
// status, speaking state, and the running transcript (window._callTranscript,
// kept there for compatibility with the post-call save path).
export function useVoiceCall({ agentId, getToken, onCallEnd }) {
  const [activeCallId, setActiveCallId] = useState(null);
  const [callStatus, setCallStatus] = useState('idle'); // idle | connecting | active

  const conversation = useConversation({
    onConnect: () => setCallStatus('active'),
    onDisconnect: () => {
      setActiveCallId(null); setCallStatus('idle');
      if (onCallEnd) onCallEnd(window._callTranscript || []);
    },
    onMessage: (msg) => {
      if (!window._callTranscript) window._callTranscript = [];
      if (msg.source === 'user') window._callTranscript.push({ role: 'user', text: msg.message });
      else if (msg.source === 'agent') window._callTranscript.push({ role: 'assistant', text: msg.message });
    },
    onError: (err) => { console.error('[RepForge] ElevenLabs error:', err); setActiveCallId(null); setCallStatus('idle'); },
  });

  const startCall = useCallback(async ({ emp, company, callLogs = [], productCtx = '', discoveryBlock = '' }) => {
    setActiveCallId(emp.id);
    setCallStatus('connecting');
    window._callTranscript = [];
    try {
      await ensureMicPermission();
      const token = getToken ? await getToken() : null;
      const sessionConfig = token
        ? { conversationToken: token, connectionType: 'webrtc' }
        : { agentId, connectionType: 'webrtc' };
      await conversation.startSession({
        ...sessionConfig,
        overrides: {
          agent: { prompt: { prompt: buildPersonaPrompt(emp, company, callLogs, productCtx, discoveryBlock) }, firstMessage: personaFirstMessage(emp) },
          tts: { voiceId: selectVoice(emp.first, emp.seniority) },
        },
      });
    } catch (e) {
      console.error('[RepForge] Call failed:', e);
      setActiveCallId(null); setCallStatus('idle');
    }
  }, [conversation, getToken, agentId]);

  const endCall = useCallback(() => {
    try { conversation.endSession(); } catch (e) {}
    setActiveCallId(null); setCallStatus('idle');
  }, [conversation]);

  return {
    activeCallId,
    callStatus,
    isSpeaking: callStatus === 'active' && conversation.isSpeaking,
    startCall,
    endCall,
  };
}
