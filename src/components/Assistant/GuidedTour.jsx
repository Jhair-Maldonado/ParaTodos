import { useState, useRef, useEffect } from 'react';
import { Bot, X, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import useAccessibilityStore from '../../store/accessibilityStore';

const GuidedTour = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { reducedMotion, fontScale } = useAccessibilityStore();
  
  const cardRef = useRef(null);
  const openButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

  const steps = [
    {
      title: "Bienvenido a Para Todos",
      content: "Te mostraremos cómo encontrar y comprar una prenda fácilmente en nuestra tienda."
    },
    {
      title: "Búsqueda",
      content: "Arriba encontrarás el menú principal. Puedes escribir lo que buscas o usar el botón del micrófono para hablar."
    },
    {
      title: "Accesibilidad",
      content: "Abajo a la izquierda hay un botón con forma de ojo. Puedes cambiar el tamaño del texto, colores y contraste desde ahí."
    },
    {
      title: "Catálogo",
      content: "Usa los botones de opciones (filtros) para encontrar prendas más rápido."
    },
    {
      title: "Prendas",
      content: "Selecciona el color y tu talla antes de agregar una prenda a tu carrito."
    },
    {
      title: "Carrito",
      content: "Arriba a la derecha está tu carrito. Aquí puedes revisar, modificar o eliminar tus productos antes de pagar."
    }
  ];

  const closeTour = () => {
    setIsOpen(false);
    setCurrentStep(0);
  };

  // Focus management and Escape key handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeTour();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      setTimeout(() => {
        nextButtonRef.current?.focus();
      }, 50);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      if (openButtonRef.current) {
        openButtonRef.current.focus();
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setTimeout(() => nextButtonRef.current?.focus(), 50);
    } else {
      closeTour();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setTimeout(() => nextButtonRef.current?.focus(), 50);
    }
  };



  if (!isOpen) {
    return (
      <button 
        ref={openButtonRef}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 bg-secondary text-white p-4 rounded-full shadow-lg transition-transform flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-secondary/50 ${!reducedMotion ? 'hover:scale-105 animate-bounce' : 'hover:bg-secondary/90'}`}
        aria-label="Abrir recorrido guiado"
      >
        <Bot className="w-7 h-7" aria-hidden="true" />
      </button>
    );
  }

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity" 
        onClick={closeTour}
        aria-hidden="true"
      ></div>

      <div 
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6 pointer-events-none"
        style={{ fontSize: fontScale === 1.15 ? '1.05rem' : undefined }}
      >
        <div 
          ref={cardRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Recorrido guiado: Paso ${currentStep + 1} de ${steps.length}`}
          className={`bg-surface border border-border shadow-2xl rounded-3xl p-6 w-full max-w-md relative pointer-events-auto flex flex-col ${!reducedMotion ? 'animate-slide-up' : ''}`}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-secondary/20 p-2.5 rounded-full" aria-hidden="true">
                <Bot className="w-7 h-7 text-secondary" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-text leading-tight">Guía rápida</h3>
                <p className="text-sm font-bold text-textMuted">Paso {currentStep + 1} de {steps.length}</p>
              </div>
            </div>
            <button 
              onClick={closeTour}
              className="text-textMuted hover:text-text hover:bg-surfaceHover p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Saltar recorrido"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>

          {/* Progress indicators visually */}
          <div className="flex gap-1.5 mb-6" aria-hidden="true">
            {steps.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-2.5 rounded-full transition-all ${idx === currentStep ? 'w-10 bg-primary' : idx < currentStep ? 'w-4 bg-primary/40' : 'w-4 bg-border'}`}
              />
            ))}
          </div>

          {/* Content */}
          <div className="mb-8 min-h-[120px]">
            <h4 className="font-extrabold text-2xl text-text mb-3">{steps[currentStep].title}</h4>
            <p className="text-lg text-textMuted leading-relaxed">{steps[currentStep].content}</p>
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-between mt-auto">
            <button 
              onClick={closeTour}
              className="text-textMuted font-bold hover:text-text transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
            >
              Saltar
            </button>
            
            <div className="flex gap-3">
              {currentStep > 0 && (
                <button 
                  onClick={handlePrev}
                  className="flex items-center justify-center p-3 sm:px-5 sm:py-3 rounded-xl bg-background border border-border hover:bg-surfaceHover text-text font-bold transition-colors focus:outline-none focus:ring-4 focus:ring-primary/50"
                  aria-label="Paso anterior"
                >
                  <ArrowLeft className="w-5 h-5 sm:mr-2" aria-hidden="true" />
                  <span className="hidden sm:inline">Anterior</span>
                </button>
              )}
              <button 
                ref={nextButtonRef}
                onClick={handleNext}
                className="flex items-center justify-center px-6 py-3 rounded-xl bg-primary hover:bg-primaryHover text-white font-bold transition-colors focus:outline-none focus:ring-4 focus:ring-primary/50 shadow-premium"
              >
                {currentStep === steps.length - 1 ? (
                  <>
                    Finalizar <Check className="w-5 h-5 ml-2" aria-hidden="true" />
                  </>
                ) : (
                  <>
                    Siguiente <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuidedTour;
