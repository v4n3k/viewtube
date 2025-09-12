import { FileUpload } from '@/shared/ui';

interface VideoUploadInputProps {
	onFileSelect: (file: File | null) => void;
	disabled?: boolean;
	initialFile?: File | null;
	placeholder?: string;
	errorMessage?: string;
}

export const VideoUploadInput = ({
	onFileSelect,
	disabled,
	initialFile,
	placeholder,
	errorMessage,
}: VideoUploadInputProps) => (
	<FileUpload
		onFileSelect={onFileSelect}
		accept='video/*'
		disabled={disabled}
		initialFile={initialFile}
		placeholder={placeholder}
		supportText='Supports MP4, AVI, WMV and other video formats'
		showPreviewImage={false}
		errorMessage={errorMessage}
	/>
);
