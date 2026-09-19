
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/Catalog/ProductCard';
import useAccessibilityStore from '../store/accessibilityStore';
import { getLegacyProducts } from '../data/products';

const HomePage = () => {
  const { simplifiedMode } = useAccessibilityStore();
  
  // Usar los mocks reales para mostrar productos destacados
  const featuredProducts = getLegacyProducts().slice(0, 3);


  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-surface border-b border-border overflow-hidden">
        {!simplifiedMode && (
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-50" aria-hidden="true"></div>
        )}
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-2xl animate-slide-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-text mb-6">
              Moda clara, <span className="text-primary">sin confusiones</span>.
            </h1>
            {!simplifiedMode && (
              <p className="text-xl text-textMuted mb-8 leading-relaxed font-medium">
                Explora nuestro catálogo con descripciones de color precisas y filtros visuales adaptados a tus necesidades.
              </p>
            )}
            <div className={`flex gap-4 ${simplifiedMode ? 'mt-8' : ''}`}>
              <Link to="/catalog" className="bg-primary hover:bg-primaryHover text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-premium flex items-center gap-2 focus:outline-none focus:ring-4 focus:ring-primary/50">
                Ver Catálogo <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-text mb-2">Destacados</h2>
              {!simplifiedMode && (
                <p className="text-textMuted text-lg">Prendas de temporada verificadas.</p>
              )}
            </div>
            <Link to="/catalog" className="hidden md:flex items-center gap-2 text-primary font-bold hover:underline">
              Ver todo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
