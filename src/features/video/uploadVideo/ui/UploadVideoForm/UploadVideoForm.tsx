'use client';

import { PreviewUploadInput, VideoUploadInput } from '@/entities/video/ui';
import { Button, TextArea, TextField } from '@/shared/ui';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useUploadVideo } from '../../model';
import styles from './UploadVideoForm.module.css';

interface FormState {
	title: string;
	description: string;
	videoFile: File | null;
	previewFile: File | null;
}

const initialFormState: FormState = {
	title: '',
	description: '',
	videoFile: null,
	previewFile: null,
};

export const UploadVideoForm = () => {
	const [form, setForm] = useState(initialFormState);

	const { uploadVideo, isPending, isSuccess } = useUploadVideo();

	const resetForm = () => {
		setForm(initialFormState);
	};

	useEffect(() => {
		if (isSuccess) {
			resetForm();
		}
	}, [isSuccess]);

	const { title, description, videoFile, previewFile } = form;

	const handleFormChange = (
		key: keyof FormState,
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setForm(prev => ({ ...prev, [key]: e.target.value }));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData();

		formData.append('title', title);
		formData.append('description', description);
		if (videoFile) formData.append('videoFile', videoFile);
		if (previewFile) formData.append('previewFile', previewFile);

		uploadVideo(formData);
	};

	const handleVideoFileSelect = (file: File | null) => {
		setForm(prev => ({ ...prev, videoFile: file }));
	};

	const handlePreviewFileSelect = (file: File | null) => {
		setForm(prev => ({ ...prev, previewFile: file }));
	};

	return (
		<article className={styles.formContainer}>
			<h2 className={styles.title}>Upload Video</h2>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.uploadsContainer}>
					<VideoUploadInput
						initialFile={videoFile}
						onFileSelect={handleVideoFileSelect}
						placeholder='Upload video'
					/>

					<PreviewUploadInput
						initialImage={previewFile}
						onImageSelect={handlePreviewFileSelect}
						placeholder='Upload preview image'
					/>
				</div>

				<TextField
					type='text'
					value={title}
					onChange={e => handleFormChange('title', e)}
					placeholder='Title'
				/>
				<TextArea
					value={description}
					onChange={e => handleFormChange('description', e)}
					placeholder='Description'
				/>

				<div className={styles.buttonsContainer}>
					<Button background='transparent' onClick={resetForm}>
						Reset
					</Button>
					<Button type='submit' isLoading={isPending}>
						Upload
					</Button>
				</div>
			</form>
		</article>
	);
};
