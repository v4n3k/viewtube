import { Button } from '@/shared/ui';
import styles from './page.module.css';

export default function Home() {
	return (
		<div className={styles.page}>
			<h1>ViewTube</h1>
			<Button background='transparent'>click</Button>
		</div>
	);
}
