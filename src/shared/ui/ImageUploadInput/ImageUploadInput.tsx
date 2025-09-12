import { FileUpload } from '@/shared/ui';

interface ImageUploadInputProps {
	className?: string;
	onImageSelect: (file: File | null) => void;
	disabled?: boolean;
	initialImage?: File | null;
	placeholder?: string;
	errorMessage?: string;
	roundedFull?: boolean;
	aspectRatio?: 'default' | 'square' | 'banner';
}

export const ImageUploadInput = ({
	className,
	onImageSelect,
	disabled,
	initialImage,
	placeholder,
	errorMessage,
	roundedFull = false,
	aspectRatio = 'default',
}: ImageUploadInputProps) => {
	const initialPreviewUrl =
		initialImage instanceof File ? URL.createObjectURL(initialImage) : null;

	return (
		<FileUpload
			className={className}
			onFileSelect={onImageSelect}
			accept='image/*'
			disabled={disabled}
			initialFile={initialImage}
			initialPreviewUrl={initialPreviewUrl}
			placeholder={placeholder}
			supportText='Supports JPG, PNG, GIF, WEBP'
			showPreviewImage={true}
			errorMessage={errorMessage}
			roundedFull={roundedFull}
			aspectRatio={aspectRatio}
		/>
	);
};
