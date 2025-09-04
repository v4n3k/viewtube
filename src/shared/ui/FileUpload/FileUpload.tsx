'use client';

import clsx from 'clsx';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styles from './FileUpload.module.css';

interface FileUploadProps {
	onFileSelect: (file: File | null) => void;
	accept: string;
	disabled?: boolean;
	initialFile?: File | null;
	initialPreviewUrl?: string | null;
	placeholder?: string;
	supportText?: string;
	showPreviewImage?: boolean;
	errorMessage?: string;
}

export const FileUpload = ({
	onFileSelect,
	accept,
	disabled = false,
	initialFile = null,
	initialPreviewUrl = null,
	placeholder = 'Upload file',
	supportText = 'Supported formats',
	showPreviewImage = false,
	errorMessage,
}: FileUploadProps) => {
	const [selectedFile, setSelectedFile] = useState<File | null>(initialFile);
	const [previewUrl, setPreviewUrl] = useState<string | null>(
		initialPreviewUrl
	);
	const fileInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		setSelectedFile(initialFile);
	}, [initialFile]);

	useEffect(() => {
		if (initialPreviewUrl) {
			setPreviewUrl(initialPreviewUrl);
		} else if (!initialFile) {
			setPreviewUrl(null);
		}
	}, [initialPreviewUrl, initialFile]);

	const formatFileSize = (bytes: number): string => {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	};

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;

		if (file) {
			setSelectedFile(file);
			onFileSelect(file);

			if (file.type.startsWith('image/')) {
				const objectUrl = URL.createObjectURL(file);
				setPreviewUrl(objectUrl);
			} else {
				setPreviewUrl(null);
			}
		} else {
			setSelectedFile(null);
			setPreviewUrl(null);
			onFileSelect(null);
		}
	};

	const handleRemove = () => {
		if (previewUrl) {
			URL.revokeObjectURL(previewUrl);
		}
		setSelectedFile(null);
		setPreviewUrl(null);
		onFileSelect(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	const handleClick = () => {
		if (!disabled && fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const isImage =
		(selectedFile && selectedFile.type.startsWith('image/')) || previewUrl;

	return (
		<div className={styles.container}>
			<input
				ref={fileInputRef}
				type='file'
				accept={accept}
				onChange={handleFileChange}
				disabled={disabled}
				className={styles.fileInput}
			/>
			<div
				className={clsx(styles.uploadArea, {
					[styles.disabled]: disabled,
					[styles.error]: errorMessage,
				})}
				onClick={handleClick}
			>
				{isImage && showPreviewImage ? (
					<div className={styles.previewWrapper}>
						<img
							src={previewUrl || ''}
							alt='Preview'
							className={styles.previewImage}
						/>
						<button
							type='button'
							className={styles.removeButton}
							onClick={e => {
								e.stopPropagation();
								handleRemove();
							}}
						>
							×
						</button>
					</div>
				) : selectedFile ? (
					<div className={styles.fileInfo}>
						<p className={styles.fileName}>{selectedFile.name}</p>
						<p className={styles.fileSize}>
							{formatFileSize(selectedFile.size)}
						</p>
						<button
							type='button'
							className={styles.removeButton}
							onClick={e => {
								e.stopPropagation();
								handleRemove();
							}}
						>
							×
						</button>
					</div>
				) : (
					<div className={styles.placeholder}>
						<p className={styles.placeholderText}>{placeholder}</p>
						<p className={styles.supportText}>{supportText}</p>
					</div>
				)}
			</div>

			{errorMessage && (
				<div className={styles.errorMessage}>{errorMessage}</div>
			)}
		</div>
	);
};
