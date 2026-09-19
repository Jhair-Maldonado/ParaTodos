import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAccessibilityStore = create(
  persist(
    (set) => ({
      colorBlindMode: 'none', // 'none', 'protanopia', 'deuteranopia', 'tritanopia'
      highContrast: false,
      fontScale: 1, // 0.9, 1, 1.15
      reducedMotion: false,
      simplifiedMode: false,
      setColorBlindMode: (mode) => set({ colorBlindMode: mode }),
      toggleHighContrast: () => set((state) => ({ highContrast: !state.highContrast })),
      setFontScale: (scale) => set({ fontScale: scale }),
      setReducedMotion: (value) => set({ reducedMotion: value }),
      setSimplifiedMode: (value) => set({ simplifiedMode: value }),
      resetAccessibility: () => set({
        colorBlindMode: 'none',
        highContrast: false,
        fontScale: 1,
        reducedMotion: false,
        simplifiedMode: false,
      }),
    }),
    {
      name: 'accessibility-preferences',
    }
  )
);

export default useAccessibilityStore;
