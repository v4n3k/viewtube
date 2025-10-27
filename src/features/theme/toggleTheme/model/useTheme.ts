'use client';

import {
	applyThemeToDOM,
	getInitialThemeClient,
	saveThemeToLocalStorage,
} from '@/shared/lib';
import { useThemeStore } from '@/shared/lib/theme';
import { useCallback, useEffect } from 'react';

export const useTheme = () => {
	const theme = useThemeStore(state => state.theme);
	const setTheme = useThemeStore(state => state.setTheme);

	useEffect(() => {
		const initialTheme = getInitialThemeClient();
		setTheme(initialTheme);
		applyThemeToDOM(initialTheme);
	}, []);

	const toggleTheme = useCallback(() => {
		const currentTheme = useThemeStore.getState().theme;
		const newTheme = currentTheme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
		saveThemeToLocalStorage(newTheme);
		applyThemeToDOM(newTheme);
	}, [setTheme]);

	return {
		theme,
		toggleTheme,
	};
};
