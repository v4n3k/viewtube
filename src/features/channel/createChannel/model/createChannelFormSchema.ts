import { z } from 'zod';

const ACCEPTED_IMAGE_TYPES = [
	'image/jpeg',
	'image/jpg',
	'image/png',
	'image/webp',
	'image/gif',
];
const MAX_IMAGE_SIZE = 15 * 1024 * 1024; // 15MB

export const createChannelFormSchema = z.object({
	name: z
		.string()
		.min(1, 'Name is required')
		.max(100, 'Name must be less than 100 characters'),

	description: z
		.string()
		.min(1, 'Description is required')
		.max(1000, 'Description must be less than 1000 characters'),

	avatarFile: z
		.instanceof(File, { message: 'Image file is required' })
		.refine(
			file => ACCEPTED_IMAGE_TYPES.includes(file.type),
			'Invalid image format'
		)
		.refine(
			file => file.size <= MAX_IMAGE_SIZE,
			`Image must be up to ${MAX_IMAGE_SIZE / 1024 / 1024}MB`
		),

	bannerFile: z
		.instanceof(File, { message: 'Banner image is required' })
		.refine(
			file => ACCEPTED_IMAGE_TYPES.includes(file.type),
			'Invalid image format'
		)
		.refine(
			file => file.size <= MAX_IMAGE_SIZE,
			`Image must be up to ${MAX_IMAGE_SIZE / 1024 / 1024}MB`
		),
});
