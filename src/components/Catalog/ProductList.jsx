import ProductCard from './ProductCard';

const ProductList = ({ products, clearFilters }) => {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-text mb-2">No encontramos prendas con estos filtros.</h2>
        <p className="text-lg text-textMuted mb-6">Prueba con otra palabra o quita algunos filtros.</p>
        {clearFilters && (
          <button
            onClick={clearFilters}
            className="px-6 py-3 bg-primary text-onPrimary font-bold rounded-full hover:bg-primaryHover transition-colors"
          >
            Quitar búsqueda y filtros
          </button>
        )}
      </div>
    );
  }

  return (
    <section aria-labelledby="results-heading">
      <h2 id="results-heading" className="sr-only">Resultados</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <li key={product.id} className="flex">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProductList;
