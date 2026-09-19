import { useState, useEffect, useCallback } from 'react';

const useSpeechRecognition = () => {
  const [isSupported] = useState(() => !!(window.SpeechRecognition || window.webkitSpeechRecognition));
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);
  const [recognitionInstance, setRecognitionInstance] = useState(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'es-PE';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
      setTranscript('');
    };

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setTranscript(speechResult);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      // Map technical errors to user-friendly messages
      switch (event.error) {
        case 'network':
          setError('No pudimos conectar con el servicio de reconocimiento de voz. Puedes intentarlo nuevamente o continuar escribiendo.');
          break;
        case 'not-allowed':
          setError('No pudimos acceder al micrófono. Revisa los permisos del navegador o continúa escribiendo.');
          break;
        case 'service-not-allowed':
          setError('El reconocimiento de voz no está disponible en este navegador.');
          break;
        case 'no-speech':
          setError('No escuchamos ninguna búsqueda. Inténtalo nuevamente.');
          break;
        case 'audio-capture':
          setError('No encontramos un micrófono disponible.');
          break;
        case 'language-not-supported':
          setError('El reconocimiento de voz no está disponible para este idioma.');
          break;
        default:
          setError('No pudimos completar la búsqueda por voz. Puedes continuar escribiendo.');
      }
      
      if (import.meta.env.DEV) {
        console.warn('SpeechRecognition:', event.error);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRecognitionInstance(recognition);

    return () => {
      recognition.abort();
    };
  }, []);

  const startListening = useCallback(() => {
    if (!isSupported) {
      setError('La búsqueda por voz no está disponible en este navegador. Puedes continuar escribiendo.');
      return;
    }
    if (recognitionInstance && !isListening) {
      setTranscript('');
      setError(null);
      try {
        recognitionInstance.start();
      } catch (e) {
        if (import.meta.env.DEV) {
          console.warn('Error al iniciar reconocimiento:', e);
        }
        setError('Ocurrió un error al iniciar el micrófono. Puedes continuar escribiendo.');
        setIsListening(false);
      }
    }
  }, [recognitionInstance, isListening, isSupported]);

  const stopListening = useCallback(() => {
    if (recognitionInstance && isListening) {
      recognitionInstance.stop();
      setIsListening(false);
    }
  }, [recognitionInstance, isListening]);

  // Clears the transcript so it can be consumed
  const clearTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  return {
    isSupported,
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
    clearTranscript
  };
};

export default useSpeechRecognition;
