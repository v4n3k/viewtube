import { api } from '@/shared/api';
import { Channel, Subscription } from '../model';

interface SubscribeToChannelParams {
	subscriberChannelId: number;
	subscribeToChannelId: number;
}

interface UnsubscribeFromChannelParams {
	subscriberChannelId: number;
	unsubscribeFromChannelId: number;
}

export const getChannel = async (channelId: number) => {
	const response = await api.get<Channel>(`/channels/${channelId}`);

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
