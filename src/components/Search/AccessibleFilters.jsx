import { useState, useEffect } from 'react';
import { Filter, X, Tag, DollarSign, Star, Ruler, Check } from 'lucide-react';

const FilterButton = ({ id, icon: Icon, label, value, activeModal, setActiveModal }) => (
  <button
    onClick={() => setActiveModal(id)}
    className="flex items-center gap-2 bg-background border border-border px-5 py-3 rounded-full hover:border-primary hover:text-primary transition-colors whitespace-nowrap font-bold focus:ring-4 focus:ring-primary/30"
    aria-expanded={activeModal === id}
    aria-haspopup="dialog"
  >
    <Icon className="w-5 h-5 text-textMuted" aria-hidden="true" />
    <span className="text-textMuted font-medium">{label}:</span> 
    <span className="text-text">{value}</span>
  </button>
);

const AccessibleFilters = ({ 
  currentCategory, setCurrentCategory, 
  currentSize, setCurrentSize,
  currentMaxPrice, setCurrentMaxPrice,
  currentMinRating, setCurrentMinRating
}) => {
  const [activeModal, setActiveModal] = useState(null); // 'category' | 'size' | 'price' | 'rating' | null

  const categories = ['Todos', 'Camisas', 'Pantalones', 'Accesorios', 'Abrigos'];
  const sizes = ['Todas', 'S', 'M', 'L', 'XL'];
  const priceOptions = [
    { label: 'Cualquiera', value: 1000 },
    { label: 'Hasta S/ 25', value: 25 },
    { label: 'Hasta S/ 50', value: 50 },
    { label: 'Hasta S/ 100', value: 100 },
  ];
  const ratingOptions = [
    { label: 'Cualquiera', value: 0 },
    { label: '4 Estrellas o más', value: 4 },
    { label: '4.5 Estrellas o más', value: 4.5 },
  ];

  const closeModal = () => setActiveModal(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeModal) {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeModal]);

  return (
    <div className="mb-8">
      {/* Barra de herramientas de filtros */}
      <section aria-label="Filtros de catálogo" className="flex flex-wrap items-center gap-4 bg-surface p-4 rounded-2xl shadow-sm border border-border">
        <div className="flex items-center gap-2 text-text font-bold mr-2">
          <Filter className="w-6 h-6 text-primary" aria-hidden="true" /> Filtros:
        </div>
        
        <FilterButton 
          id="category" 
          icon={Tag} 
          label="Categoría" 
          value={currentCategory} 
          activeModal={activeModal}
          setActiveModal={setActiveModal}
        />
        <FilterButton 
          id="size" 
          icon={Ruler} 
          label="Talla" 
          value={currentSize} 
          activeModal={activeModal}
          setActiveModal={setActiveModal}
        />
        <FilterButton 
          id="price" 
          icon={DollarSign} 
          label="Precio" 
          value={currentMaxPrice === 1000 ? 'Todos' : `Hasta S/ ${currentMaxPrice}`} 
          activeModal={activeModal}
          setActiveModal={setActiveModal}
        />
        <FilterButton 
          id="rating" 
          icon={Star} 
          label="Calificación" 
          value={currentMinRating === 0 ? 'Todas' : `${currentMinRating}+`} 
          activeModal={activeModal}
          setActiveModal={setActiveModal}
        />
      </section>

      {/* MODAL GLOBAL */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Fondo oscuro para "perder visión" del fondo y enfocar en el filtro */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-md animate-fade-in"
            aria-hidden="true"
          ></div>
          
          {/* Contenedor del Modal */}
          <div 
            className="relative bg-surface w-full max-w-lg rounded-3xl shadow-2xl p-6 sm:p-8 animate-slide-up border border-border"
            role="dialog"
            aria-modal="true"
            aria-label="Opciones de filtro"
          >
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 bg-background rounded-full hover:bg-error hover:text-white transition-colors focus:ring-4 focus:ring-error/50"
              aria-label="Cerrar modal de filtros"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
            
            {/* Contenido Dinámico del Modal */}
            {activeModal === 'category' && (
              <>
                <h3 className="text-2xl font-extrabold mb-6 text-text flex items-center gap-3">
                  <Tag className="text-primary w-8 h-8" aria-hidden="true" /> Seleccionar Categoría
                </h3>
                <div className="flex flex-col gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { setCurrentCategory(cat); closeModal(); }}
                      aria-pressed={currentCategory === cat}
                      className={`px-6 py-4 rounded-xl font-bold text-xl text-left flex items-center justify-between transition-all focus:ring-4 focus:ring-primary/50 ${
                        currentCategory === cat 
                          ? 'bg-primary text-white shadow-lg' 
                          : 'bg-background border border-border text-text hover:border-primary'
                      }`}
                    >
                      {cat}
                      {currentCategory === cat && <Check className="w-6 h-6" aria-hidden="true" />}
                    </button>
                  ))}
                </div>
              </>
            )}

            {activeModal === 'size' && (
              <>
                <h3 className="text-2xl font-extrabold mb-6 text-text flex items-center gap-3">
                  <Ruler className="text-secondary w-8 h-8" aria-hidden="true" /> Seleccionar Talla
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => { setCurrentSize(size); closeModal(); }}
                      aria-pressed={currentSize === size}
                      className={`py-6 rounded-xl font-extrabold text-2xl flex items-center justify-center gap-2 transition-all focus:ring-4 focus:ring-secondary/50 ${
                        currentSize === size 
                          ? 'bg-secondary text-white shadow-lg' 
                          : 'bg-background border border-border text-text hover:border-secondary'
                      }`}
                    >
                      {currentSize === size && <Check className="w-6 h-6" aria-hidden="true" />}
                      {size}
                    </button>
                  ))}
                </div>
              </>
            )}

            {activeModal === 'price' && (
              <>
                <h3 className="text-2xl font-extrabold mb-6 text-text flex items-center gap-3">
                  <DollarSign className="text-green-600 w-8 h-8" aria-hidden="true" /> Rango de Precio
                </h3>
                <div className="flex flex-col gap-3">
                  {priceOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setCurrentMaxPrice(opt.value); closeModal(); }}
                      aria-pressed={currentMaxPrice === opt.value}
                      className={`px-6 py-4 rounded-xl font-bold text-xl text-left flex items-center justify-between transition-all focus:ring-4 focus:ring-green-600/50 ${
                        currentMaxPrice === opt.value 
                          ? 'bg-green-600 text-white shadow-lg' 
                          : 'bg-background border border-border text-text hover:border-green-600'
                      }`}
                    >
                      {opt.label}
                      {currentMaxPrice === opt.value && <Check className="w-6 h-6" aria-hidden="true" />}
                    </button>
                  ))}
                </div>
              </>
            )}

            {activeModal === 'rating' && (
              <>
                <h3 className="text-2xl font-extrabold mb-6 text-text flex items-center gap-3">
                  <Star className="text-yellow-500 w-8 h-8 fill-yellow-500" aria-hidden="true" /> Calificación Mínima
                </h3>
                <div className="flex flex-col gap-3">
                  {ratingOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setCurrentMinRating(opt.value); closeModal(); }}
                      aria-pressed={currentMinRating === opt.value}
                      className={`px-6 py-4 rounded-xl font-bold text-xl text-left flex items-center justify-between transition-all focus:ring-4 focus:ring-yellow-500/50 ${
                        currentMinRating === opt.value 
                          ? 'bg-yellow-500 text-white shadow-lg' 
                          : 'bg-background border border-border text-text hover:border-yellow-500'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {opt.value > 0 ? (
                          <>
                            <Star className={`w-6 h-6 ${currentMinRating === opt.value ? 'fill-white text-white' : 'fill-yellow-500 text-yellow-500'}`} aria-hidden="true" />
                            {opt.label}
                          </>
                        ) : (
                          opt.label
                        )}
                      </span>
                      {currentMinRating === opt.value && <Check className="w-6 h-6" aria-hidden="true" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibleFilters;
