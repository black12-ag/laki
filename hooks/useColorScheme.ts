import { useColorScheme as useRNColorScheme } from 'react-native';
import { create } from 'zustand';

// Use Zustand for simple global state management of theme
interface ThemeState {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    setTheme: (theme: 'light' | 'dark') => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
    theme: 'light', // Default to light
    toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
    setTheme: (theme) => set({ theme }),
}));

// Backward compatibility hook that returns the current theme string
export function useColorScheme(): 'light' | 'dark' {
  const theme = useThemeStore((state) => state.theme);
  return theme;
}

// Export individual actions directly from the store to avoid infinite loop
export const toggleTheme = () => useThemeStore.getState().toggleTheme();
export const setTheme = (theme: 'light' | 'dark') => useThemeStore.getState().setTheme(theme);

// Hook version that returns stable references
export function useThemeActions() {
    const toggleTheme = useThemeStore((state) => state.toggleTheme);
    const setTheme = useThemeStore((state) => state.setTheme);
    return { toggleTheme, setTheme };
}
