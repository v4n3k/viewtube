import { Divider, Show } from '@/shared/ui';
import React from 'react';
import styles from './SidebarSection.module.css';

interface SidebarSectionProps {
	children: React.ReactNode;
	title?: string;
	withoutDivider?: boolean;
}

export const SidebarSection = ({
	children,
	title,
	withoutDivider = false,
}: SidebarSectionProps) => {
	return (
		<nav>
			<Show when={title}>
				<h2 className={styles.title}>{title}</h2>
			</Show>
			<ul>{children}</ul>
			<Show when={!withoutDivider}>
				<Divider />
			</Show>
		</nav>
	);
};
