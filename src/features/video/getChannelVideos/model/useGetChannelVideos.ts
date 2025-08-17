import { getVideosByChannelId } from '@/entities/video/api';
import { useQuery } from '@tanstack/react-query';

export const useGetChannelVideos = (channelId: number) => {
	const query = useQuery({
		queryKey: ['channelVideos', channelId],
		queryFn: () => getVideosByChannelId(channelId),

		select: data =>
			data.map(video => ({ ...video, createdAt: new Date(video.createdAt) })),
	});

	return { channelVideos: query.data, ...query };
};
