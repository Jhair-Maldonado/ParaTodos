// Lectura en voz alta con la Web Speech API (speechSynthesis).
// Cierra el ciclo de la búsqueda por voz: quien habla para buscar también escucha el resultado.
export const canSpeak = () => typeof window !== 'undefined' && 'speechSynthesis' in window;

export const speak = (text) => {
  if (!canSpeak() || !text) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-PE';
  utterance.rate = 0.95;
  const voice = window.speechSynthesis.getVoices().find((v) => v.lang?.startsWith('es'));
  if (voice) utterance.voice = voice;
  window.speechSynthesis.speak(utterance);
};

export const stopSpeaking = () => {
  if (canSpeak()) window.speechSynthesis.cancel();
};
