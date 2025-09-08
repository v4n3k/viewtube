import { FileUpload } from '@/shared/ui';

interface PreviewUploadInputProps {
	onImageSelect: (file: File | null) => void;
	disabled?: boolean;
	initialImage?: File | null;
	placeholder?: string;
	errorMessage?: string;
}

export const PreviewUploadInput = ({
	onImageSelect,
	disabled,
	initialImage,
	placeholder,
	errorMessage,
}: PreviewUploadInputProps) => {
	const initialPreviewUrl =
		initialImage instanceof File ? URL.createObjectURL(initialImage) : null;

	return (
		<FileUpload
			onFileSelect={onImageSelect}
			accept='image/*'
			disabled={disabled}
			initialFile={initialImage}
			initialPreviewUrl={initialPreviewUrl}
			placeholder={placeholder}
			supportText='Supports JPG, PNG, GIF, WEBP'
			showPreviewImage={true}
			errorMessage={errorMessage}
		/>
	);
};
