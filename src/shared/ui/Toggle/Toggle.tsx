import clsx from 'clsx';
import { ComponentProps } from 'react';
import styles from './Toggle.module.css';

interface ToggleProps
	extends Omit<ComponentProps<'input'>, 'onChange' | 'size'> {
	checked: boolean;
	onChange: (checked: boolean) => void;
	size?: 'sm' | 'md' | 'lg';
	label?: string;
	disabled?: boolean;
}

export const Toggle = ({
	checked,
	onChange,
	size = 'md',
	label,
	disabled = false,
	className,
	id,
	...props
}: ToggleProps) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.checked);
	};

	return (
		<label htmlFor={id} className={clsx(styles.toggleContainer, className)}>
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
