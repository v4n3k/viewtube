import { PATH_GENERATORS } from '@/app/routes';
import { Button, Link } from '@/shared/ui';
import { GoPlus } from 'react-icons/go';
import { RxHamburgerMenu } from 'react-icons/rx';
import styles from './Header.module.css';
import { SearchBox } from './SearchBox';

export const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.left}>
				<Button className={styles.toggleSidebarButton} background='transparent'>
					<RxHamburgerMenu size={20} />
				</Button>
				<Link href={PATH_GENERATORS.home()} hoverEffect='text'>
					ViewTube
				</Link>
			</div>

			<SearchBox />

			<div className={styles.right}>
				<Button>
					<GoPlus size={28} />
					Create
				</Button>
				<img src='/avatar.png' alt='' />
			</div>
		</header>
	);
};
