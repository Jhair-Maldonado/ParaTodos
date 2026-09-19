export const allProducts = [
  { 
    id: 1, 
    name: "Camisa Oxford Clásica", 
    category: "Camisas", 
    price: 49.99, 
    rating: 4.8, 
    imageColor: "bg-blue-300",
    colorText: "Azul cielo",
    description: "Camisa casual de algodón suave diseñada para uso diario. Combina elegancia y comodidad para cualquier ocasión.",
    features: [
      "Algodón ligero 100% transpirable",
      "Corte regular (Classic fit)",
      "Cuello abotonado",
      "Fácil planchado"
    ],
    colors: [
      { id: 'blue', name: 'Azul cielo', class: 'bg-blue-300' },
      { id: 'white', name: 'Blanco', class: 'bg-white border border-gray-300' },
      { id: 'black', name: 'Negro', class: 'bg-gray-900' }
    ],
    sizes: [
      { name: 'S', available: true },
      { name: 'M', available: true },
      { name: 'L', available: true },
      { name: 'XL', available: false } // Unavailable example
    ]
  },
  { 
    id: 2, 
    name: "Chaqueta de Invierno", 
    category: "Abrigos", 
    price: 89.99, 
    rating: 4.9, 
    imageColor: "bg-red-800",
    colorText: "Rojo burdeos",
    description: "Chaqueta acolchada resistente al viento y al agua. Ideal para temperaturas bajas.",
    features: [
      "Aislamiento térmico de alta densidad",
      "Bolsillos forrados con polar",
      "Capucha ajustable y desmontable"
    ],
    colors: [
      { id: 'burgundy', name: 'Rojo burdeos', class: 'bg-red-800' },
      { id: 'navy', name: 'Azul marino', class: 'bg-blue-900' }
    ],
    sizes: [
      { name: 'S', available: false },
      { name: 'M', available: true },
      { name: 'L', available: true },
      { name: 'XL', available: true }
    ]
  },
  { 
    id: 3, 
    name: "Pantalón Chino Slim", 
    category: "Pantalones", 
    price: 39.99, 
    rating: 4.5, 
    imageColor: "bg-green-800",
    colorText: "Verde oliva",
    description: "Pantalones chinos versátiles con un toque de elasticidad para mayor comodidad en movimiento.",
    features: [
      "Tejido stretch 4-way",
      "Corte ajustado (Slim fit)",
      "Bolsillos traseros con ribete"
    ],
    colors: [
      { id: 'olive', name: 'Verde oliva', class: 'bg-green-800' },
      { id: 'khaki', name: 'Caqui', class: 'bg-orange-200' },
      { id: 'black', name: 'Negro', class: 'bg-gray-900' }
    ],
    sizes: [
      { name: 'S', available: true },
      { name: 'M', available: true },
      { name: 'L', available: true },
      { name: 'XL', available: true }
    ]
  },
  { 
    id: 4, 
    name: "Camiseta Básica", 
    category: "Camisas", 
    price: 19.99, 
    rating: 4.2, 
    imageColor: "bg-yellow-500",
    colorText: "Amarillo mostaza",
    description: "Tu camiseta favorita para todos los días. Algodón premium pre-encogido.",
    features: [
      "Cuello redondo clásico",
      "Costuras reforzadas",
      "Etiqueta estampada (sin roces)"
    ],
    colors: [
      { id: 'mustard', name: 'Amarillo mostaza', class: 'bg-yellow-500' },
      { id: 'white', name: 'Blanco', class: 'bg-white border border-gray-300' }
    ],
    sizes: [
      { name: 'S', available: true },
      { name: 'M', available: true },
      { name: 'L', available: true },
      { name: 'XL', available: true }
    ]
  },
  { 
    id: 5, 
    name: "Gorra Deportiva", 
    category: "Accesorios", 
    price: 14.99, 
    rating: 3.8, 
    imageColor: "bg-gray-800",
    colorText: "Gris carbón",
    description: "Gorra transpirable y ligera para actividades al aire libre.",
    features: [
      "Paneles de malla transpirable",
      "Banda interior absorbente",
      "Cierre ajustable"
    ],
    colors: [
      { id: 'charcoal', name: 'Gris carbón', class: 'bg-gray-800' },
      { id: 'navy', name: 'Azul marino', class: 'bg-blue-900' }
    ],
    sizes: [
      { name: 'Única', available: true }
    ]
  },
  { 
    id: 6, 
    name: "Abrigo de Lana", 
    category: "Abrigos", 
    price: 120.00, 
    rating: 4.7, 
    imageColor: "bg-orange-300",
    colorText: "Marrón camel",
    description: "Abrigo elegante de lana con mezcla premium para mantenerte cálido con estilo.",
    features: [
      "Mezcla de lana 60%",
      "Cierre frontal de tres botones",
      "Forro interior suave"
    ],
    colors: [
      { id: 'camel', name: 'Marrón camel', class: 'bg-orange-300' },
      { id: 'black', name: 'Negro', class: 'bg-gray-900' }
    ],
    sizes: [
      { name: 'S', available: false },
      { name: 'M', available: false },
      { name: 'L', available: true },
      { name: 'XL', available: true }
    ]
  },
  { 
    id: 7, 
    name: "Jeans Rectos", 
    category: "Pantalones", 
    price: 59.99, 
    rating: 4.6, 
    imageColor: "bg-blue-600",
    colorText: "Azul denim",
    description: "El jean clásico de corte recto que nunca pasa de moda. Lavado medio vintage.",
    features: [
      "Denim pesado 100% algodón",
      "Diseño de 5 bolsillos",
      "Bragueta de botones"
    ],
    colors: [
      { id: 'denim', name: 'Azul denim', class: 'bg-blue-600' },
      { id: 'light-blue', name: 'Azul claro', class: 'bg-blue-400' }
    ],
    sizes: [
      { name: 'S', available: false },
      { name: 'M', available: true },
      { name: 'L', available: true },
      { name: 'XL', available: false }
    ]
  },
  { 
    id: 8, 
    name: "Bufanda Gruesa", 
    category: "Accesorios", 
    price: 24.99, 
    rating: 4.1, 
    imageColor: "bg-white border border-gray-300",
    colorText: "Blanco nieve",
    description: "Bufanda de punto grueso muy suave al tacto. Combina con todo.",
    features: [
      "Punto grueso texturizado",
      "Extremos con flecos",
      "Material sintético hipoalergénico"
    ],
    colors: [
      { id: 'white', name: 'Blanco nieve', class: 'bg-white border border-gray-300' },
      { id: 'red', name: 'Rojo festivo', class: 'bg-red-600' }
    ],
    sizes: [
      { name: 'Única', available: true }
    ]
  }
];

// Mapear los sizes de objetos a un array simple de strings para compatibilidad con el formato existente en filtros
export const getLegacyProducts = () => {
  return allProducts.map(p => ({
    ...p,
    sizes: p.sizes.map(s => s.name)
  }));
};
