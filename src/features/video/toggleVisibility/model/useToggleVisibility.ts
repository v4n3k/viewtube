import {
	GetChannelVideosResponse,
	toggleVisibility as toggleVisibilityApi,
} from '@/entities/video/api';
import { Video } from '@/entities/video/model';
import { InfiniteQueryResponse, PAGINATION_LIMIT } from '@/shared/api';
import { useChannelId } from '@/shared/lib';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useToggleVisibility = () => {
	const channelId = useChannelId();
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (videoId: number) => {
			return toggleVisibilityApi({ channelId, videoId });
		},

		onMutate: async (videoId: number) => {
			const queryKey = ['myVideos', channelId, PAGINATION_LIMIT];

			await queryClient.cancelQueries({ queryKey });

			const previousData =
				queryClient.getQueryData<
					InfiniteQueryResponse<GetChannelVideosResponse<Video>>
				>(queryKey);

			queryClient.setQueryData<
				InfiniteQueryResponse<GetChannelVideosResponse<Video>>
			>(queryKey, oldData => {
				if (!oldData?.pages) return oldData;

				return {
					...oldData,
					pages: oldData.pages.map(page => {
						if (page.channelVideos) {
							return {
								...page,
								channelVideos: page.channelVideos.map(video =>
									video.id === videoId
										? {
												...video,
												visibility:
													video.visibility === 'public' ? 'private' : 'public',
										  }
										: video
								),
							};
						}
						return page;
					}),
				};
			});

			return { previousData };
		},

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['myVideos', channelId, PAGINATION_LIMIT],
			});
		},

		onError: (error, videoId, context) => {
			if (context?.previousData) {
				queryClient.setQueryData(
					['myVideos', channelId, PAGINATION_LIMIT],
					context.previousData
				);
			}
			toast.error('Failed to change visibility. Please try again.');
		},
	});

	return {
		toggleVisibility: mutation.mutate,
		...mutation,
	};
};
