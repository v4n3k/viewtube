'use client';

import clsx from 'clsx';
import { ComponentProps, ReactNode, useId } from 'react';
import styles from './TextField.module.css';

interface TextFieldProps extends ComponentProps<'input'> {
	label?: ReactNode;
	roundedFull?: boolean;
}

export const TextField = ({
	className,
	label,
	type = 'text',
	...props
}: TextFieldProps) => {
	const id = useId();

	return (
		<div className={styles.textField}>
			{!!label && (
				<label className={styles.label} htmlFor={id}>
					{label}
				</label>
			)}
			<input
				className={clsx(styles.input, className)}
				type={type}
				id={id}
				{...props}
			/>
		</div>
	);
};
