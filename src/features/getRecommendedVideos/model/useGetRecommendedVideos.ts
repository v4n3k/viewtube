import { getRecommendedVideos } from '@/entities/video/api';
import { Video } from '@/entities/video/model';
import { useQuery } from '@tanstack/react-query';

interface UseRecommendedVideosOptions {
	page: number;
	limit: number;
}

export const useGetRecommendedVideos = (
	options: UseRecommendedVideosOptions
) => {
	const { page, limit } = options;

	const query = useQuery({
		queryKey: ['recommendedVideos', page, limit],
		queryFn: () => getRecommendedVideos({ page, limit }),
		select: data => {
			if (!data) {
				return undefined;
			}

			return data.data.map(video => ({
				...video,
				createdAt: new Date(video.createdAt),
			})) as Video[];
		},
	});

	return {
		recommendedVideos: query.data,
		...query,
	};
};
2;
