import { Link, Show } from '@/shared/ui';
import React from 'react';
import { IconType } from 'react-icons';

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
	return (
		<li>
			<Link href={href}>
				<Show when={iconPosition === 'left' && Icon}>
					{Icon => <Icon size={24} />}
				</Show>
				{children}
				<Show when={iconPosition === 'right' && Icon}>
					{Icon => <Icon size={24} />}
				</Show>
			</Link>
		</li>
	);
};
