import { useEffect, useState } from 'react';
import { Eye, Moon, Sun, Type, Wind, RotateCcw, X, LayoutList, Volume2, Check } from 'lucide-react';
import useAccessibilityStore, { FONT_SCALES } from '../../store/accessibilityStore';
import useFocusTrap from '../../hooks/useFocusTrap';
import { canSpeak, speak } from '../../utils/speech';

const Toggle = ({ icon: Icon, label, hint, on, onClick }) => (
  <button
    onClick={onClick}
    role="switch"
    aria-checked={on}
    className={`w-full text-left min-h-[52px] px-4 py-3 rounded-xl border-2 transition-colors flex items-center justify-between gap-3 ${
      on ? 'bg-primary text-onPrimary border-primary' : 'bg-background text-text border-borderStrong hover:border-primary'
    }`}
  >
    <span className="flex flex-col">
      <span className="flex items-center gap-2 font-bold"><Icon className="w-5 h-5" aria-hidden="true" />{label}</span>
      {hint && <span className="text-sm opacity-90">{hint}</span>}
    </span>
    <span className="text-sm font-bold shrink-0">{on ? 'Sí' : 'No'}</span>
  </button>
);

const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const a11y = useAccessibilityStore();
  const { colorBlindMode, highContrast, fontScale, reducedMotion, simplifiedMode, voiceFeedback } = a11y;
  const panelRef = useFocusTrap(isOpen, () => setIsOpen(false));

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', highContrast);
    root.classList.toggle('reduced-motion', reducedMotion);
    root.style.fontSize = `${fontScale * 100}%`;
  }, [highContrast, fontScale, reducedMotion]);

  const colorModes = [
    { id: 'none', label: 'Sin ajuste' },
    { id: 'protanopia', label: 'Protanopia', hint: 'Dificultad con el rojo' },
    { id: 'deuteranopia', label: 'Deuteranopia', hint: 'Dificultad con el verde' },
    { id: 'tritanopia', label: 'Tritanopia', hint: 'Dificultad con azul y amarillo' },
  ];

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col items-start">
      {isOpen && (
        <div
          ref={panelRef}
          id="a11y-panel"
          role="dialog"
          aria-labelledby="a11y-title"
          className="mb-3 bg-surface text-text border-2 border-borderStrong rounded-2xl shadow-2xl w-[calc(100vw-2rem)] sm:w-96 max-h-[75vh] flex flex-col"
        >
          <div className="p-4 border-b border-border flex justify-between items-center">
            <h2 id="a11y-title" className="font-extrabold text-xl">Accesibilidad</h2>
            <button onClick={() => setIsOpen(false)} className="p-3 rounded-full hover:bg-surfaceHover" aria-label="Cerrar panel de accesibilidad">
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <div className="p-4 overflow-y-auto space-y-6">
            <section aria-labelledby="text-heading">
              <h3 id="text-heading" className="font-bold mb-3 flex items-center gap-2"><Type className="w-5 h-5" aria-hidden="true" /> Tamaño del texto</h3>
              <div className="grid grid-cols-4 gap-2" role="group" aria-labelledby="text-heading">
                {FONT_SCALES.map((scale) => (
                  <button
                    key={scale}
                    data-autofocus={fontScale === scale ? '' : undefined}
                    onClick={() => a11y.setFontScale(scale)}
                    aria-pressed={fontScale === scale}
                    className={`min-h-[52px] rounded-xl border-2 font-bold transition-colors ${
                      fontScale === scale ? 'bg-primary text-onPrimary border-primary' : 'bg-background border-borderStrong hover:border-primary'
                    }`}
                  >
                    {Math.round(scale * 100)}%
                  </button>
                ))}
              </div>
            </section>

            <section aria-labelledby="contrast-heading" className="space-y-2">
              <h3 id="contrast-heading" className="font-bold mb-3">Contraste y movimiento</h3>
              <Toggle icon={highContrast ? Sun : Moon} label="Alto contraste" hint="Fondo negro y texto blanco" on={highContrast} onClick={a11y.toggleHighContrast} />
              <Toggle icon={Wind} label="Reducir animaciones" on={reducedMotion} onClick={() => a11y.setReducedMotion(!reducedMotion)} />
            </section>

            <section aria-labelledby="vision-heading">
              <h3 id="vision-heading" className="font-bold mb-1 flex items-center gap-2"><Eye className="w-5 h-5" aria-hidden="true" /> Ajuste para daltonismo</h3>
              <p className="text-sm text-textMuted mb-3">Ajusta los colores de la página para distinguirlos mejor. El nombre escrito del color siempre es el real.</p>
              <div className="flex flex-col gap-2" role="group" aria-labelledby="vision-heading">
                {colorModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => a11y.setColorBlindMode(mode.id)}
                    aria-pressed={colorBlindMode === mode.id}
                    className={`text-left min-h-[48px] px-4 py-2 rounded-xl border-2 transition-colors flex items-center justify-between ${
                      colorBlindMode === mode.id ? 'bg-primary text-onPrimary border-primary' : 'bg-background border-borderStrong hover:border-primary'
                    }`}
                  >
                    <span><span className="font-bold">{mode.label}</span>{mode.hint && <span className="block text-sm opacity-90">{mode.hint}</span>}</span>
                    {colorBlindMode === mode.id && <Check className="w-5 h-5" aria-hidden="true" />}
                  </button>
                ))}
              </div>
            </section>

            <section aria-labelledby="interaction-heading" className="space-y-2">
              <h3 id="interaction-heading" className="font-bold mb-3">Ayudas de uso</h3>
              <Toggle icon={LayoutList} label="Navegación simplificada" hint="Oculta textos decorativos y enlaces secundarios" on={simplifiedMode} onClick={() => a11y.setSimplifiedMode(!simplifiedMode)} />
              {canSpeak() && (
                <Toggle
                  icon={Volume2}
                  label="Leer en voz alta"
                  hint="Resultados de búsqueda y confirmaciones"
                  on={voiceFeedback}
                  onClick={() => { const next = !voiceFeedback; a11y.setVoiceFeedback(next); if (next) speak('Lectura en voz alta activada.'); }}
                />
              )}
            </section>
          </div>

          <div className="p-4 border-t border-border">
            <button onClick={a11y.resetAccessibility} className="w-full min-h-[48px] flex items-center justify-center gap-2 rounded-xl bg-background border-2 border-borderStrong font-bold hover:border-primary">
              <RotateCcw className="w-4 h-4" aria-hidden="true" /> Restablecer
            </button>
          </div>
        </div>
      )}

      {/* El botón se mantiene siempre visible y con texto (antes solo un ícono de ojo que desaparecía al abrir) */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="bg-primary text-onPrimary min-h-[52px] pl-4 pr-5 rounded-full shadow-lg hover:bg-primaryHover flex items-center gap-2 font-bold"
        aria-expanded={isOpen}
        aria-controls="a11y-panel"
      >
        <Eye className="w-6 h-6" aria-hidden="true" />
        Accesibilidad
      </button>
    </div>
  );
};

export default AccessibilityWidget;
