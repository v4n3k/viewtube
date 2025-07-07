'use client';

import { Button, CircularLoader, Show, TextField } from '@/shared/ui';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useCreateComment } from '../../model';
import styles from './CreateCommentForm.module.css';

export const CreateCommentForm = () => {
	const [areButtonsVisible, setAreButtonsVisible] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

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

	const handleInputFocus = () => {
		setAreButtonsVisible(true);
	};

	const handleHideButtons = () => {
		setAreButtonsVisible(false);
	};

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		createComment();
	};

	const handleCancel = () => {
		setText('');
		handleHideButtons();
		inputRef.current?.blur();
	};

	useEffect(() => {
		if (isSuccess) {
			handleHideButtons();
			inputRef.current?.blur();
		}
	}, [isSuccess, handleHideButtons, setText]);

	return (
		<Show when={!isPending} fallback={<CircularLoader paddingY='40px' />}>
			<form className={styles.form} onSubmit={handleFormSubmit}>
				<TextField
					ref={inputRef}
					placeholder='Add comment...'
					value={text}
					onChange={handleTextChange}
					onFocus={handleInputFocus}
				/>
				<Show when={areButtonsVisible}>
					<div className={styles.buttonsContainer}>
						<Button
							type='button'
							background='transparent'
							onClick={handleCancel}
						>
							Cancel
						</Button>
						<Button type='submit' disabled={!text.trim()}>
							Comment
						</Button>
					</div>
				</Show>
			</form>
		</Show>
	);
};
