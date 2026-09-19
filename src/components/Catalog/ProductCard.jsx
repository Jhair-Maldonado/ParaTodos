
import { ShoppingCart, Eye, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import useCartStore from '../../store/cartStore';

const ProductCard = ({ product }) => {
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <article className="group bg-surface rounded-2xl shadow-premium overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-1">
      {/* Product Image Area */}
      <div className={`relative h-64 ${product.imageColor} flex items-center justify-center p-6`}>
        {/* Placeholder for actual image */}
        <div className="w-full h-full bg-black/10 rounded-xl backdrop-blur-sm flex items-center justify-center border border-white/20 relative overflow-hidden">
          {/* Elemento visual decorativo para el color del producto */}
          <div aria-hidden="true" className="absolute inset-0 w-full h-full object-cover"></div>
          <span className="text-white/80 font-bold text-lg drop-shadow-md" aria-hidden="true">Imagen de Prenda</span>
        </div>
        
        {/* Hover Actions */}
        <div className="absolute inset-0 bg-background/40 opacity-0 focus-within:opacity-100 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-sm">
          <Link to={`/product/${product.id}`} className="p-3 bg-surface text-text rounded-full shadow-lg hover:bg-primary hover:text-white transition-colors focus:ring-4 focus:ring-primary/50 outline-none" aria-label={`Ver detalles de ${product.name}`}>
            <Eye className="w-5 h-5" aria-hidden="true" />
          </Link>
          <button 
            onClick={handleAddToCart}
            className="p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primaryHover transition-colors focus:ring-4 focus:ring-primary/50 outline-none" 
            aria-label={`Agregar ${product.name} al carrito`}
          >
            <ShoppingCart className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-text mb-1 truncate">{product.name}</h3>
        
        {/* Descriptor Textual de Color, Tallas y Calificación */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
          <div className="flex items-center gap-2">
            <span className={`w-4 h-4 rounded-full border border-border shadow-sm ${product.imageColor}`} aria-hidden="true"></span>
            <p className="text-textMuted font-medium text-sm">{product.colorText}</p>
          </div>
          
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex items-center gap-1 text-sm font-medium text-textMuted">
              <span className="sr-only">Tallas disponibles:</span>
              <span aria-hidden="true">Tallas: {product.sizes.join(', ')}</span>
            </div>
          )}

          {product.rating && (
            <div className="flex items-center gap-1 text-sm font-bold text-text" aria-label={`Calificación: ${product.rating} estrellas`}>
              <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" aria-hidden="true" />
              <span aria-hidden="true">{product.rating}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
          <span className="text-2xl font-extrabold text-text" aria-label={`Precio: S/ ${product.price.toFixed(2)}`}>S/ {product.price.toFixed(2)}</span>
          <button 
            onClick={handleAddToCart}
            className="text-primary font-bold hover:underline focus:ring-2 focus:ring-primary outline-none rounded px-1" 
            aria-label={`Comprar ${product.name} por S/ ${product.price.toFixed(2)}`}
          >
            Comprar
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
