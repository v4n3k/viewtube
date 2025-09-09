'use client';

import {
	applyThemeToDOM,
	getInitialThemeClient,
	saveThemeToLocalStorage,
	Theme,
} from '@/shared/lib/theme';
import { useCallback, useEffect, useState } from 'react';

export const useTheme = () => {
	const [theme, setTheme] = useState<Theme>('light');

	useEffect(() => {
		const initialTheme = getInitialThemeClient();
		setTheme(initialTheme);
		applyThemeToDOM(initialTheme);
	}, []);

	const toggleTheme = useCallback(() => {
		setTheme(prevTheme => {
			const newTheme = prevTheme === 'light' ? 'dark' : 'light';
			saveThemeToLocalStorage(newTheme);
			applyThemeToDOM(newTheme);
			return newTheme;
		});
	}, []);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		if (localStorage.getItem('theme')) return;

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

		const handleChange = (event: MediaQueryListEvent) => {
			const newSystemTheme = event.matches ? 'dark' : 'light';
			setTheme(newSystemTheme);
			applyThemeToDOM(newSystemTheme);
		};

		mediaQuery.addEventListener('change', handleChange);

		return () => {
			mediaQuery.removeEventListener('change', handleChange);
		};
	}, []);

	return {
		theme,
		toggleTheme,
	};
};
