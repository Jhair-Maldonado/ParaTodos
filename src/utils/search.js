// Búsqueda tolerante: sin tildes, sin mayúsculas, por palabras y en todos los colores de la prenda.
export const normalize = (text = '') =>
  text.toString().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();

// "camisas" -> "camisa", "pantalones" -> "pantalon"
const stem = (word) => word.replace(/(es|s)$/, '');

const STOP_WORDS = new Set(['de', 'del', 'la', 'el', 'los', 'las', 'un', 'una', 'para', 'con', 'en', 'y', 'buscar', 'quiero', 'color', 'talla']);

export const matchesSearch = (product, query) => {
  const words = normalize(query).split(/\s+/).filter((w) => w && !STOP_WORDS.has(w)).map(stem);
  if (words.length === 0) return true;
  const haystack = normalize([
    product.name,
    product.category,
    product.colorText,
    ...(product.colors || []).map((c) => c.name),
  ].join(' '));
  return words.every((w) => haystack.includes(w));
};
