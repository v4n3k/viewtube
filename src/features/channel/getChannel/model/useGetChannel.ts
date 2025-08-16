'use client';

import { getChannel } from '@/entities/channel/api';
import { useChannelId } from '@/shared/lib';
import { useQuery } from '@tanstack/react-query';

export const useGetChannel = (requestedChannelId: number) => {
	const requesterChannelId = useChannelId();

	const query = useQuery({
		queryKey: ['channel', requestedChannelId, requesterChannelId],
		queryFn: () => getChannel({ requestedChannelId, requesterChannelId }),
	});

	return {
		...query,
		channel: query.data,
	};
};
