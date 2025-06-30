'use client';

import { ReactNode, useCallback, useEffect, useRef } from 'react';
import { CircularLoader } from '../CircularLoader';
import { Show } from '../helpers';

interface InfiniteScrollProps {
	children: ReactNode;
	onLoadMore: () => void;
	hasMore: boolean;
	isLoading?: boolean;
	rootMargin?: string;
	loader?: ReactNode;
}

export const InfiniteScroll = ({
	children,
	onLoadMore,
	hasMore,
	isLoading = false,
	rootMargin = '200px',
	loader = <CircularLoader paddingY='40px' />,
}: InfiniteScrollProps) => {
	const loaderRef = useRef<HTMLDivElement>(null);

	const observerCallback = useCallback(
		(entries: IntersectionObserverEntry[]) => {
			if (entries[0].isIntersecting && hasMore && !isLoading) {
				onLoadMore();
			}
		},
		[hasMore, isLoading, onLoadMore]
	);

	useEffect(() => {
		if (!loaderRef.current) return;

		const observer = new IntersectionObserver(observerCallback, {
			rootMargin,
		});

		observer.observe(loaderRef.current);

		return () => {
			if (loaderRef.current) {
				observer.unobserve(loaderRef.current);
			}
			observer.disconnect();
		};
	}, [observerCallback, rootMargin]);

	return (
		<>
			{children}
			<div ref={loaderRef}>
				<Show when={isLoading}>{loader}</Show>
				<Show when={!hasMore}>
					<div>No more items to load.</div>
				</Show>
			</div>
		</>
	);
};
