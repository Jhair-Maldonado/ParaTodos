import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { X } from 'lucide-react';
import AccessibleFilters from '../components/Search/AccessibleFilters';
import ProductList from '../components/Catalog/ProductList';
import { allProducts } from '../data/products';
import useAccessibilityStore from '../store/accessibilityStore';
import { matchesSearch } from '../utils/search';
import { familiesInCatalog, productFamilies } from '../utils/colors';
import { speak } from '../utils/speech';

const DEFAULTS = { color: 'Todos', category: 'Todas', size: 'Todas', price: 0, rating: 0 };

const CatalogPage = () => {
  const { simplifiedMode, voiceFeedback } = useAccessibilityStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const viaVoice = searchParams.get('voz') === '1';
  const [values, setValues] = useState(DEFAULTS);

  // Opciones derivadas de los datos: antes la lista de categorías estaba fija
  // y dejaba fuera Poleras, Vestidos, Casacas, Polos, Faldas, Shorts y Chompas.
  const filters = useMemo(() => {
    const categories = [...new Set(allProducts.map((p) => p.category))].sort();
    return [
      {
        id: 'color', label: 'Color', title: 'Elegir color', hint: 'Se muestran todas las prendas que vienen en ese color, aunque no sea su color principal.',
        options: [{ value: 'Todos', label: 'Todos los colores', short: 'Todos' },
          ...familiesInCatalog(allProducts).map((f) => ({ value: f.id, label: f.id, swatch: f.swatch, count: f.count }))],
      },
      { id: 'category', label: 'Tipo', title: 'Elegir tipo de prenda',
        options: [{ value: 'Todas', label: 'Todas' }, ...categories.map((c) => ({ value: c, label: c }))] },
      { id: 'size', label: 'Talla', title: 'Elegir talla', grid: true, hint: 'Solo verás prendas con esa talla disponible.',
        options: ['Todas', 'S', 'M', 'L', 'XL'].map((s) => ({ value: s, label: s })) },
      { id: 'price', label: 'Precio', title: 'Precio máximo',
        options: [{ value: 0, label: 'Cualquier precio', short: 'Todos' }, ...[25, 50, 100].map((v) => ({ value: v, label: `Hasta S/ ${v}` }))] },
      { id: 'rating', label: 'Calificación', title: 'Calificación mínima',
        options: [{ value: 0, label: 'Cualquiera', short: 'Todas' }, { value: 4, label: '4 estrellas o más', short: '4+' }, { value: 4.5, label: '4.5 estrellas o más', short: '4.5+' }] },
    ];
  }, []);

  const results = allProducts.filter((p) =>
    (values.color === 'Todos' || productFamilies(p).includes(values.color)) &&
    (values.category === 'Todas' || p.category === values.category) &&
    (values.size === 'Todas' || p.sizes.some((s) => s.name === values.size && s.available !== false)) &&
    (values.price === 0 || p.price <= values.price) &&
    p.rating >= values.rating &&
    matchesSearch(p, search)
  );

  const hasActive = !!search || Object.keys(DEFAULTS).some((k) => values[k] !== DEFAULTS[k]);
  const summary = `${results.length === 0 ? 'No encontramos prendas' : `${results.length} ${results.length === 1 ? 'prenda encontrada' : 'prendas encontradas'}`}${search ? ` para «${search}»` : ''}`;

  // Retroalimentación auditiva: si la búsqueda se hizo por voz (o el usuario lo activó), se lee el resultado
  useEffect(() => {
    if (!viaVoice && !voiceFeedback) return;
    const first = results.slice(0, 3).map((p) => `${p.name}, color ${p.colorText}, ${p.price.toFixed(2)} soles`).join('. ');
    speak(`${summary}. ${first}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, values, viaVoice]);

  const reset = () => { setValues(DEFAULTS); setSearchParams({}); };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-4xl font-extrabold text-text mb-2">Catálogo</h1>
        {!simplifiedMode && (
          <p className="text-lg text-textMuted max-w-3xl">
            Cada prenda indica su color por nombre. Usa los filtros para encontrar lo que necesitas.
          </p>
        )}
      </header>

      <AccessibleFilters
        filters={filters}
        values={values}
        onChange={(id, v) => setValues((prev) => ({ ...prev, [id]: v }))}
        onReset={reset}
        hasActive={hasActive}
      />

      {/* Estado del sistema: siempre se informa qué se buscó y cuántos resultados hay */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <p role="status" aria-live="polite" className="text-lg font-bold text-text">{summary}</p>
        {search && (
          <button
            onClick={() => setSearchParams({})}
            className="inline-flex items-center gap-1 min-h-[44px] px-4 rounded-full border-2 border-borderStrong font-bold hover:border-primary"
          >
            <X className="w-4 h-4" aria-hidden="true" /> Quitar búsqueda «{search}»
          </button>
        )}
      </div>

      <ProductList products={results} clearFilters={reset} />
    </div>
  );
};

export default CatalogPage;
