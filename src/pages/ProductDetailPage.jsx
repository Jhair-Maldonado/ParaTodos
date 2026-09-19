import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, ShoppingCart, AlertCircle } from 'lucide-react';
import { allProducts } from '../data/products';
import useCartStore from '../store/cartStore';
import useAccessibilityStore from '../store/accessibilityStore';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, openDrawer } = useCartStore();
  const { reducedMotion, fontScale } = useAccessibilityStore();

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
        // eslint-disable-next-line react-hooks/set-state-in-effect
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
    
    openDrawer(); // Show drawer
    setAddedSuccess(true); // Local feedback
  };

  return (
    <main className={`container mx-auto px-4 py-8 ${!reducedMotion ? 'animate-fade-in' : ''}`}>
      {/* Breadcrumb / Volver */}
      <nav className="mb-6" aria-label="Navegación secundaria">
        <Link 
          to="/catalog" 
          className="inline-flex items-center gap-2 text-textMuted hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-lg px-2 py-1 -ml-2 font-medium"
        >
          <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          Volver al catálogo
        </Link>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Columna Izquierda: Visual del Producto */}
        <section aria-label="Imágenes del producto">
          <div 
            className={`w-full aspect-[4/5] rounded-3xl ${selectedColor ? selectedColor.class : product.imageColor} flex items-center justify-center p-8 border border-border shadow-premium transition-colors duration-300 relative overflow-hidden`}
          >
            {/* Visual decorativo */}
            <div aria-hidden="true" className="absolute inset-0 w-full h-full bg-black/10 backdrop-blur-sm flex items-center justify-center">
              <span className="text-white/90 font-bold text-2xl drop-shadow-md tracking-wider">
                {product.name}
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
            <p className="text-3xl font-bold text-primary" aria-label={`Precio: S/ ${product.price.toFixed(2)}`}>
              S/ {product.price.toFixed(2)}
            </p>
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
                      className={`relative flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-4 focus:ring-primary/50 ${
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
                      aria-disabled={!isAvailable}
                      title={!isAvailable ? `La talla ${size.name} está agotada` : `Seleccionar talla ${size.name}`}
                      className={`min-w-[3.5rem] h-14 px-4 flex items-center justify-center rounded-xl border-2 font-bold text-lg transition-all focus:outline-none focus:ring-4 focus:ring-primary/50 ${
                        !isAvailable
                          ? 'border-border/50 bg-background text-textMuted/50 cursor-not-allowed opacity-60'
                          : isSelected
                            ? 'border-primary bg-primary text-white shadow-md'
                            : 'border-border bg-surface text-text hover:border-primary/50 hover:bg-surfaceHover'
                      }`}
                    >
                      {size.name}
                      <span className="sr-only">
                        {!isAvailable ? ' - Agotado' : isSelected ? ' - Seleccionado' : ''}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )}

          {/* Error Message */}
          {error && (
            <div className={`mb-6 p-4 rounded-xl bg-error/10 border-l-4 border-error flex items-start gap-3 ${!reducedMotion ? 'animate-fade-in' : ''}`} role="alert" aria-live="assertive">
              <AlertCircle className="w-6 h-6 text-error shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-error font-medium">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {addedSuccess && (
            <div className={`mb-6 p-4 rounded-xl bg-green-100 border-l-4 border-green-600 flex items-start gap-3 ${!reducedMotion ? 'animate-fade-in' : ''}`} role="status" aria-live="polite">
              <Check className="w-6 h-6 text-green-700 shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-green-800 font-medium font-bold">¡{product.name} añadido al carrito!</p>
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`w-full py-4 px-8 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-all focus:outline-none focus:ring-4 focus:ring-primary/50 mb-12 ${
              addedSuccess
                ? 'bg-green-600 text-white hover:bg-green-700 shadow-md'
                : 'bg-primary text-white hover:bg-primaryHover shadow-premium hover:shadow-lg hover:-translate-y-1'
            }`}
            style={{ 
              transform: reducedMotion ? 'none' : undefined,
              fontSize: fontScale === 1.15 ? '1.1rem' : undefined
            }}
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
    </main>
  );
};

export default ProductDetailPage;
