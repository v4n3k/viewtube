import { getVideosByChannelId } from '@/entities/video/api';
import { useQuery } from '@tanstack/react-query';

export const useGetVideosByChannel = (channelId: number) => {
	const query = useQuery({
		queryKey: ['videosByChannel', channelId],
		queryFn: () => getVideosByChannelId(channelId),

		select: data =>
			data.map(video => ({ ...video, createdAt: new Date(video.createdAt) })),
	});

	return { videosByChannel: query.data, ...query };
};
