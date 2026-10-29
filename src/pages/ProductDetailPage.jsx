import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, ShoppingCart, AlertCircle, Volume2 } from 'lucide-react';
import { allProducts } from '../data/products';
import useCartStore from '../store/cartStore';
import useAccessibilityStore from '../store/accessibilityStore';
import { speak, canSpeak } from '../utils/speech';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const { voiceFeedback } = useAccessibilityStore();

  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [error, setError] = useState('');
  const [addedSuccess, setAddedSuccess] = useState(false);

  useEffect(() => {
    const found = allProducts.find((p) => p.id === parseInt(id, 10));
    if (found) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProduct(found);
      // Pre-select first color as default to reduce friction
      if (found.colors && found.colors.length > 0) {
        setSelectedColor(found.colors[0]);
      }
    } else {
      // Product not found
      navigate('/catalog');
    }
  }, [id, navigate]);

  // Clear errors when user corrects them
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (selectedSize) setError('');
    if (addedSuccess) {
      const timer = setTimeout(() => setAddedSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [selectedSize, addedSuccess]);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('Selecciona una talla antes de agregar el producto al carrito.');
      return;
    }

    // Add to cart store
    addItem({
      ...product,
      // Overwrite the color/size for the cart item
      colorText: selectedColor.name,
      imageColor: selectedColor.class,
      selectedSize: selectedSize.name,
    });
    
    setAddedSuccess(true);
    if (voiceFeedback) speak(`Agregaste ${product.name}, color ${selectedColor.name}, talla ${selectedSize.name}, al carrito.`);
  };

  // Descripción hablada: nombre, precio, color elegido y tallas disponibles/agotadas
  const readAloud = () => {
    const available = product.sizes.filter((s) => s.available !== false).map((s) => s.name).join(', ');
    const soldOut = product.sizes.filter((s) => s.available === false).map((s) => s.name).join(', ');
    speak(`${product.name}. Precio ${product.price.toFixed(2)} soles. Color seleccionado: ${selectedColor?.name}. ` +
      `Otros colores: ${product.colors.filter((c) => c.id !== selectedColor?.id).map((c) => c.name).join(', ') || 'ninguno'}. ` +
      `Tallas disponibles: ${available}.${soldOut ? ` Agotada: ${soldOut}.` : ''} ${product.description || ''}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb / Volver */}
      <nav className="mb-6" aria-label="Navegación secundaria">
        <Link 
          to="/catalog" 
          className="inline-flex items-center gap-2 text-textMuted hover:text-primary transition-colors rounded-lg px-2 py-1 -ml-2 font-medium"
        >
          <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          Volver al catálogo
        </Link>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Columna Izquierda: Visual del Producto */}
        <section aria-label="Imagen de referencia del producto">
          <div 
            className={`w-full aspect-[4/5] rounded-3xl ${selectedColor ? selectedColor.class : product.imageColor} flex items-center justify-center p-8 border border-border shadow-premium transition-colors duration-300 relative overflow-hidden`}
          >
            {/* Visual decorativo */}
            <div aria-hidden="true" className="absolute inset-0 w-full h-full flex items-start justify-start p-6">
              <span className="bg-surface text-text font-bold text-xl px-4 py-2 rounded-full shadow">
                {selectedColor?.name}
              </span>
            </div>
          </div>
        </section>

        {/* Columna Derecha: Detalles e Interacción */}
        <section aria-label="Detalles del producto" className="flex flex-col">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-text mb-2 leading-tight">
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-primary">
              <span className="sr-only">Precio: </span>S/ {product.price.toFixed(2)}
            </p>
            {canSpeak() && (
              <button
                type="button"
                onClick={readAloud}
                className="mt-4 inline-flex items-center gap-2 min-h-[48px] px-5 rounded-xl border-2 border-borderStrong font-bold text-text hover:border-primary"
              >
                <Volume2 className="w-5 h-5" aria-hidden="true" /> Escuchar descripción
              </button>
            )}
          </div>

          {/* Selección de Color */}
          {product.colors && product.colors.length > 0 && (
            <fieldset className="mb-8 border-none p-0 m-0">
              <legend className="text-lg font-bold text-text mb-3">
                Color seleccionado: <span className="font-normal text-textMuted">{selectedColor?.name}</span>
              </legend>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => {
                  const isSelected = selectedColor?.id === color.id;
                  return (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      aria-pressed={isSelected}
                      className={`relative flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                        isSelected 
                          ? 'border-primary bg-primary/5 shadow-md' 
                          : 'border-border bg-surface hover:border-primary/50 hover:bg-surfaceHover'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-full border border-border shadow-inner ${color.class}`} aria-hidden="true"></span>
                      <span className={`font-medium ${isSelected ? 'text-primary' : 'text-text'}`}>
                        {color.name}
                      </span>
                      {/* Check mark for extra visibility beyond color/border */}
                      {isSelected && (
                        <Check className="w-5 h-5 text-primary ml-1" aria-hidden="true" />
                      )}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )}

          {/* Selección de Talla */}
          {product.sizes && product.sizes.length > 0 && (
            <fieldset className="mb-8 border-none p-0 m-0">
              <legend className="text-lg font-bold text-text mb-3 flex items-center gap-2">
                Talla:
                {selectedSize && (
                  <span className="font-normal text-textMuted">Seleccionaste {selectedSize.name}</span>
                )}
              </legend>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize?.name === size.name;
                  const isAvailable = size.available !== false;
                  
                  return (
                    <button
                      key={size.name}
                      type="button"
                      onClick={() => isAvailable && setSelectedSize(size)}
                      disabled={!isAvailable}
                      aria-pressed={isSelected}
                      className={`min-w-[4rem] min-h-[56px] px-4 flex flex-col items-center justify-center rounded-xl border-2 font-bold text-lg transition-colors ${
                        !isAvailable
                          ? 'border-dashed border-borderStrong bg-background text-textMuted cursor-not-allowed'
                          : isSelected
                            ? 'border-primary bg-primary text-onPrimary shadow-md'
                            : 'border-borderStrong bg-surface text-text hover:border-primary hover:bg-surfaceHover'
                      }`}
                    >
                      <span className={!isAvailable ? 'line-through' : ''}>{size.name}</span>
                      {!isAvailable && <span className="text-xs font-semibold leading-none">Agotada</span>}
                      {isSelected && <span className="sr-only"> (seleccionada)</span>}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-error/10 border-l-4 border-error flex items-start gap-3" role="alert" aria-live="assertive">
              <AlertCircle className="w-6 h-6 text-error shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-error font-medium">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {addedSuccess && (
            <div className="mb-6 p-4 rounded-xl bg-success/10 border-l-4 border-success flex items-start gap-3" role="status" aria-live="polite">
              <Check className="w-6 h-6 text-success shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-text font-bold">Agregaste {product.name} ({selectedColor?.name}, talla {selectedSize?.name}) al carrito.</p>
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`w-full py-4 px-8 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-all mb-12 ${
              addedSuccess
                ? 'bg-success text-onPrimary shadow-md'
                : 'bg-primary text-onPrimary hover:bg-primaryHover shadow-premium'
            }`}
          >
            <ShoppingCart className="w-6 h-6" aria-hidden="true" />
            {addedSuccess ? 'Agregar otro' : 'Agregar al carrito'}
          </button>

          {/* Información del Producto */}
          <div className="bg-surface border border-border rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-text mb-4 border-b border-border pb-4">
              Información del Producto
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-text mb-2">Descripción</h3>
                <p className="text-textMuted leading-relaxed">
                  {product.description || 'Una prenda diseñada pensando en tu comodidad y estilo, perfecta para el uso diario o para regalar.'}
                </p>
              </div>
              
              {product.features && product.features.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-text mb-3">Características principales</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-textMuted">
                        <Check className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetailPage;
