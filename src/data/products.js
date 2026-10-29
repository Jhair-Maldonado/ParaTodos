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
,
  
  {
    id: 9,
    name: "Polera Gris con Capucha",
    category: "Poleras",
    price: 45,
    rating: 4.8,
    imageColor: "bg-gray-400",
    colorText: "Gris claro",
    description: "Polera cómoda y abrigadora para días casuales.",
    features: [
      "Bolsillo canguro",
      "Capucha ajustable"
    ],
    colors: [
      {
        id: "light-gray",
        name: "Gris claro",
        class: "bg-gray-400"
      },
      {
        id: "black",
        name: "Negro",
        class: "bg-gray-900"
      }
    ],
    sizes: [
      {
        name: "S",
        available: true
      },
      {
        name: "M",
        available: true
      },
      {
        name: "L",
        available: true
      }
    ]
  },
  {
    id: 10,
    name: "Vestido Casual Verde Oliva",
    category: "Vestidos",
    price: 65,
    rating: 4.6,
    imageColor: "bg-green-700",
    colorText: "Verde oliva",
    description: "Vestido ligero ideal para el verano o primavera.",
    features: [
      "Tela transpirable",
      "Corte ajustado",
      "Sin mangas"
    ],
    colors: [
      {
        id: "olive",
        name: "Verde oliva",
        class: "bg-green-700"
      }
    ],
    sizes: [
      {
        name: "S",
        available: true
      },
      {
        name: "M",
        available: true
      },
      {
        name: "L",
        available: false
      }
    ]
  },
  {
    id: 11,
    name: "Casaca Ligera Negra",
    category: "Casacas",
    price: 55,
    rating: 4.3,
    imageColor: "bg-gray-900",
    colorText: "Negro",
    description: "Casaca rompevientos perfecta para el clima de transición.",
    features: [
      "Resistente al agua",
      "Bolsillos con cierre"
    ],
    colors: [
      {
        id: "black",
        name: "Negro",
        class: "bg-gray-900"
      },
      {
        id: "navy",
        name: "Azul marino",
        class: "bg-blue-900"
      }
    ],
    sizes: [
      {
        name: "S",
        available: true
      },
      {
        name: "M",
        available: true
      },
      {
        name: "L",
        available: true
      },
      {
        name: "XL",
        available: true
      }
    ]
  },
  {
    id: 12,
    name: "Polo Básico Blanco",
    category: "Polos",
    price: 15,
    rating: 4.9,
    imageColor: "bg-white border border-gray-300",
    colorText: "Blanco",
    description: "El clásico polo que combina con todo.",
    features: [
      "100% Algodón",
      "Cuello V"
    ],
    colors: [
      {
        id: "white",
        name: "Blanco",
        class: "bg-white border border-gray-300"
      },
      {
        id: "black",
        name: "Negro",
        class: "bg-gray-900"
      }
    ],
    sizes: [
      {
        name: "S",
        available: true
      },
      {
        name: "M",
        available: true
      },
      {
        name: "L",
        available: true
      },
      {
        name: "XL",
        available: true
      }
    ]
  },
  {
    id: 13,
    name: "Falda Plisada Azul Marino",
    category: "Faldas",
    price: 35,
    rating: 4.4,
    imageColor: "bg-blue-900",
    colorText: "Azul marino",
    description: "Falda plisada de cintura alta, elegante y cómoda.",
    features: [
      "Cierre lateral invisible",
      "Forro interior"
    ],
    colors: [
      {
        id: "navy",
        name: "Azul marino",
        class: "bg-blue-900"
      },
      {
        id: "burgundy",
        name: "Rojo burdeos",
        class: "bg-red-800"
      }
    ],
    sizes: [
      {
        name: "S",
        available: true
      },
      {
        name: "M",
        available: false
      },
      {
        name: "L",
        available: true
      }
    ]
  },
  {
    id: 14,
    name: "Shorts de Denim",
    category: "Shorts",
    price: 29.99,
    rating: 4.5,
    imageColor: "bg-blue-400",
    colorText: "Celeste",
    description: "Shorts clásicos de mezclilla para un look fresco.",
    features: [
      "Bordes deshilachados",
      "5 bolsillos"
    ],
    colors: [
      {
        id: "light-blue",
        name: "Celeste",
        class: "bg-blue-400"
      }
    ],
    sizes: [
      {
        name: "S",
        available: true
      },
      {
        name: "M",
        available: true
      },
      {
        name: "L",
        available: true
      }
    ]
  },
  {
    id: 15,
    name: "Chompa de Lana Cuello Alto",
    category: "Chompas",
    price: 75,
    rating: 4.7,
    imageColor: "bg-orange-200",
    colorText: "Beige",
    description: "Chompa gruesa y muy cálida para invierno.",
    features: [
      "Cuello tortuga",
      "Punto trenzado"
    ],
    colors: [
      {
        id: "beige",
        name: "Beige",
        class: "bg-orange-200"
      },
      {
        id: "gray",
        name: "Gris oscuro",
        class: "bg-gray-600"
      }
    ],
    sizes: [
      {
        name: "S",
        available: true
      },
      {
        name: "M",
        available: true
      },
      {
        name: "L",
        available: true
      }
    ]
  },
  {
    id: 16,
    name: "Camisa de Lino Blanca",
    category: "Camisas",
    price: 59.99,
    rating: 4.6,
    imageColor: "bg-white border border-gray-300",
    colorText: "Blanco",
    description: "Camisa fresca y ligera, excelente para días calurosos.",
    features: [
      "100% Lino",
      "Manga larga enrollable"
    ],
    colors: [
      {
        id: "white",
        name: "Blanco",
        class: "bg-white border border-gray-300"
      },
      {
        id: "light-blue",
        name: "Celeste",
        class: "bg-blue-200"
      }
    ],
    sizes: [
      {
        name: "M",
        available: true
      },
      {
        name: "L",
        available: true
      },
      {
        name: "XL",
        available: false
      }
    ]
  },
  {
    id: 17,
    name: "Pantalón de Vestir Gris",
    category: "Pantalones",
    price: 69.99,
    rating: 4.5,
    imageColor: "bg-gray-500",
    colorText: "Gris",
    description: "Pantalón formal para oficina o eventos especiales.",
    features: [
      "Corte recto",
      "Pliegue frontal",
      "Bolsillos laterales"
    ],
    colors: [
      {
        id: "gray",
        name: "Gris",
        class: "bg-gray-500"
      },
      {
        id: "black",
        name: "Negro",
        class: "bg-gray-900"
      }
    ],
    sizes: [
      {
        name: "S",
        available: true
      },
      {
        name: "M",
        available: true
      },
      {
        name: "L",
        available: true
      }
    ]
  },
  {
    id: 18,
    name: "Casaca de Cuero Sintético",
    category: "Casacas",
    price: 99.99,
    rating: 4.8,
    imageColor: "bg-gray-900",
    colorText: "Negro",
    description: "Estilo rockero clásico con múltiples cierres.",
    features: [
      "Cuello con solapa",
      "Cinturón ajustable"
    ],
    colors: [
      {
        id: "black",
        name: "Negro",
        class: "bg-gray-900"
      },
      {
        id: "brown",
        name: "Marrón",
        class: "bg-yellow-900"
      }
    ],
    sizes: [
      {
        name: "S",
        available: true
      },
      {
        name: "M",
        available: true
      },
      {
        name: "L",
        available: true
      }
    ]
  },
  {
    id: 19,
    name: "Vestido de Noche Rojo",
    category: "Vestidos",
    price: 89.99,
    rating: 4.9,
    imageColor: "bg-red-600",
    colorText: "Rojo",
    description: "Vestido largo elegante para eventos de gala.",
    features: [
      "Escote en V",
      "Abertura lateral"
    ],
    colors: [
      {
        id: "red",
        name: "Rojo",
        class: "bg-red-600"
      },
      {
        id: "black",
        name: "Negro",
        class: "bg-gray-900"
      }
    ],
    sizes: [
      {
        name: "S",
        available: false
      },
      {
        name: "M",
        available: true
      },
      {
        name: "L",
        available: true
      }
    ]
  },
  {
    id: 20,
    name: "Polera Estampada Vintage",
    category: "Poleras",
    price: 39.99,
    rating: 4.3,
    imageColor: "bg-yellow-100",
    colorText: "Crema",
    description: "Polera sin capucha con diseño gráfico retro.",
    features: [
      "Cuello redondo",
      "Algodón suave"
    ],
    colors: [
      {
        id: "cream",
        name: "Crema",
        class: "bg-yellow-100"
      }
    ],
    sizes: [
      {
        name: "S",
        available: true
      },
      {
        name: "M",
        available: true
      },
      {
        name: "L",
        available: true
      }
    ]
  },
  {
    id: 21,
    name: "Falda Vaquera Midi",
    category: "Faldas",
    price: 45,
    rating: 4.5,
    imageColor: "bg-blue-500",
    colorText: "Azul medio",
    description: "Falda de jean clásica por debajo de la rodilla.",
    features: [
      "Abertura frontal",
      "Bolsillos traseros"
    ],
    colors: [
      {
        id: "blue",
        name: "Azul medio",
        class: "bg-blue-500"
      }
    ],
    sizes: [
      {
        name: "S",
        available: true
      },
      {
        name: "M",
        available: true
      },
      {
        name: "L",
        available: true
      }
    ]
  },
  {
    id: 22,
    name: "Shorts Deportivos",
    category: "Shorts",
    price: 24.99,
    rating: 4.7,
    imageColor: "bg-gray-800",
    colorText: "Gris oscuro",
    description: "Ideales para correr o hacer ejercicio.",
    features: [
      "Secado rápido",
      "Cintura elástica"
    ],
    colors: [
      {
        id: "dark-gray",
        name: "Gris oscuro",
        class: "bg-gray-800"
      },
      {
        id: "black",
        name: "Negro",
        class: "bg-gray-900"
      }
    ],
    sizes: [
      {
        name: "S",
        available: true
      },
      {
        name: "M",
        available: true
      },
      {
        name: "L",
        available: true
      }
    ]
  },
  {
    id: 23,
    name: "Chompa Ligera de Hilo",
    category: "Chompas",
    price: 49.99,
    rating: 4.4,
    imageColor: "bg-pink-300",
    colorText: "Rosa pastel",
    description: "Chompa de entretiempo muy combinable.",
    features: [
      "Cuello barco",
      "Tejido fino"
    ],
    colors: [
      {
        id: "pink",
        name: "Rosa pastel",
        class: "bg-pink-300"
      },
      {
        id: "white",
        name: "Blanco",
        class: "bg-white border border-gray-300"
      }
    ],
    sizes: [
      {
        name: "S",
        available: true
      },
      {
        name: "M",
        available: true
      },
      {
        name: "L",
        available: false
      }
    ]
  },
  {
    id: 24,
    name: "Polo a Rayas",
    category: "Polos",
    price: 19.99,
    rating: 4.2,
    imageColor: "bg-blue-200",
    colorText: "Blanco y Azul",
    description: "Polo de estilo marinero atemporal.",
    features: [
      "Manga corta",
      "Corte relajado"
    ],
    colors: [
      {
        id: "striped",
        name: "Blanco y Azul",
        class: "bg-blue-200"
      }
    ],
    sizes: [
      {
        name: "S",
        available: true
      },
      {
        name: "M",
        available: true
      },
      {
        name: "L",
        available: true
      }
    ]
  }

];

// Mapear los sizes de objetos a un array simple de strings para compatibilidad con el formato existente en filtros
