
import ProductCard from './ProductCard';

const ProductList = ({ products, clearFilters }) => {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-text mb-2">No encontramos productos con estos filtros.</h2>
        <p className="text-lg text-textMuted mb-6">Intenta ajustar tus preferencias de búsqueda.</p>
        {clearFilters && (
          <button 
            onClick={clearFilters}
            className="px-6 py-3 bg-primary text-white font-bold rounded-full hover:bg-primaryHover transition-colors focus:ring-4 focus:ring-primary/50 outline-none"
          >
            Limpiar filtros
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
