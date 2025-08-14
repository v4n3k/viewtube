import clsx from 'clsx';
import { ComponentProps } from 'react';
import styles from './Avatar.module.css';

interface AvatarProps extends ComponentProps<'img'> {
	src?: string;
	size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
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
			className={clsx(
				styles.avatar,
				styles[`size-${size}`],
				styles[shape],
				className
			)}
			src={
				src ||
				'https://storage.yandexcloud.net/viewtube/images/uploaded-image.jpg'
			}
			alt={alt || 'avatar'}
			{...props}
		/>
	);
};
