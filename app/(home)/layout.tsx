import { Header } from '@/widgets/Header';
import { Sidebar } from '@/widgets/Sidebar';
import styles from './layout.module.css';

const HomeLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<div className={styles.layout}>
			<Header />
			<div className={styles.container}>
				<Sidebar />
				<main className={styles.main}>{children}</main>
			</div>
		</div>
	);
};

export default HomeLayout;
