'use client';

import { Button, TextField } from '@/shared/ui';
import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import styles from './SearchBox.module.css';

export const SearchBox = () => {
	const [q, setQ] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQ(e.target.value);
	};

	return (
		<div className={styles.searchBox}>
			<TextField
				className={styles.input}
				type='search'
				placeholder='Search'
				value={q}
				onChange={handleChange}
			/>
			<Button className={styles.button}>
				<CiSearch size={27} />
			</Button>
		</div>
	);
};
