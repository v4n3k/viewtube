'use client';

import { Button, TextField } from '@/shared/ui';
import { ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import { useCreateReply } from '../../model';
import styles from './CreateReplyForm.module.css';

interface ReplyFormProps {
	onCancel: () => void;
}

export const CreateReplyForm = ({ onCancel }: ReplyFormProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

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

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<TextField
				ref={inputRef}
				value={text}
				onChange={handleTextChange}
				placeholder='Add reply...'
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
