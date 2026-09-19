import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import AccessibleFilters from '../components/Search/AccessibleFilters';
import ProductList from '../components/Catalog/ProductList';
import { getLegacyProducts } from '../data/products';
import useAccessibilityStore from '../store/accessibilityStore';

const CatalogPage = () => {
  const { simplifiedMode } = useAccessibilityStore();
  const [searchParams] = useSearchParams();
  const searchParam = searchParams.get('search');
  const navigate = useNavigate();
  
  const [currentCategory, setCurrentCategory] = useState('Todos');
  const [currentSize, setCurrentSize] = useState('Todas');
  const [currentMaxPrice, setCurrentMaxPrice] = useState(1000); // 1000 = Cualquiera
  const [currentMinRating, setCurrentMinRating] = useState(0); // 0 = Cualquiera

  const clearFilters = () => {
    setCurrentCategory('Todos');
    setCurrentSize('Todas');
    setCurrentMaxPrice(1000);
    setCurrentMinRating(0);
    if (searchParam) {
      navigate('/catalog');
    }
  };

  // Catálogo completo mock
  const allProducts = getLegacyProducts();

  // Aplicar filtros
  const filteredProducts = allProducts.filter(product => {
    const matchCategory = currentCategory === 'Todos' || product.category === currentCategory;
    const matchSize = currentSize === 'Todas' || product.sizes.includes(currentSize) || product.sizes.includes('Todas');
    const matchPrice = product.price <= currentMaxPrice;
    const matchRating = product.rating >= currentMinRating;
    
    // Lógica de búsqueda por texto
    let matchSearch = true;
    if (searchParam) {
      const lowerSearch = searchParam.toLowerCase();
      matchSearch = product.name.toLowerCase().includes(lowerSearch) || 
                    product.category.toLowerCase().includes(lowerSearch) ||
                    product.colorText.toLowerCase().includes(lowerSearch);
    }
    
    return matchCategory && matchSize && matchPrice && matchRating && matchSearch;
  });

  return (
    <main className="container mx-auto px-4 py-8 animate-fade-in">
      <header className="mb-8">
        <h1 className={`text-4xl font-extrabold text-text ${simplifiedMode ? 'mb-1' : 'mb-4'}`}>Catálogo de Productos</h1>
        {!simplifiedMode && (
          <p className="text-lg text-textMuted max-w-3xl">
            Explora nuestra colección. Utiliza los filtros a continuación para encontrar rápidamente lo que necesitas. 
            Todas nuestras prendas cuentan con descripciones de color precisas para ayudarte en tu elección.
          </p>
        )}
      </header>

      <AccessibleFilters 
        currentCategory={currentCategory} 
        setCurrentCategory={setCurrentCategory}
        currentSize={currentSize}
        setCurrentSize={setCurrentSize}
        currentMaxPrice={currentMaxPrice}
        setCurrentMaxPrice={setCurrentMaxPrice}
        currentMinRating={currentMinRating}
        setCurrentMinRating={setCurrentMinRating}
      />

      <ProductList products={filteredProducts} clearFilters={clearFilters} />
    </main>
  );
};

export default CatalogPage;
