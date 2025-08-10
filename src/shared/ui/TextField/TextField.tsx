'use client';

import clsx from 'clsx';
import { ComponentProps, useId } from 'react';
import { Show } from '..';
import styles from './TextField.module.css';

interface TextFieldProps extends ComponentProps<'input'> {
	label?: string;
	errorMessage?: string;
}

export const TextField = ({
	className,
	ref,
	label,
	type = 'text',
	errorMessage,
	...props
}: TextFieldProps) => {
	const id = useId();

	return (
		<div className={styles.textField}>
			<Show when={label}>
				<label className={styles.label} htmlFor={id}>
					{label}
				</label>
			</Show>

			<input
				className={clsx(
					styles.input,
					{ [styles.error]: errorMessage },
					className
				)}
				ref={ref}
				id={id}
				type={type}
				{...props}
			/>

			<Show when={errorMessage}>
				<p className={styles.errorMessage}>{errorMessage}</p>
			</Show>
		</div>
	);
};
