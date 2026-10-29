import { useState } from 'react';
import { Filter, X, Tag, DollarSign, Star, Ruler, Check, Palette, RotateCcw } from 'lucide-react';
import useFocusTrap from '../../hooks/useFocusTrap';
import useAccessibilityStore from '../../store/accessibilityStore';

// Filtros configurados en un solo lugar (antes eran 4 bloques casi idénticos,
// cada uno con un color de selección distinto: índigo, celeste, verde y amarillo).
const AccessibleFilters = ({ filters, values, onChange, onReset, hasActive }) => {
  const [activeId, setActiveId] = useState(null);
  const { reducedMotion } = useAccessibilityStore();
  const active = filters.find((f) => f.id === activeId);
  const close = () => setActiveId(null);
  const dialogRef = useFocusTrap(!!active, close);

  const icons = { color: Palette, category: Tag, size: Ruler, price: DollarSign, rating: Star };

  return (
    <div className="mb-8">
      <section aria-label="Filtros del catálogo" className="flex flex-wrap items-center gap-3 bg-surface p-4 rounded-2xl shadow-sm border border-border">
        <p className="flex items-center gap-2 text-text font-bold mr-2">
          <Filter className="w-6 h-6 text-primary" aria-hidden="true" /> Filtrar por:
        </p>
        {filters.map((f) => {
          const Icon = icons[f.id];
          const current = f.options.find((o) => o.value === values[f.id]);
          const isSet = values[f.id] !== f.options[0].value;
          return (
            <button
              key={f.id}
              onClick={() => setActiveId(f.id)}
              aria-haspopup="dialog"
              aria-expanded={activeId === f.id}
              className={`flex flex-wrap items-center gap-x-2 max-w-full text-left min-h-[48px] px-5 py-2 rounded-3xl border-2 font-bold transition-colors ${
                isSet ? 'border-primary bg-primary/10 text-text' : 'border-borderStrong bg-background text-text hover:border-primary'
              }`}
            >
              <Icon className="w-5 h-5" aria-hidden="true" />
              <span className="font-medium">{f.label}:</span>
              <span>{current?.short || current?.label}</span>
            </button>
          );
        })}
        {hasActive && (
          <button
            onClick={onReset}
            className="flex items-center gap-2 min-h-[48px] px-4 rounded-full font-bold text-primary underline-offset-4 hover:underline"
          >
            <RotateCcw className="w-5 h-5" aria-hidden="true" /> Quitar todo
          </button>
        )}
      </section>

      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" aria-hidden="true" onClick={close}></div>
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="filter-title"
            className={`relative bg-surface w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl p-6 sm:p-8 border border-borderStrong ${!reducedMotion ? 'animate-slide-up' : ''}`}
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <h3 id="filter-title" className="text-2xl font-extrabold text-text">{active.title}</h3>
              <button
                onClick={close}
                className="p-3 bg-background border border-borderStrong rounded-full hover:bg-surfaceHover"
                aria-label="Cerrar sin cambiar"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>
            {active.hint && <p className="text-textMuted mb-4">{active.hint}</p>}
            <div className={active.grid ? 'grid grid-cols-2 gap-3' : 'flex flex-col gap-3'}>
              {active.options.map((opt) => {
                const selected = values[active.id] === opt.value;
                return (
                  <button
                    key={String(opt.value)}
                    data-autofocus={selected ? '' : undefined}
                    onClick={() => { onChange(active.id, opt.value); close(); }}
                    aria-pressed={selected}
                    className={`min-h-[56px] px-5 py-3 rounded-xl font-bold text-lg text-left flex items-center justify-between gap-3 border-2 transition-colors ${
                      selected ? 'bg-primary text-onPrimary border-primary' : 'bg-background border-borderStrong text-text hover:border-primary'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      {opt.swatch && <span className={`w-6 h-6 rounded-full border-2 border-borderStrong ${opt.swatch}`} aria-hidden="true"></span>}
                      {opt.label}
                      {opt.count !== undefined && <span className="font-medium text-base opacity-80">({opt.count})</span>}
                    </span>
                    {selected && <Check className="w-6 h-6 shrink-0" aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibleFilters;
