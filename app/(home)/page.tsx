'use client';
import { Button, Link, TextField } from '@/shared/ui';
import { toast } from 'react-toastify';
import styles from './page.module.css';

export default function Home() {
	return (
		<div className={styles.page}>
			<h1>ViewTube</h1>
			<Button>click</Button>
			<Button background='transparent'>click</Button>
			<Link href='/auth/sign-in'>sign in</Link>
			<Link href='/auth/sign-up' hoverEffect='text'>
				sign-up
			</Link>
			<TextField label='Email' placeholder='Enter your email' />

			<Button
				onClick={() => {
					toast.success('hello');
					toast.error('hello');
				}}
			>
				toast
			</Button>

			<Button onClick={() => document.body.classList.toggle('theme-dark')}>
				toggle theme
			</Button>
		</div>
	);
}
