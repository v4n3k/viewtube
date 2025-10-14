'use client';

import { useSidebarStore } from '@/shared/lib';
import { Link, Show } from '@/shared/ui';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import React from 'react';
import { IconType } from 'react-icons';
import styles from './SidebarLink.module.css';

interface SidebarLinkProps {
	href: string;
	Icon?: IconType;
	iconPosition?: 'left' | 'right';
	children: React.ReactNode;
}

export const SidebarLink = ({
	href,
	Icon,
	iconPosition = 'left',
	children,
}: SidebarLinkProps) => {
	const pathname = usePathname();
	const isSidebarExpanded = useSidebarStore(state => state.isSidebarExpanded);

	return (
		<li>
			<Link
				href={href}
				active={href === pathname}
				className={clsx({
					[styles.expanded]: isSidebarExpanded,
					[styles.sidebarLink]: true,
				})}
			>
				<Show when={iconPosition === 'left' && Icon}>
					{Icon => <Icon size={24} />}
				</Show>
				<span
					className={clsx(styles.linkText, {
						[styles.expanded]: isSidebarExpanded,
					})}
				>
					{children}
				</span>
				<Show when={iconPosition === 'right' && Icon}>
					{Icon => <Icon size={24} />}
				</Show>
			</Link>
		</li>
	);
};
