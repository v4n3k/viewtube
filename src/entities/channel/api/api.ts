import { api } from '@/shared/api';
import { Channel, Subscription } from '../model';

export interface GetChannelParams {
	requesterChannelId: number;
	requestedChannelId: number;
}

interface SubscribeToChannelParams {
	subscriberChannelId: number;
	subscribeToChannelId: number;
}

interface UnsubscribeFromChannelParams {
	subscriberChannelId: number;
	unsubscribeFromChannelId: number;
}

export const getChannel = async ({
	requesterChannelId,
	requestedChannelId,
}: GetChannelParams) => {
	const response = await api.get<Channel>(
		`/channels/${requestedChannelId}/by/${requesterChannelId}`
	);

	return response.data;
};

export const subscribeToChannel = ({
	subscriberChannelId,
	subscribeToChannelId,
}: SubscribeToChannelParams) => {
	return api.post<Subscription>(`/subscriptions`, {
		subscriberChannelId,
		subscribeToChannelId,
	});
};

export const unsubscribeFromChannel = ({
	subscriberChannelId,
	unsubscribeFromChannelId,
}: UnsubscribeFromChannelParams) => {
	return api.delete<Subscription>(`/subscriptions`, {
		data: {
			subscriberChannelId,
			unsubscribeFromChannelId,
		},
	});
};
