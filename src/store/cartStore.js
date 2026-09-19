import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      
      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),

      addItem: (product) => {
        set((state) => {
          // Crear un ID único basado en producto, color y talla
          const cartItemId = `${product.id}-${product.colorText}-${product.selectedSize}`;
          
          const existingItem = state.items.find(item => item.cartItemId === cartItemId);
          if (existingItem) {
            return {
              items: state.items.map(item => 
                item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
              ),
              isDrawerOpen: true // Abre el carrito para retroalimentación visual (Norman - Evaluación)
            };
          }
          return { items: [...state.items, { ...product, cartItemId, quantity: 1 }], isDrawerOpen: true };
        });
      },
      removeItem: (cartItemId) => {
        set((state) => ({
          items: state.items.filter(item => item.cartItemId !== cartItemId)
        }));
      },
      
      restoreItem: (item, index) => {
        set((state) => {
          const newItems = [...state.items];
          // Insert at original index if possible, otherwise at end
          if (index !== undefined && index >= 0 && index <= newItems.length) {
            newItems.splice(index, 0, item);
          } else {
            newItems.push(item);
          }
          return { items: newItems };
        });
      },
      
      updateQuantity: (cartItemId, quantity) => {
        if (quantity < 1) return;
        set((state) => ({
          items: state.items.map(item => 
            item.cartItemId === cartItemId ? { ...item, quantity } : item
          )
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    }),
    {
      name: 'shopping-cart',
    }
  )
);

export default useCartStore;
