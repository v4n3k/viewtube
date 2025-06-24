import clsx from 'clsx';
import { ComponentProps } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ComponentProps<'button'> {
	background?: 'primary' | 'transparent';
}

export const Button = ({
	children,
	className,
	background = 'primary',
	disabled,
}: ButtonProps) => {
	return (
		<button
			className={clsx(
				styles.button,
				styles[background],
				{ [styles.disabled]: disabled },
				className
			)}
		>
			{children}
		</button>
	);
};
