import { Header } from '@/widgets/Header';
import { Sidebar } from '@/widgets/Sidebar';
import styles from './layout.module.css';

const HomeLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<div>
			<Header />
			<div className={styles.container}>
				<Sidebar />
				{children}
			</div>
		</div>
	);
};

export default HomeLayout;
