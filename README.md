# ParaTodos - Prototipo de Tienda de Ropa Inclusiva

"ParaTodos" es un prototipo web de alta fidelidad desarrollado para el curso de Interacción Hombre-Máquina. Su objetivo principal es demostrar principios de usabilidad, accesibilidad, diseño centrado en el usuario, y reducción de carga cognitiva.

El proyecto está construido con:

- React 19
- Vite
- React Router DOM 7
- Tailwind CSS 3.4
- Zustand 5
- Lucide React

## Auditoría de Accesibilidad y Usabilidad (Última Iteración)

El prototipo ha sido auditado de inicio a fin garantizando que cumpla con su propósito: proveer una experiencia de usuario altamente accesible, inclusiva y libre de distracciones. A través de la auditoría se verificaron los flujos de interacción, semántica visual y el modelo lógico de negocio, asegurando que todos los métodos transaccionales como "Agregar al carrito" respondan fluidamente sin fricción y respeten rigurosamente las preferencias (ej. fuentes, contraste, movimiento). Se lograron 0 errores de compilación y lintado, validando la limpieza técnica del código.

### Problemas Encontrados y Solucionados

**Críticos**

- **Modelo de Datos del Carrito defectuoso:** Los artículos se fusionaban basándose únicamente en el `product.id`, lo que significaba que agregar una "Camisa Azul M" y luego una "Camisa Negra L" sobrescribía o agrupaba mal los ítems, impidiendo al usuario comprar distintas variantes del mismo producto.
  - **Corrección:** Se modificó `cartStore.js` para generar un `cartItemId` único que concatena `product.id`, el color seleccionado y la talla. Se refactorizaron los componentes visuales para gestionar el carrito usando esta nueva firma (ej. `id-Azul-M`).

**Medios**

- **Inconsistencia monetaria:** Mezcla de monedas en la interfaz. Elementos críticos como los filtros y el catálogo presentaban los precios con el símbolo de dólar (`$`) en lugar de Soles (`S/`), rompiendo la coherencia contextual peruana.
  - **Corrección:** Se reemplazó estandarizadamente cualquier referencia hardcodeada a dólares por `S/` tanto visualmente como en las etiquetas `aria-label`.

**Menores**

- **Limpieza de código (Lint):** Presencia de múltiples errores de ESLint a lo largo del frontend por la importación innecesaria de `React` (obsoleto con la nueva transformación de JSX), lo que ensuciaba la terminal.
  - **Corrección:** Se eliminaron las importaciones sin uso `import React from 'react'` en los archivos JSX, logrando una consola completamente libre de alertas.

### Cumplimiento de Principios (Nielsen y Norman)

**Heurísticas de Nielsen:**

- **2. Correspondencia entre sistema y mundo real:** Resuelta la fricción que generaba leer `$25` en los filtros pero pagar en `S/` al finalizar la compra (corregido a S/).
- **4. Consistencia y estándares:** Aplicado el mismo formato monetario, tamaño de botones en modales y prevención de pérdida del estado de foco al abrir modales transversales.
- **5. Prevención de errores:** Resuelto el falso error estructural del carrito de colisionar variantes del mismo producto.

**Modelo de Norman:**

- **Evaluación en Agregar al Carrito:** Existía una brecha en la evaluación lógica del carrito si se elegían colores diferentes, ya que la percepción final no correspondía a la intención inicial. Disonancia corregida mediante la identidad por variantes.

### Cumplimiento de Accesibilidad y Usabilidad

- **Teclado:** Comprobado que el teclado nunca queda "atrapado" (No keyboard traps) al interactuar con overlays como el Checkout o el Carrito.
- **Foco:** El foco se restaura lógicamente tras deshacer (undo) una acción o salir con la tecla `Escape`.
- **Daltonismo y Baja visión:** Componentes de selección como la talla y color responden fluidamente al `fontScale` y los contrastes de los estados de error/éxito tienen bordes gruesos que fortalecen el feedback independientemente de la percepción de color.
- **Movimiento Reducido:** Las notificaciones y las ventanas laterales responden al flag global de `reducedMotion` apagando la clase `animate-fade-in` y las transiciones instantáneamente.
- **Prevención visual de errores:** Se unificó el uso del bloque oscuro semántico `border-error` / `bg-error/10` para estados inválidos, eliminando la dependencia del color y siendo consistentes con el diseño general.

### Flujo Completo Validado

El flujo transaccional fue recorrido exitosamente:
Inicio → Catálogo → Seleccionar Variante Múltiple → Producto → talla/color → Carrito → Modificar Cantidad → Checkout → Pasos de Pago → Confirmación (#PT-1042).

### Estado Técnico Final

- **Build:** Exitoso.
- **Lint:** 0 Errores.
- **Consola:** Silenciosa, sin errores lógicos ni loops de renderizado.
- **Responsive:** Probado exitosamente en resoluciones móviles, sin botones o áreas táctiles superpuestas.

## Avance 3 — Evaluación y accesibilidad

Rama `avance3-evaluacion-accesibilidad`. Resultado medido con axe-core 4 (WCAG 2.0/2.1/2.2 A-AA + buenas prácticas) en 6 pantallas × 2 modos (normal y alto contraste): **145 incidencias → 0**.

### Cambios principales

| Área | Antes | Después |
| --- | --- | --- |
| Filtro por color | No existía (solo categoría, talla, precio y calificación) | Filtro por **nombre** de color (Negro, Azul, Rojo…), incluye todas las variantes de cada prenda |
| Categorías | Lista fija de 4: Poleras, Vestidos, Casacas, Polos, Faldas, Shorts y Chompas no se podían filtrar | Se generan desde los datos (11 categorías) |
| Búsqueda | Sensible a tildes, una sola frase exacta, solo el color principal («negro» encontraba 2 de 10 prendas) | Sin tildes, por palabras, en todos los colores («negro»: 10; «camisa azul»: 1) y con número de resultados anunciado |
| Búsqueda por voz | Navegaba sin confirmar y solo daba respuesta visual | Muestra «Escuché: …», es editable y **lee en voz alta** cuántas prendas encontró |
| Tarjeta de producto | Botones «carrito» y «Comprar» agregaban la prenda **sin talla** («Talla Única») | Una sola acción: abrir el detalle y elegir talla |
| Tallas agotadas | Solo opacidad (en alto contraste se veían más destacadas) | Tachadas, borde discontinuo y la palabra «Agotada» |
| Tamaño de texto | 90 % / 100 % / 115 %; además tres pantallas **reducían** el texto al agrandarlo | 100 % / 125 % / 150 % / 175 %, sin desborde horizontal |
| Alto contraste | Botones con 2.98:1 (empeoraba el contraste) | Fondo negro, texto blanco, botones claros con texto negro |
| Daltonismo | El filtro de protanopia reducía 55–69 % la diferencia rojo/verde | Matrices de corrección (daltonización); deuteranopia se mantiene |
| Colores | Error 3.76:1, guía 2.77:1, bordes de campos 1.18:1; clases `bg-*/10` no se generaban | Paleta verificada ≥ 4.5:1 en texto y ≥ 3:1 en controles |
| Teclado | El menú quedaba al final del orden de tabulación; diálogos sin trampa de foco | «Saltar al contenido», menú primero, foco atrapado y restaurado en diálogos |
| Navegación | Título de pestaña fijo; sin aviso de cambio de página | Título por página, scroll al inicio y foco al contenido |
| Ayuda | Botones flotantes solo con ícono; la guía rebotaba sin parar y tapaba contenido | Botones con texto «Accesibilidad» y «Guía», guía en la primera visita y con lectura en voz alta |
| Formularios | Errores sin anunciar, sin `autocomplete` | Errores anunciados y enlazados al campo, `autocomplete`, mostrar contraseña |
| Código | Duplicados (dos buscadores, dos formularios de auth, cuatro modales de filtro, dos formatos de datos de producto), archivos de plantilla sin uso | Componentes únicos (`SearchForm`, `AuthForm`, filtros por configuración), `useFocusTrap`, utilidades `speech`, `search` y `colors` |

---

_Nota: Funcionalidades como el SpeechRecognition y el procesamiento final de pago son mocks de UI desarrollados expresamente para fines académicos en demostración de Interacción Hombre-Máquina._
