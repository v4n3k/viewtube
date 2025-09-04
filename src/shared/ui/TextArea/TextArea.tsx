'use client';

import clsx from 'clsx';
import { ComponentProps, useId } from 'react';
import { Show } from '..';
import styles from './TextArea.module.css';

interface TextAreaProps extends ComponentProps<'textarea'> {
	label?: string;
	errorMessage?: string;
}

export const TextArea = ({
	className,
	ref,
	label,
	errorMessage,
	rows = 3,
	...props
}: TextAreaProps) => {
	const id = useId();

	return (
		<div className={styles.textAreaContainer}>
			<Show when={label}>
				<label className={styles.label} htmlFor={id}>
					{label}
				</label>
			</Show>

			<textarea
				className={clsx(
					styles.textArea,
					{ [styles.error]: errorMessage },
					className
				)}
				ref={ref}
				id={id}
				rows={rows}
				{...props}
			/>

			<Show when={errorMessage}>
				<p className={styles.errorMessage}>{errorMessage}</p>
			</Show>
		</div>
	);
};
