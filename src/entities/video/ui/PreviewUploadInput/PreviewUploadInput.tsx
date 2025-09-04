import { FileUpload } from '@/shared/ui';

export const PreviewUploadInput = ({
	onImageSelect,
	disabled,
	initialImage,
	placeholder,
}: {
	onImageSelect: (file: File | null) => void;
	disabled?: boolean;
	initialImage?: File | null;
	placeholder?: string;
}) => {
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
			maxSize={50 * 1024 * 1024}
			showPreviewImage={true}
		/>
	);
};
