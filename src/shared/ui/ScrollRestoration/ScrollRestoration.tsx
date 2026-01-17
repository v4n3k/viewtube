'use client';

import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useRef } from 'react';

interface ScrollRestorationProps {
	className?: string;
	children: ReactNode;
	storageKey?: string;
}

export const ScrollRestoration = ({
	className,
	children,
	storageKey,
}: ScrollRestorationProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const pathname = usePathname();

	const key = storageKey || `scroll-${pathname}`;

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const savedScroll = sessionStorage.getItem(key);
		if (savedScroll) {
			container.scrollTop = Number(savedScroll);
		}

		const handleScroll = () => {
			sessionStorage.setItem(key, container.scrollTop.toString());
		};

		container.addEventListener('scroll', handleScroll);

		return () => container.removeEventListener('scroll', handleScroll);
	}, [key]);

	return (
		<div className={className} ref={containerRef}>
			{children}
		</div>
	);
};
