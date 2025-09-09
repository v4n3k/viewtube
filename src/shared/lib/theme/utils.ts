import { Theme } from './types';

export const getInitialThemeClient = (): Theme => {
	if (typeof window === 'undefined') {
		return 'light';
	}
	const storedTheme = localStorage.getItem('theme');
	if (storedTheme === 'light' || storedTheme === 'dark') {
		return storedTheme;
	}

	if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
		return 'dark';
	}

	return 'light';
};

export const applyThemeToDOM = (theme: Theme) => {
	if (typeof document !== 'undefined') {
		document.documentElement.setAttribute('data-theme', theme);
	}
};

export const saveThemeToLocalStorage = (theme: Theme) => {
	if (typeof localStorage !== 'undefined') {
		localStorage.setItem('theme', theme);
	}
};
