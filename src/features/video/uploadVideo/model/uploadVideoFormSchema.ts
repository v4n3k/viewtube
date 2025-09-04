import { z } from 'zod';

const ACCEPTED_VIDEO_TYPES = [
	'video/mp4',
	'video/avi',
	'video/mov',
	'video/wmv',
	'video/webm',
];
const ACCEPTED_IMAGE_TYPES = [
	'image/jpeg',
	'image/jpg',
	'image/png',
	'image/webp',
	'image/gif',
];

const MAX_VIDEO_SIZE = 800 * 1024 * 1024; // 800MB
const MAX_IMAGE_SIZE = 15 * 1024 * 1024; // 15MB

export const uploadVideoFormSchema = z.object({
	title: z
		.string()
		.min(1, 'Title is required')
		.max(100, 'Title must be less than 100 characters'),

	description: z
		.string()
		.min(1, 'Description is required')
		.max(1000, 'Description must be less than 1000 characters'),

	videoFile: z
		.instanceof(File, { message: 'Video file is required' })
		.refine(
			file => ACCEPTED_VIDEO_TYPES.includes(file.type),
			'Invalid video format'
		)
		.refine(
			file => file.size <= MAX_VIDEO_SIZE,
			`Video must be up to ${MAX_VIDEO_SIZE / 1024 / 1024}MB`
		),

	previewFile: z
		.instanceof(File, { message: 'Preview image is required' })
		.refine(
			file => ACCEPTED_IMAGE_TYPES.includes(file.type),
			'Invalid image format'
		)
		.refine(
			file => file.size <= MAX_IMAGE_SIZE,
			`Image must be up to ${MAX_IMAGE_SIZE / 1024 / 1024}MB`
		),
});

export type UploadVideoFormValues = z.infer<typeof uploadVideoFormSchema>;
