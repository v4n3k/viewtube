'use client';

import { uploadVideo as uploadVideoApi } from '@/entities/video/api';
import { useChannelId } from '@/shared/lib';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useUploadVideo = () => {
	const channelId = useChannelId();

	const mutation = useMutation({
		mutationFn: (video: FormData) => uploadVideoApi({ channelId, video }),

		onSuccess: () => {
			toast.success('Video uploaded successfully');
		},
	});

	return {
		uploadVideo: mutation.mutate,
		...mutation,
	};
};
