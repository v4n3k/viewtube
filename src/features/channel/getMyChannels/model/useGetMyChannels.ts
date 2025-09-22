import { getMyChannels } from '@/entities/channel/api';
import { useUserId } from '@/shared/lib/useUserId';
import { useQuery } from '@tanstack/react-query';

export const useGetMyChannels = () => {
	const userId = useUserId();

	const query = useQuery({
		queryKey: ['myChannels', userId],
		queryFn: () => getMyChannels(userId),
		enabled: !!userId,
	});

	const { data, ...rest } = query;

	return {
		myChannels: data,
		...rest,
	};
};
