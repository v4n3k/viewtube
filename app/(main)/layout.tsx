'use client';

import { ScrollRestoration } from '@/shared/ui/ScrollRestoration';
import { Header } from '@/widgets/Header';
import { Sidebar } from '@/widgets/Sidebar';
import { usePathname } from 'next/navigation';
import styles from './layout.module.css';

const HomeLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	const pathname = usePathname();

	const isLeafPage = /\/\d+($|\/)/.test(String(pathname));

	const scrollableContent = isLeafPage ? (
		<main className={styles.mainScroll}>{children}</main>
	) : (
		<ScrollRestoration className={styles.mainScroll}>
			<main className={styles.main}>{children}</main>
		</ScrollRestoration>
	);

	return (
		<div className={styles.layout}>
			<Header />
			<div className={styles.container}>
				<Sidebar />
				{scrollableContent}
			</div>
		</div>
	);
};

export default HomeLayout;
