import { FileUpload } from '@/shared/ui';

export const VideoUploadInput = ({
	onFileSelect,
	disabled,
	initialFile,
	placeholder,
}: {
	onFileSelect: (file: File | null) => void;
	disabled?: boolean;
	initialFile?: File | null;
	placeholder?: string;
}) => (
	<FileUpload
		onFileSelect={onFileSelect}
		accept='video/*'
		disabled={disabled}
		initialFile={initialFile}
		placeholder={placeholder}
		supportText='Supports MP4, AVI, MOV, WMV and other video formats'
		maxSize={100 * 1024 * 1024} // 100MB
	/>
);
