import clsx from 'clsx';
import { ComponentProps } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ComponentProps<'button'> {
	background?: 'filled' | 'transparent';
	variant?: 'primary' | 'text';
	fullWidth?: boolean;
}

export const Button = ({
	children,
	className,
	disabled,
	background = 'filled',
	variant = 'primary',
	fullWidth = false,
	...props
}: ButtonProps) => {
	return (
		<button
			className={clsx(
				styles.button,
				styles[background],
				styles[variant],
				{ [styles.disabled]: disabled },
				{ [styles.fullWidth]: fullWidth },
				className
			)}
			{...props}
		>
			{children}
		</button>
	);
};
