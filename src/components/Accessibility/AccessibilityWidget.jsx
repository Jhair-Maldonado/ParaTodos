
import { useEffect, useState, useRef } from 'react';
import { Settings, Eye, Moon, Sun, Type, Wind, RotateCcw, X } from 'lucide-react';
import useAccessibilityStore from '../../store/accessibilityStore';

const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef(null);
  const { 
    colorBlindMode, 
    highContrast, 
    fontScale,
    reducedMotion,
    setColorBlindMode, 
    toggleHighContrast,
    setFontScale,
    setReducedMotion,
    simplifiedMode,
    setSimplifiedMode,
    resetAccessibility
  } = useAccessibilityStore();

  useEffect(() => {
    // Aplicar clase dark al HTML
    if (highContrast) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Aplicar escala de fuente global (Tailwind usa rem)
    document.documentElement.style.fontSize = `${fontScale * 100}%`;

    // Aplicar movimiento reducido
    if (reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  }, [highContrast, fontScale, reducedMotion]);
  
  // Cerrar panel con Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const colorModes = [
    { id: 'none', label: 'Vista normal' },
    { id: 'protanopia', label: 'Protanopia' },
    { id: 'deuteranopia', label: 'Deuteranopia' },
    { id: 'tritanopia', label: 'Tritanopia' },
  ];

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {isOpen && (
        <div 
          ref={widgetRef}
          role="dialog"
          aria-label="Panel de accesibilidad"
          className="mb-2 bg-surface text-text border border-border rounded-lg shadow-lg w-[calc(100vw-2rem)] sm:w-80 max-h-[85vh] flex flex-col"
        >
          <div className="p-4 border-b border-border flex justify-between items-center">
            <h3 className="font-bold flex items-center gap-2 text-lg">
              <Settings className="w-5 h-5" aria-hidden="true" /> Accesibilidad
            </h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-border transition-colors focus:ring-2 focus:ring-primary outline-none"
              aria-label="Cerrar panel de accesibilidad"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
          
          <div className="p-4 overflow-y-auto space-y-6">
            
            {/* VISIÓN */}
            <section aria-labelledby="vision-heading">
              <h4 id="vision-heading" className="text-sm font-bold text-textMuted uppercase mb-3">Visión</h4>
              <div className="flex flex-col gap-2">
                {colorModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setColorBlindMode(mode.id)}
                    aria-pressed={colorBlindMode === mode.id}
                    className={`text-left px-3 py-2 rounded border transition-colors focus:ring-2 focus:ring-primary outline-none flex items-center gap-2 ${
                      colorBlindMode === mode.id 
                        ? 'bg-primary text-white border-primary' 
                        : 'bg-background hover:bg-border border-border'
                    }`}
                  >
                    <Eye className="w-4 h-4" aria-hidden="true" />
                    {mode.label}
                  </button>
                ))}
              </div>
            </section>

            {/* CONTRASTE */}
            <section aria-labelledby="contrast-heading">
              <h4 id="contrast-heading" className="text-sm font-bold text-textMuted uppercase mb-3">Contraste</h4>
              <button
                onClick={toggleHighContrast}
                aria-pressed={highContrast}
                className={`w-full text-left px-3 py-2 rounded border transition-colors focus:ring-2 focus:ring-primary outline-none flex items-center justify-between ${
                  highContrast 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-background hover:bg-border border-border'
                }`}
              >
                <span className="flex items-center gap-2">
                  {highContrast ? <Sun className="w-4 h-4" aria-hidden="true" /> : <Moon className="w-4 h-4" aria-hidden="true" />}
                  Alto contraste
                </span>
                <span className="text-xs font-semibold">{highContrast ? 'Activado' : 'Desactivado'}</span>
              </button>
            </section>

            {/* TEXTO */}
            <section aria-labelledby="text-heading">
              <h4 id="text-heading" className="text-sm font-bold text-textMuted uppercase mb-3">Texto</h4>
              <div className="flex gap-2">
                <button
                  onClick={() => setFontScale(0.9)}
                  aria-pressed={fontScale === 0.9}
                  aria-label="Texto reducido"
                  className={`flex-1 flex justify-center items-center py-2 rounded border transition-colors focus:ring-2 focus:ring-primary outline-none ${
                    fontScale === 0.9 ? 'bg-primary text-white border-primary' : 'bg-background hover:bg-border border-border'
                  }`}
                >
                  <Type className="w-4 h-4" aria-hidden="true" />
                  <span aria-hidden="true" className="ml-1 text-sm font-medium">A-</span>
                </button>
                <button
                  onClick={() => setFontScale(1)}
                  aria-pressed={fontScale === 1}
                  aria-label="Texto normal"
                  className={`flex-1 flex justify-center items-center py-2 rounded border transition-colors focus:ring-2 focus:ring-primary outline-none ${
                    fontScale === 1 ? 'bg-primary text-white border-primary' : 'bg-background hover:bg-border border-border'
                  }`}
                >
                  <Type className="w-5 h-5" aria-hidden="true" />
                  <span aria-hidden="true" className="ml-1 font-medium">A</span>
                </button>
                <button
                  onClick={() => setFontScale(1.15)}
                  aria-pressed={fontScale === 1.15}
                  aria-label="Texto aumentado"
                  className={`flex-1 flex justify-center items-center py-2 rounded border transition-colors focus:ring-2 focus:ring-primary outline-none ${
                    fontScale === 1.15 ? 'bg-primary text-white border-primary' : 'bg-background hover:bg-border border-border'
                  }`}
                >
                  <Type className="w-6 h-6" aria-hidden="true" />
                  <span aria-hidden="true" className="ml-1 text-lg font-medium">A+</span>
                </button>
              </div>
            </section>

            {/* MOVIMIENTO */}
            <section aria-labelledby="motion-heading">
              <h4 id="motion-heading" className="text-sm font-bold text-textMuted uppercase mb-3">Movimiento</h4>
              <button
                onClick={() => setReducedMotion(!reducedMotion)}
                aria-pressed={reducedMotion}
                className={`w-full text-left px-3 py-2 rounded border transition-colors focus:ring-2 focus:ring-primary outline-none flex items-center justify-between ${
                  reducedMotion 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-background hover:bg-border border-border'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Wind className="w-4 h-4" aria-hidden="true" />
                  Reducir animaciones
                </span>
                <span className="text-xs font-semibold">{reducedMotion ? 'Activado' : 'Desactivado'}</span>
              </button>
            </section>
            
            {/* INTERACCIÓN */}
            <section aria-labelledby="interaction-heading">
              <h4 id="interaction-heading" className="text-sm font-bold text-textMuted uppercase mb-3">Interacción</h4>
              <button
                onClick={() => setSimplifiedMode(!simplifiedMode)}
                aria-pressed={simplifiedMode}
                className={`w-full text-left px-3 py-2 rounded border transition-colors focus:ring-2 focus:ring-primary outline-none flex flex-col gap-1 ${
                  simplifiedMode 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-background hover:bg-border border-border'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="flex items-center gap-2 font-medium">
                    <span className="relative flex h-4 w-4">
                      {simplifiedMode && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      )}
                      <span className={`relative inline-flex rounded-full h-4 w-4 border-2 ${simplifiedMode ? 'border-white bg-white/20' : 'border-current'}`}></span>
                    </span>
                    Navegación simplificada
                  </span>
                  <span className="text-xs font-semibold">{simplifiedMode ? 'Activada' : 'Desactivada'}</span>
                </div>
                <span className={`text-xs ${simplifiedMode ? 'text-white/80' : 'text-textMuted'}`}>
                  Reduce elementos secundarios para facilitar la navegación.
                </span>
              </button>
            </section>
            
          </div>
          
          {/* ACCIONES */}
          <div className="p-4 border-t border-border">
            <button
              onClick={resetAccessibility}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded bg-surface hover:bg-border text-text border border-border transition-colors focus:ring-2 focus:ring-primary outline-none"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              Restablecer configuración
            </button>
          </div>
        </div>
      )}
      
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-secondary transition-colors flex items-center justify-center focus:ring-4 focus:ring-primary/50 outline-none"
          aria-label="Abrir opciones de accesibilidad"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
        >
          <Eye className="w-6 h-6" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default AccessibilityWidget;
