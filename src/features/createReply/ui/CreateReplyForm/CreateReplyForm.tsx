'use client';

import { Button, TextField } from '@/shared/ui';
import { ChangeEvent, FormEvent, useEffect } from 'react';
import { useCreateReply } from '../../model';
import styles from './CreateReplyForm.module.css';

interface ReplyFormProps {
	onCancel: () => void;
}

export const CreateReplyForm = ({ onCancel }: ReplyFormProps) => {
	const { createReply, isSuccess, text, setText } = useCreateReply();

	const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		createReply();
	};

	useEffect(() => {
		if (isSuccess) {
			setText('');
			onCancel();
		}
	}, [isSuccess, setText, onCancel]);

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<TextField
				value={text}
				onChange={handleTextChange}
				placeholder='Add a public reply...'
			/>
			<div className={styles.actions}>
				<Button type='button' background='transparent' onClick={onCancel}>
					Cancel
				</Button>
				<Button type='submit' disabled={!text.trim()}>
					Reply
				</Button>
			</div>
		</form>
	);
};
