import { Header } from '@/widgets/Header';
import { Sidebar } from '@/widgets/Sidebar';

const HomeLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<div>
			<Header />
			<div style={{ display: 'flex', gap: 60, padding: '0 16px' }}>
				<Sidebar />
				{children}
			</div>
		</div>
	);
};

export default HomeLayout;
