'use client';

import { Toggle } from '@/shared/ui';
import { useTheme } from '../../model';

export const ThemeToggle = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<Toggle
			checked={theme === 'dark'}
			onChange={toggleTheme}
			label='Dark mode'
		/>
	);
};
