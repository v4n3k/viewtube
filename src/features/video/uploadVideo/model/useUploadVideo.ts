'use client';

import { PATH_GENERATORS } from '@/app/routes';
import { uploadVideo as uploadVideoApi } from '@/entities/video/api';
import { useChannelId } from '@/shared/lib';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export const useUploadVideo = () => {
	const router = useRouter();
	const channelId = useChannelId();

	const mutation = useMutation({
		mutationFn: (video: FormData) => uploadVideoApi({ channelId, video }),

		onSuccess: () => {
			toast.success('Video uploaded successfully');
			router.push(PATH_GENERATORS.myVideos());
		},
	});

	return {
		uploadVideo: mutation.mutate,
		...mutation,
	};
};
