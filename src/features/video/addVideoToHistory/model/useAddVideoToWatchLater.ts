import { addVideoToHistory as addVideoToHistoryApi } from '@/entities/video/api';
import { useChannelId } from '@/shared/lib';
import { useMutation } from '@tanstack/react-query';

export const useAddVideoToHistory = () => {
	const channelId = useChannelId();

	const mutation = useMutation({
		mutationFn: (videoId: number) =>
			addVideoToHistoryApi({ channelId, videoId }),
	});

	return { addVideoToHistory: mutation.mutate, ...mutation };
};
