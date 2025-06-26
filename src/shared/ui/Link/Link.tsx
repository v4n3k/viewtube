import clsx from 'clsx';
import NextLink from 'next/link';
import { ComponentProps } from 'react';
import styles from './Link.module.css';

interface LinkProps extends ComponentProps<typeof NextLink> {
	hoverEffect?: 'background' | 'text';
}

export const Link = ({
	className,
	children,
	hoverEffect = 'background',
	...props
}: LinkProps) => {
	return (
		<NextLink
			className={clsx(
				styles.link,
				styles[hoverEffect],

				className
			)}
			{...props}
		>
			{children}
		</NextLink>
	);
};
