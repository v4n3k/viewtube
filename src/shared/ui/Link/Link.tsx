import clsx from 'clsx';
import NextLink from 'next/link';
import { ComponentProps } from 'react';
import styles from './Link.module.css';

interface LinkProps extends ComponentProps<typeof NextLink> {
	hoverEffect?: 'background' | 'text';
	active?: boolean;
}

export const Link = ({
	className,
	children,
	hoverEffect = 'background',
	active = false,
	...props
}: LinkProps) => {
	return (
		<NextLink
			className={clsx(styles.link, styles[hoverEffect], className, {
				[styles.active]: active,
			})}
			{...props}
		>
			{children}
		</NextLink>
	);
};
