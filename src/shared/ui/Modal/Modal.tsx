'use client';

import clsx from 'clsx';
import {
	CSSProperties,
	KeyboardEvent,
	MouseEvent,
	ReactNode,
	TouchEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import styles from './Modal.module.css';

export interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: ReactNode;
	className?: string;
	style?: CSSProperties;
	showCloseButton?: boolean;
	closeButtonContent?: ReactNode;
	footer?: ReactNode;
	closeOnOverlayClick?: boolean;
	closeOnEsc?: boolean;
	size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
	ariaLabel?: string;
	preventClose?: boolean;
}

export const Modal = ({
	isOpen,
	onClose,
	title,
	children,
	className = '',
	style,
	showCloseButton = true,
	closeButtonContent = '×',
	footer,
	closeOnOverlayClick = true,
	closeOnEsc = true,
	size = 'md',
	ariaLabel,
	preventClose = false,
}: ModalProps) => {
	const [isAnimating, setIsAnimating] = useState(false);

	const modalRef = useRef<HTMLDivElement>(null);
	const focusableElementsRef = useRef<HTMLElement[]>([]);
	const previouslyFocusedElement = useRef<HTMLElement | null>(null);
	const animationFrameRef = useRef<number | null>(null);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLDivElement>) => {
			if (event.key === 'Escape' && closeOnEsc && !preventClose) {
				event.stopPropagation();
				onClose();
			}

			if (event.key === 'Tab' && modalRef.current) {
				const focusableElements = focusableElementsRef.current;
				if (focusableElements.length === 0) return;

				const firstElement = focusableElements[0];
				const lastElement = focusableElements[focusableElements.length - 1];

				if (event.shiftKey && document.activeElement === firstElement) {
					event.preventDefault();
					lastElement.focus();
				} else if (!event.shiftKey && document.activeElement === lastElement) {
					event.preventDefault();
					firstElement.focus();
				}
			}
		},
		[closeOnEsc, onClose, preventClose]
	);

	const handleOverlayClick = useCallback(
		(event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
			if (
				event.target === event.currentTarget &&
				closeOnOverlayClick &&
				!preventClose
			) {
				onClose();
			}
		},
		[closeOnOverlayClick, onClose, preventClose]
	);

	const updateFocusableElements = useCallback(() => {
		if (!modalRef.current) return;

		const focusableSelector = [
			'button:not([disabled])',
			'input:not([disabled])',
			'select:not([disabled])',
			'textarea:not([disabled])',
			'a[href]',
			'area[href]',
			'[tabindex]:not([tabindex="-1"])',
			'[contenteditable]:not([contenteditable="false"])',
		].join(', ');

		const elements = Array.from(
			modalRef.current.querySelectorAll<HTMLElement>(focusableSelector)
		).filter(el => el.offsetParent !== null);

		focusableElementsRef.current = elements;
	}, []);

	useEffect(() => {
		if (!isOpen) return;

		previouslyFocusedElement.current = document.activeElement as HTMLElement;
		updateFocusableElements();

		if (focusableElementsRef.current.length > 0) {
			focusableElementsRef.current[0].focus();
		} else if (modalRef.current) {
			modalRef.current.focus();
		}

		const handleResize = () => {
			updateFocusableElements();
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [isOpen, updateFocusableElements]);

	useEffect(() => {
		if (!isOpen && previouslyFocusedElement.current) {
			previouslyFocusedElement.current.focus();
			previouslyFocusedElement.current = null;
		}
	}, [isOpen]);

	useEffect(() => {
		if (isOpen) {
			setIsAnimating(true);
			animationFrameRef.current = window.setTimeout(() => {
				setIsAnimating(false);
			}, 250);
		} else if (isAnimating) {
			setIsAnimating(false);
		}

		return () => {
			if (animationFrameRef.current) {
				window.clearTimeout(animationFrameRef.current);
			}
		};
	}, [isOpen, isAnimating]);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	if (!isOpen) {
		return null;
	}

	const sizeClass = {
		sm: styles.modalSm,
		md: styles.modalMd,
		lg: styles.modalLg,
		xl: styles.modalXl,
		full: styles.modalFull,
	}[size];

	return (
		<div
			className={clsx(
				styles.modalOverlay,
				isAnimating && styles.modalEntering,
				className
			)}
			role='dialog'
			aria-modal='true'
			aria-label={ariaLabel || title}
			aria-labelledby={ariaLabel ? undefined : 'modal-title'}
			tabIndex={-1}
			onKeyDown={handleKeyDown}
			onClick={handleOverlayClick}
			onTouchEnd={handleOverlayClick}
		>
			<div
				ref={modalRef}
				className={clsx(
					styles.modal,
					sizeClass,
					isAnimating && styles.modalEntering
				)}
				role='document'
				style={style}
				onClick={e => e.stopPropagation()}
				onTouchEnd={e => e.stopPropagation()}
			>
				<div className={styles.modalHeader}>
					<h2 id='modal-title' className={styles.modalTitle}>
						{title}
					</h2>
					{showCloseButton && !preventClose && (
						<button
							type='button'
							className={styles.closeButton}
							onClick={onClose}
							aria-label='Close modal'
						>
							{closeButtonContent}
						</button>
					)}
				</div>

				<div className={styles.modalContent}>{children}</div>

				{footer && <div className={styles.modalFooter}>{footer}</div>}
			</div>
		</div>
	);
};
