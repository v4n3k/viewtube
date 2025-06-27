import { Link } from '@/shared/ui';
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
				{iconPosition === 'left' && Icon && <Icon size={24} />}
				{children}
				{iconPosition === 'right' && Icon && <Icon size={24} />}
			</Link>
		</li>
	);
};
