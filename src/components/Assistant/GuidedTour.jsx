import { useEffect, useState } from 'react';
import { HelpCircle, X, ArrowRight, ArrowLeft, Check, Volume2 } from 'lucide-react';
import useAccessibilityStore from '../../store/accessibilityStore';
import useFocusTrap from '../../hooks/useFocusTrap';
import { canSpeak, speak, stopSpeaking } from '../../utils/speech';

const STEPS = [
  { title: 'Bienvenido a ParaTodos', content: 'Te mostramos en 6 pasos cómo encontrar y comprar una prenda. Puedes salir cuando quieras con «Saltar» o la tecla Escape.' },
  { title: 'Buscar', content: 'Arriba está el buscador. Escribe, por ejemplo, «polo negro», o toca el micrófono y dilo en voz alta. Siempre verás qué entendimos y cuántas prendas encontramos.' },
  { title: 'Accesibilidad', content: 'Abajo a la izquierda está el botón «Accesibilidad». Ahí puedes agrandar el texto hasta 175 %, activar alto contraste, ajustar los colores para daltonismo o pedir que leamos en voz alta.' },
  { title: 'Filtrar por color', content: 'En el catálogo puedes filtrar por color usando su nombre (Negro, Azul, Rojo…). Cada prenda muestra su color escrito, no solo la imagen.' },
  { title: 'Elegir color y talla', content: 'Abre una prenda, elige color y talla. Las tallas agotadas aparecen tachadas con la palabra «Agotada». No podrás agregar al carrito sin elegir talla.' },
  { title: 'Carrito y pago', content: 'El carrito está arriba a la derecha. Puedes cambiar cantidades, eliminar o deshacer. El pago tiene 3 pasos: entrega, pago y revisión.' },
];
const SEEN_KEY = 'paratodos-guia-vista';

const GuidedTour = () => {
  const [isOpen, setIsOpen] = useState(() => {
    try { return !localStorage.getItem(SEEN_KEY); } catch { return false; }
  });
  const [step, setStep] = useState(0);
  const { reducedMotion, voiceFeedback } = useAccessibilityStore();

  const close = () => {
    setIsOpen(false);
    setStep(0);
    stopSpeaking();
    try { localStorage.setItem(SEEN_KEY, '1'); } catch { /* sin almacenamiento */ }
  };
  const cardRef = useFocusTrap(isOpen, close);

  useEffect(() => {
    if (isOpen && voiceFeedback) speak(`${STEPS[step].title}. ${STEPS[step].content}`);
  }, [isOpen, step, voiceFeedback]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 bg-secondary text-onPrimary min-h-[52px] pl-4 pr-5 rounded-full shadow-lg hover:opacity-90 flex items-center gap-2 font-bold"
      >
        <HelpCircle className="w-6 h-6" aria-hidden="true" />
        Guía
      </button>
    );
  }

  const last = step === STEPS.length - 1;
  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50" onClick={close} aria-hidden="true"></div>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 pointer-events-none">
        <div
          ref={cardRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="tour-title"
          aria-describedby="tour-content"
          className={`bg-surface border-2 border-borderStrong shadow-2xl rounded-3xl p-6 w-full max-w-lg pointer-events-auto flex flex-col ${!reducedMotion ? 'animate-slide-up' : ''}`}
        >
          <div className="flex justify-between items-center mb-4">
            <p className="font-bold text-textMuted">Guía rápida · Paso {step + 1} de {STEPS.length}</p>
            <button onClick={close} className="p-3 rounded-full hover:bg-surfaceHover" aria-label="Cerrar guía">
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>

          <div className="flex gap-1.5 mb-6" aria-hidden="true">
            {STEPS.map((_, i) => (
              <div key={i} className={`h-2.5 flex-1 rounded-full ${i <= step ? 'bg-primary' : 'bg-border'}`} />
            ))}
          </div>

          <h2 id="tour-title" className="font-extrabold text-2xl text-text mb-3">{STEPS[step].title}</h2>
          <p id="tour-content" className="text-lg text-text leading-relaxed mb-6">{STEPS[step].content}</p>

          {canSpeak() && (
            <button
              onClick={() => speak(`${STEPS[step].title}. ${STEPS[step].content}`)}
              className="self-start mb-6 inline-flex items-center gap-2 min-h-[48px] px-4 rounded-xl border-2 border-borderStrong font-bold hover:border-primary"
            >
              <Volume2 className="w-5 h-5" aria-hidden="true" /> Escuchar este paso
            </button>
          )}

          <div className="flex items-center justify-between gap-3 mt-auto">
            <button onClick={close} className="min-h-[48px] px-3 font-bold text-text underline underline-offset-4">Saltar</button>
            <div className="flex gap-3">
              {step > 0 && (
                <button onClick={() => setStep(step - 1)} className="min-h-[48px] flex items-center gap-2 px-5 rounded-xl bg-background border-2 border-borderStrong font-bold">
                  <ArrowLeft className="w-5 h-5" aria-hidden="true" /> Anterior
                </button>
              )}
              <button
                data-autofocus
                onClick={() => (last ? close() : setStep(step + 1))}
                className="min-h-[48px] flex items-center gap-2 px-6 rounded-xl bg-primary hover:bg-primaryHover text-onPrimary font-bold"
              >
                {last ? <>Terminar <Check className="w-5 h-5" aria-hidden="true" /></> : <>Siguiente <ArrowRight className="w-5 h-5" aria-hidden="true" /></>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuidedTour;
