import clsx from 'clsx';
import { ComponentProps } from 'react';
import { CircularLoader } from '../CircularLoader';
import styles from './Button.module.css';

interface ButtonProps extends ComponentProps<'button'> {
	background?: 'filled' | 'transparent' | 'outlined';
	variant?: 'primary' | 'secondary' | 'danger' | 'success';
	fullWidth?: boolean;
	isLoading?: boolean;
	size?: 'sm' | 'md' | 'lg';
}

export const Button = ({
	children,
	className,
	disabled,
	background = 'filled',
	variant = 'primary',
	fullWidth = false,
	isLoading = false,
	size = 'md',
	...props
}: ButtonProps) => {
	return (
		<button
			className={clsx(
				styles.button,
				styles[background],
				styles[variant],
				styles[size],
				{ [styles.disabled]: disabled || isLoading },
				{ [styles.fullWidth]: fullWidth },
				className
			)}
			disabled={disabled || isLoading}
			{...props}
		>
			<span
				className={clsx(styles.buttonContent, { [styles.hidden]: isLoading })}
			>
				{children}
			</span>

			{isLoading && (
				<span className={styles.loaderWrapper}>
					<CircularLoader size='sm' />
				</span>
			)}
		</button>
	);
};
