import { Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Una sola acción por tarjeta: abrir el detalle para elegir color y talla.
// Antes había dos botones ("carrito" y "Comprar") que agregaban la prenda sin talla.
const ProductCard = ({ product, headingLevel = 3 }) => {
  const Heading = `h${headingLevel}`;
  const otherColors = (product.colors || []).filter((c) => c.name !== product.colorText).map((c) => c.name);
  const available = (product.sizes || []).filter((s) => s.available !== false).map((s) => s.name);
  const soldOut = (product.sizes || []).filter((s) => s.available === false).map((s) => s.name);

  return (
    <article className="group relative w-full bg-surface rounded-2xl shadow-premium overflow-hidden border border-border hover:border-primary focus-within:border-primary transition-colors flex flex-col">
      {/* Imagen de referencia (decorativa: la información de color está en texto) */}
      <div className={`relative h-56 ${product.imageColor}`} aria-hidden="true">
        <span className="absolute left-3 bottom-3 bg-surface text-text text-sm font-bold px-3 py-1.5 rounded-full shadow">
          {product.colorText}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <Heading className="text-xl font-bold text-text mb-2">
          <Link
            to={`/product/${product.id}`}
            className="after:absolute after:inset-0"
          >
            {product.name}
          </Link>
        </Heading>

        <dl className="text-sm text-textMuted space-y-1 mb-4">
          <div className="flex items-center gap-2">
            <dt className="sr-only">Color principal</dt>
            <span className={`w-4 h-4 rounded-full border border-borderStrong ${product.imageColor}`} aria-hidden="true"></span>
            <dd className="font-semibold text-text">{product.colorText}</dd>
          </div>
          {otherColors.length > 0 && (
            <div className="flex gap-1">
              <dt>También en:</dt>
              <dd>{otherColors.join(', ')}</dd>
            </div>
          )}
          {available.length > 0 && (
            <div className="flex gap-1">
              <dt>Tallas:</dt>
              <dd>{available.join(', ')}{soldOut.length > 0 && <> · <span className="line-through">{soldOut.join(', ')}</span> agotada{soldOut.length > 1 ? 's' : ''}</>}</dd>
            </div>
          )}
          {product.rating && (
            <div className="flex items-center gap-1">
              <dt className="sr-only">Calificación</dt>
              <Star className="w-4 h-4 fill-current text-text" aria-hidden="true" />
              <dd className="font-semibold text-text">{product.rating} <span className="sr-only">de 5 estrellas</span></dd>
            </div>
          )}
        </dl>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
          <p className="text-2xl font-extrabold text-text">
            <span className="sr-only">Precio: </span>S/ {product.price.toFixed(2)}
          </p>
          <span className="inline-flex items-center gap-1 text-primary font-bold group-hover:underline" aria-hidden="true">
            Elegir talla <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
