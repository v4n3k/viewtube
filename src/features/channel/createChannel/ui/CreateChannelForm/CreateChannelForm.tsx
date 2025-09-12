'use client';

import { isZodError } from '@/shared/lib';
import { Button, ImageUploadInput, TextArea, TextField } from '@/shared/ui';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { createChannelFormSchema, useCreateChannel } from '../../model';
import styles from './CreateChannelForm.module.css';

interface FormState {
	name: string;
	description: string;
	avatarFile: File | null;
	bannerFile: File | null;
}

type FormErrors = {
	[P in keyof FormState]?: string;
};

const initialFormState: FormState = {
	name: '',
	description: '',
	avatarFile: null,
	bannerFile: null,
};

export const CreateChannelForm = () => {
	const [form, setForm] = useState<FormState>(initialFormState);
	const [errors, setErrors] = useState<FormErrors>({});

	const { createChannel, isPending, isSuccess } = useCreateChannel();

	useEffect(() => {
		if (isSuccess) {
			resetForm();
		}
	}, [isSuccess]);

	const { name, description, avatarFile, bannerFile } = form;

	const resetForm = () => {
		setForm(initialFormState);
		setErrors({});
	};

	const validate = (): FormErrors => {
		try {
			createChannelFormSchema.parse(form);
			return {};
		} catch (err) {
			const fieldErrors: FormErrors = {};

			if (isZodError(err)) {
				err.issues.forEach(issue => {
					const path = issue.path[0] as keyof FormErrors;
					fieldErrors[path] = issue.message;
				});
			}

			return fieldErrors;
		}
	};

	const checkErrors = (key: keyof FormState) => {
		if (errors[key]) {
			setErrors(prev => ({ ...prev, [key]: undefined }));
		}
	};

	const handleFileSelect = (key: keyof FormState, file: File | null) => {
		setForm(prev => ({ ...prev, [key]: file }));
		checkErrors(key);
	};

	const handleTextChange = (
		key: keyof FormState,
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setForm(prev => ({ ...prev, [key]: e.target.value }));
		checkErrors(key);
	};

	const handleAvatarFileSelect = (file: File | null) => {
		handleFileSelect('avatarFile', file);
	};

	const handleBannerFileSelect = (file: File | null) => {
		handleFileSelect('bannerFile', file);
	};

	const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		handleTextChange('name', e);
	};

	const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		handleTextChange('description', e);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const validationErrors = validate();

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		const formData = new FormData();
		formData.append('name', name);
		formData.append('description', description);
		if (avatarFile) formData.append('avatarFile', avatarFile);
		if (bannerFile) formData.append('bannerFile', bannerFile);

		createChannel(formData);
	};

	return (
		<section className={styles.formContainer}>
			<h2 className={styles.title}>Create channel</h2>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.bannerContainer}>
					<ImageUploadInput
						className={styles.bannerUploadInput}
						initialImage={bannerFile}
						placeholder='Upload banner'
						onImageSelect={handleBannerFileSelect}
						errorMessage={errors.bannerFile}
						aspectRatio='banner'
					/>
				</div>
				<div className={styles.inputsContainer}>
					<ImageUploadInput
						className={styles.avatarUploadInput}
						initialImage={avatarFile}
						placeholder='Upload avatar'
						onImageSelect={handleAvatarFileSelect}
						errorMessage={errors.avatarFile}
						roundedFull
					/>
					<div className={styles.textInputsContainer}>
						<TextField
							type='text'
							value={name}
							onChange={handleNameChange}
							placeholder='Title'
							errorMessage={errors.name}
						/>
						<TextArea
							value={description}
							onChange={handleDescriptionChange}
							placeholder='Description'
							errorMessage={errors.description}
						/>
					</div>
				</div>

				<div className={styles.buttonsContainer}>
					<Button type='button' background='transparent' onClick={resetForm}>
						Reset
					</Button>
					<Button type='submit' isLoading={isPending}>
						Create
					</Button>
				</div>
			</form>
		</section>
	);
};
