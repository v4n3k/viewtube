import { getChannel } from '@/entities/channel/api';
import { useQuery } from '@tanstack/react-query';

export const useGetChannel = (channelId: number) => {
	const query = useQuery({
		queryKey: ['channel', channelId],
		queryFn: () => getChannel(channelId),
	});

	return {
		...query,
		channel: query.data,
	};
};
