import { useEffect, useRef, useState } from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, RotateCcw, Minus, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../../store/cartStore';
import useAccessibilityStore from '../../store/accessibilityStore';

const CartDrawer = () => {
  const { 
    items, 
    isDrawerOpen, 
    closeDrawer, 
    removeItem, 
    updateQuantity, 
    getTotal,
    restoreItem 
  } = useCartStore();
  const { reducedMotion, fontScale } = useAccessibilityStore();
  const navigate = useNavigate();

  const [deletedItem, setDeletedItem] = useState(null);
  const [deletedIndex, setDeletedIndex] = useState(-1);
  const drawerRef = useRef(null);
  const closeBtnRef = useRef(null);
  const previousActiveElement = useRef(null);

  const totalUnidades = items.reduce((acc, item) => acc + item.quantity, 0);

  // Focus management and Escape key handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        closeDrawer();
      }
    };

    if (isDrawerOpen) {
      previousActiveElement.current = document.activeElement;
      document.addEventListener('keydown', handleKeyDown);
      // Ensure focus goes into the drawer for screen readers
      // Wait a tick for the drawer to render
      setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore focus when closing
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDrawerOpen, closeDrawer]);

  // Handle auto-dismiss of undo toast
  useEffect(() => {
    if (deletedItem) {
      const timer = setTimeout(() => {
        setDeletedItem(null);
        setDeletedIndex(-1);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [deletedItem]);

  const handleDelete = (item, index) => {
    setDeletedItem(item);
    setDeletedIndex(index);
    removeItem(item.cartItemId);
  };

  const handleUndo = () => {
    if (deletedItem) {
      restoreItem(deletedItem, deletedIndex);
      setDeletedItem(null);
      setDeletedIndex(-1);
    }
  };

  if (!isDrawerOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 ${!reducedMotion ? 'transition-opacity animate-fade-in' : ''}`}
        onClick={closeDrawer}
        aria-hidden="true"
      ></div>

      {/* Drawer Dialog */}
      <div 
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Tu carrito de compras"
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-surface border-l border-border shadow-2xl z-50 flex flex-col ${!reducedMotion ? 'animate-slide-up sm:animate-slide-left' : ''}`}
        style={{ fontSize: fontScale === 1.15 ? '1.05rem' : undefined }}
      >
        {/* Header */}
        <header className="flex items-center justify-between p-6 border-b border-border shrink-0 bg-surface">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-text">
            <ShoppingBag className="w-6 h-6 text-primary" aria-hidden="true" /> 
            Tu carrito
            <span className="sr-only">, {totalUnidades} productos en total</span>
          </h2>
          <button 
            ref={closeBtnRef}
            onClick={closeDrawer}
            className="p-2 bg-background border border-border rounded-full hover:bg-error hover:text-white hover:border-error transition-colors focus:outline-none focus:ring-4 focus:ring-primary/50"
            aria-label="Cerrar carrito"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </header>

        {/* Undo Toast */}
        {deletedItem && (
          <div 
            role="status" 
            aria-live="polite"
            className="bg-surfaceHover border-b border-border p-4 flex items-center justify-between shrink-0 shadow-sm"
          >
            <p className="text-sm font-medium text-text">
              {deletedItem.name} eliminado.
            </p>
            <button
              onClick={handleUndo}
              className="flex items-center gap-1 text-sm font-bold text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
              aria-label={`Deshacer eliminación de ${deletedItem.name}`}
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              Deshacer
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-background">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-xs mx-auto">
              <ShoppingBag className="w-20 h-20 mb-6 text-textMuted opacity-50" aria-hidden="true" />
              <h3 className="text-2xl font-bold text-text mb-2">Tu carrito está vacío</h3>
              <p className="text-textMuted mb-8">Aún no has agregado prendas. Descubre las últimas tendencias en nuestro catálogo.</p>
              <button 
                onClick={() => {
                  closeDrawer();
                  navigate('/catalog');
                }}
                className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primaryHover transition-all focus:outline-none focus:ring-4 focus:ring-primary/50"
              >
                Explorar catálogo
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item, index) => (
                <li key={item.cartItemId} className="flex gap-4 border border-border p-4 rounded-2xl bg-surface shadow-sm">
                  {/* Imagen Placeholder */}
                  <div className={`w-24 h-28 sm:w-28 sm:h-32 ${item.imageColor || 'bg-gray-200'} rounded-xl flex-shrink-0 flex items-center justify-center relative overflow-hidden`} aria-hidden="true">
                     <div className="absolute inset-0 bg-black/5 flex items-center justify-center text-xs text-text/50 font-bold uppercase tracking-widest -rotate-45 opacity-50">Visual</div>
                  </div>
                  
                  {/* Detalles */}
                  <div className="flex-1 flex flex-col min-w-0">
                    <h3 className="font-bold text-text truncate mb-1 text-lg">{item.name}</h3>
                    
                    <div className="text-sm font-medium text-textMuted mb-3 flex flex-wrap gap-x-2">
                      <span>{item.colorText}</span>
                      <span aria-hidden="true">&middot;</span>
                      <span>Talla {item.selectedSize || (item.sizes && item.sizes[0] && item.sizes[0].name) || 'Única'}</span>
                    </div>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                      {/* Controles de Cantidad */}
                      <div className="flex items-center gap-1 bg-background border border-border rounded-xl p-1">
                        <button 
                          onClick={() => item.quantity > 1 && updateQuantity(item.cartItemId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                            item.quantity <= 1 
                              ? 'text-textMuted/40 cursor-not-allowed' 
                              : 'text-text hover:bg-surfaceHover hover:text-primary'
                          }`}
                          aria-label={`Disminuir cantidad de ${item.name}`}
                        >
                          <Minus className="w-4 h-4" aria-hidden="true" />
                        </button>
                        <span className="font-bold w-6 text-center text-text" aria-label={`Cantidad actual: ${item.quantity}`}>
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-text hover:bg-surfaceHover hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                          aria-label={`Aumentar cantidad de ${item.name}`}
                        >
                          <Plus className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>

                      <span className="font-extrabold text-lg text-text whitespace-nowrap">
                        S/ {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    <div className="mt-3 flex justify-end">
                      <button 
                        onClick={() => handleDelete(item, index)}
                        className="flex items-center gap-1.5 text-sm font-bold text-error hover:text-red-700 transition-colors p-1 -mr-1 rounded focus:outline-none focus:ring-2 focus:ring-error"
                        aria-label={`Eliminar ${item.name} del carrito`}
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                        Eliminar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <footer className="p-4 sm:p-6 border-t border-border bg-surface shrink-0">
            <div className="flex justify-between items-end mb-6">
              <span className="font-medium text-textMuted text-lg">Subtotal</span>
              <div className="text-right">
                <span className="font-extrabold text-3xl text-text leading-none">
                  S/ {getTotal().toFixed(2)}
                </span>
                <p className="text-sm font-medium text-textMuted mt-1">Impuestos y envío calculados en el pago</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => {
                  closeDrawer();
                  navigate('/checkout');
                }}
                className="w-full flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primaryHover transition-all focus:outline-none focus:ring-4 focus:ring-primary/50 shadow-premium"
              >
                Continuar compra <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>
              
              <button
                onClick={closeDrawer}
                className="w-full py-3 rounded-xl font-bold text-textMuted hover:text-text bg-background border border-border hover:border-border/80 transition-colors focus:outline-none focus:ring-4 focus:ring-primary/50"
              >
                Seguir comprando
              </button>
            </div>
          </footer>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
