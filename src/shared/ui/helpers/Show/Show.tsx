import { ReactNode } from 'react';

interface ShowProps<T> {
	when: T | undefined | null | false;
	fallback?: ReactNode;
	children: ReactNode | ((item: T) => React.ReactNode);
}

export function Show<T>({ when, fallback = null, children }: ShowProps<T>) {
	if (when) {
		return typeof children === 'function'
			? (children as (item: T) => React.ReactNode)(when)
			: children;
	}

	return fallback;
}
