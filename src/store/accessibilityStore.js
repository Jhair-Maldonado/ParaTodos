import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Respeta las preferencias que el usuario ya configuró en su sistema operativo
const prefers = (query) =>
  typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(query).matches : false;

export const FONT_SCALES = [1, 1.25, 1.5, 1.75];

const defaults = () => ({
  colorBlindMode: 'none', // 'none', 'protanopia', 'deuteranopia', 'tritanopia'
  highContrast: prefers('(prefers-contrast: more)'),
  fontScale: 1,
  reducedMotion: prefers('(prefers-reduced-motion: reduce)'),
  simplifiedMode: false,
  voiceFeedback: false, // leer en voz alta confirmaciones y resultados
});

const useAccessibilityStore = create(
  persist(
    (set) => ({
      ...defaults(),
      setColorBlindMode: (mode) => set({ colorBlindMode: mode }),
      toggleHighContrast: () => set((state) => ({ highContrast: !state.highContrast })),
      setFontScale: (scale) => set({ fontScale: scale }),
      setReducedMotion: (value) => set({ reducedMotion: value }),
      setSimplifiedMode: (value) => set({ simplifiedMode: value }),
      setVoiceFeedback: (value) => set({ voiceFeedback: value }),
      resetAccessibility: () => set(defaults()),
    }),
    {
      name: 'accessibility-preferences',
      version: 1,
      // v0 ofrecía 0.9 / 1 / 1.15: se convierten a la nueva escala (máx. 175 %)
      migrate: (state) => ({
        ...state,
        fontScale: state.fontScale > 1 ? 1.25 : 1,
        voiceFeedback: false,
      }),
    }
  )
);

export default useAccessibilityStore;
