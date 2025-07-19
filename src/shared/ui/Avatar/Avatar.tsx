import clsx from 'clsx';
import { ComponentProps } from 'react';
import styles from './Avatar.module.css';

interface AvatarProps extends ComponentProps<'img'> {
	src?: string;
	size?: 'sm' | 'md' | 'lg' | 'xl';
	shape?: 'circle' | 'square';
}

export const Avatar = ({
	className,
	src,
	alt,
	size = 'md',
	shape = 'circle',
	...props
}: AvatarProps) => {
	return (
		<img
			className={clsx(styles.avatar, styles[size], styles[shape], className)}
			src={src || '/imgPlaceholder.jpg'}
			alt={alt || 'avatar'}
			{...props}
		/>
	);
};
