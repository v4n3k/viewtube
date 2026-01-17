'use client';

import clsx from 'clsx';
import {
	ComponentProps,
	startTransition,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
	ViewTransition,
} from 'react';
import { Show } from '../helpers';
import styles from './ExpandableText.module.css';

interface ExpandableTextProps extends ComponentProps<'p'> {
	textClassName?: string;
	maxLines?: number;
	children: React.ReactNode;
}

export const ExpandableText = ({
	textClassName,
	className,
	children,
	maxLines = 3,
}: ExpandableTextProps) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [shouldShowButton, setShouldShowButton] = useState(false);

	const textRef = useRef<HTMLParagraphElement | null>(null);

	const textContent = useMemo(() => String(children || '').trim(), [children]);

	useLayoutEffect(() => {
		const currentElement = textRef.current;

		if (!currentElement) return;

		currentElement.style.setProperty(
			'--expandable-text-max-lines',
			String(maxLines)
		);

		const originalClassName = currentElement.className;

		currentElement.className = styles.text;
		const fullHeight = currentElement.scrollHeight;

		currentElement.className = clsx(styles.text, styles.clamped);
		const clampedHeight = currentElement.clientHeight;

		startTransition(() => setShouldShowButton(fullHeight > clampedHeight));

		currentElement.className = originalClassName;
	}, [textContent, maxLines]);

	const toggleExpand = () => {
		startTransition(() => setIsExpanded(prev => !prev));
	};

	return (
		<ViewTransition>
			<div className={clsx(styles.expandableText, className)}>
				<p
					className={clsx(styles.text, textClassName, {
						[styles.clamped]: !isExpanded,
					})}
					ref={textRef}
				>
					{textContent}
				</p>
				<Show when={shouldShowButton}>
					<button
						className={clsx(styles.button, { [styles.showLess]: isExpanded })}
						onClick={toggleExpand}
						aria-expanded={isExpanded}
					>
						{isExpanded ? 'Show less' : 'Show more'}
					</button>
				</Show>
			</div>
		</ViewTransition>
	);
};
