import { getChannel } from '@/entities/channel/api';
import { useQuery } from '@tanstack/react-query';

export const useGetChannelOverview = (channelId: number) => {
	const query = useQuery({
		queryKey: ['channel', channelId],
		queryFn: () => getChannel(channelId),
		enabled: !!channelId,
	});

	return { channel: query.data, ...query };
};
