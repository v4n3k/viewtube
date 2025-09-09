'use client';

import { Button } from '@/shared/ui';
import { useTheme } from '../../model/useTheme';

export const ToggleThemeButton = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<Button onClick={toggleTheme}>
			Change mode to {theme === 'light' ? 'dark' : 'light'}
		</Button>
	);
};
