import {
	GetRecommendedVideosResponse,
	getVideoById,
} from '@/entities/video/api';
import { useChannelId } from '@/shared/lib';
import { InfiniteData, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { RECOMMENDED_VIDEOS_KEY } from '../../getRecommendedVideos/model/queryKey';

type RecommendedVideosCache = InfiniteData<
	GetRecommendedVideosResponse,
	number
>;

export const useGetVideo = () => {
	const queryClient = useQueryClient();
	const channelId = useChannelId();
	const params = useParams<{ videoId: string }>();
	const videoId = params?.videoId ? Number(params.videoId) : undefined;

	const initialVideo = (() => {
		if (!videoId || !channelId) return undefined;

		const recommendedData = queryClient.getQueryData<RecommendedVideosCache>(
			RECOMMENDED_VIDEOS_KEY,
		);

		if (!recommendedData || !recommendedData.pages) return undefined;

		for (const page of recommendedData.pages) {
			const foundVideo = page.recommendedVideos.find(
				video => video.id === videoId,
			);

			if (foundVideo) {
				return {
					...foundVideo,
					createdAt: new Date(foundVideo.createdAt),
					channel: {
						id: foundVideo.channelId,
						name: foundVideo.channelName,
						avatarUrl: foundVideo.channelAvatar,
						description: '',
						bannerUrl: '',
						subscribersCount: 0,
						videosCount: 0,
						author: {
							id: foundVideo.channelId,
							name: foundVideo.channelName,
							avatarUrl: foundVideo.channelAvatar,
						},
						isSubscribed: false,
						createdAt: new Date(),
					},
				};
			}
		}
		return undefined;
	})();

	const query = useQuery({
		queryKey: ['video', channelId, videoId],
		placeholderData: initialVideo,
		queryFn: () => getVideoById({ channelId, videoId: Number(videoId) }),
		select: data => ({
			...data,
			createdAt: new Date(data.createdAt),
		}),
		staleTime: 1000 * 60 * 5,
		enabled: !!videoId && !!channelId,
	});

	return { video: query.data, ...query };
};
