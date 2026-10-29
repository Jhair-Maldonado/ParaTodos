// Agrupa los nombres de color en familias para filtrar por NOMBRE y no solo por la muestra visual.
const FAMILIES = [
  { id: 'Negro', match: ['negro'], swatch: 'bg-gray-900' },
  { id: 'Blanco', match: ['blanco', 'crudo', 'marfil', 'crema'], swatch: 'bg-white' },
  { id: 'Gris', match: ['gris', 'plata'], swatch: 'bg-gray-400' },
  { id: 'Azul', match: ['azul', 'celeste', 'denim'], swatch: 'bg-blue-600' },
  { id: 'Rojo', match: ['rojo', 'burdeos', 'vino', 'granate'], swatch: 'bg-red-700' },
  { id: 'Verde', match: ['verde', 'oliva'], swatch: 'bg-green-700' },
  { id: 'Amarillo', match: ['amarillo', 'mostaza'], swatch: 'bg-yellow-400' },
  { id: 'Marrón y beige', match: ['marron', 'camel', 'caqui', 'beige', 'cafe', 'arena'], swatch: 'bg-orange-300' },
  { id: 'Rosado y morado', match: ['rosa', 'rosado', 'fucsia', 'morado', 'lila', 'violeta'], swatch: 'bg-pink-400' },
  { id: 'Naranja', match: ['naranja', 'coral'], swatch: 'bg-orange-500' },
];

const plain = (t) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export const familyOf = (colorName = '') => {
  const name = plain(colorName);
  return FAMILIES.find((f) => f.match.some((m) => name.includes(m)))?.id || 'Otros';
};

// Todas las familias de un nombre ("Blanco y Azul" pertenece a Blanco y a Azul)
export const familiesOf = (colorName = '') => {
  const name = plain(colorName);
  const found = FAMILIES.filter((f) => f.match.some((m) => name.includes(m))).map((f) => f.id);
  return found.length ? found : ['Otros'];
};

export const productFamilies = (product) =>
  [...new Set((product.colors || [{ name: product.colorText }]).flatMap((c) => familiesOf(c.name)))];

// Familias presentes en el catálogo, con cuántas prendas tienen cada una
export const familiesInCatalog = (products) =>
  FAMILIES.map((f) => ({ ...f, count: products.filter((p) => productFamilies(p).includes(f.id)).length }))
    .filter((f) => f.count > 0);
