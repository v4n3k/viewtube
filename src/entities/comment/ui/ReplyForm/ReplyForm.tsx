'use client';

import { useCreateComment } from '@/features/createComment/model'; // Import from feature
import { Button, CircularLoader, TextField } from '@/shared/ui';
import { ChangeEvent, FormEvent } from 'react';
import styles from './ReplyForm.module.css';

interface ReplyFormProps {
	onCancel: () => void;
	onSuccess: () => void;
}

export const ReplyForm = ({ onSuccess, onCancel }: ReplyFormProps) => {
	const {
		createComment,
		isPending,
		isSuccess,
		text,
		setText,
	} = useCreateComment();

	const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		createComment();
	};

	if (isPending) {
		return <CircularLoader paddingY='30px' />;
	}

	if (isSuccess) {
		onSuccess();
	}

	return (
		<form className={styles.replyForm} onSubmit={handleSubmit}>
			<TextField
				placeholder='Add a reply...'
				value={text}
				onChange={handleTextChange}
			/>
			<div className={styles.buttonsContainer}>
				<Button background='transparent' onClick={onCancel}>
					Cancel
				</Button>
				<Button type='submit' disabled={!text}>
					Reply
				</Button>
			</div>
		</form>
	);
};
