'use client';

import clsx from 'clsx';
import { ComponentProps, useId } from 'react';
import styles from './Toggle.module.css';

interface ToggleProps
	extends Omit<ComponentProps<'input'>, 'onChange' | 'size'> {
	checked: boolean;
	onChange: (checked: boolean) => void;
	size?: 'sm' | 'md' | 'lg';
	label?: string;
	disabled?: boolean;
	stopPropagation?: boolean;
}

export const Toggle = ({
	checked,
	onChange,
	size = 'md',
	label,
	disabled = false,
	stopPropagation = false,
	className,
	...props
}: ToggleProps) => {
	const id = useId();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.checked);
	};

	const handleLabelClick = (e: React.MouseEvent<HTMLLabelElement>) => {
		if (stopPropagation) {
			e.stopPropagation();
		}
	};

	return (
		<label
			htmlFor={id}
			className={clsx(styles.toggleContainer, className)}
			onClick={handleLabelClick}
		>
			<input
				id={id}
				type='checkbox'
				checked={checked}
				onChange={handleChange}
				disabled={disabled}
				className={styles.toggleInput}
				{...props}
			/>
			<span
				className={clsx(
					styles.toggleSlider,
					styles[size],
					{ [styles.disabled]: disabled },
					{ [styles.checked]: checked }
				)}
			>
				<span className={styles.toggleThumb} />
			</span>
			{label && <span className={styles.toggleLabel}>{label}</span>}
		</label>
	);
};
