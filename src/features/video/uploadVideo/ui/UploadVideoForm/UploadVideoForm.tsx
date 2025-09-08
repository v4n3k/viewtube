'use client';

import { PreviewUploadInput, VideoUploadInput } from '@/entities/video/ui';
import { Button, TextArea, TextField } from '@/shared/ui';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { ZodError } from 'zod';
import { uploadVideoFormSchema, useUploadVideo } from '../../model';
import styles from './UploadVideoForm.module.css';

interface FormState {
	title: string;
	description: string;
	videoFile: File | null;
	previewFile: File | null;
}

type FormErrors = {
	[P in keyof FormState]?: string;
};

const initialFormState: FormState = {
	title: '',
	description: '',
	videoFile: null,
	previewFile: null,
};

const isZodError = (err: unknown): err is ZodError => {
	return err instanceof ZodError;
};

export const UploadVideoForm = () => {
	const [form, setForm] = useState<FormState>(initialFormState);
	const [errors, setErrors] = useState<FormErrors>({});

	const { uploadVideo, isPending, isSuccess } = useUploadVideo();

	useEffect(() => {
		if (isSuccess) {
			resetForm();
		}
	}, [isSuccess]);

	const { title, description, videoFile, previewFile } = form;

	const resetForm = () => {
		setForm(initialFormState);
		setErrors({});
	};

	const validate = (): FormErrors => {
		try {
			uploadVideoFormSchema.parse(form);
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

	const handleTextChange = (
		key: keyof FormState,
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setForm(prev => ({ ...prev, [key]: e.target.value }));
		checkErrors(key);
	};

	const handleFileSelect = (key: keyof FormState, file: File | null) => {
		setForm(prev => ({ ...prev, [key]: file }));
		checkErrors(key);
	};

	const handleVideoFileSelect = (file: File | null) => {
		handleFileSelect('videoFile', file);
	};

	const handlePreviewFileSelect = (file: File | null) => {
		handleFileSelect('previewFile', file);
	};

	const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
		handleTextChange('title', e);
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
		formData.append('title', title);
		formData.append('description', description);
		if (videoFile) formData.append('videoFile', videoFile);
		if (previewFile) formData.append('previewFile', previewFile);

		uploadVideo(formData);
	};

	return (
		<section className={styles.formContainer}>
			<h2 className={styles.title}>Upload Video</h2>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.uploadsContainer}>
					<VideoUploadInput
						initialFile={videoFile}
						onFileSelect={handleVideoFileSelect}
						placeholder='Upload video'
						errorMessage={errors.videoFile}
					/>
					<PreviewUploadInput
						initialImage={previewFile}
						onImageSelect={handlePreviewFileSelect}
						placeholder='Upload preview image'
						errorMessage={errors.previewFile}
					/>
				</div>

				<TextField
					type='text'
					value={title}
					onChange={handleTitleChange}
					placeholder='Title'
					errorMessage={errors.title}
				/>
				<TextArea
					value={description}
					onChange={handleDescriptionChange}
					placeholder='Description'
					errorMessage={errors.description}
				/>

				<div className={styles.buttonsContainer}>
					<Button type='button' background='transparent' onClick={resetForm}>
						Reset
					</Button>
					<Button type='submit' isLoading={isPending}>
						Upload
					</Button>
				</div>
			</form>
		</section>
	);
};
