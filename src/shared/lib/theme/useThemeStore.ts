import { create } from 'zustand';
import { Theme } from './types';

interface UseThemeStore {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	toggleTheme: () => void;
}

export const useThemeStore = create<UseThemeStore>(set => ({
	theme: 'light',
	setTheme: theme => set({ theme }),
	toggleTheme: () =>
		set(state => ({
			theme: state.theme === 'light' ? 'dark' : 'light',
		})),
}));
