import { api } from '@/shared/api';
import { http } from '@/shared/api/httpClient';
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

interface ChannelDTO {
	id: number;
	userId: number;
	name: string;
	description: string;
	avatarUrl: string;
	bannerUrl: string;
	createdAt: string;
}

export const getChannel = async ({
	requesterChannelId,
	requestedChannelId,
}: GetChannelParams) => {
	const response = await http.get<Channel>(
		`/channels/${requestedChannelId}/by/${requesterChannelId}`,
	);

	return response;
};

export const getMyChannels = async (userId: number) => {
	const response = await http.get<Channel[]>(`/users/${userId}/channels`);

	return response;
};

export const subscribeToChannel = ({
	subscriberChannelId,
	subscribeToChannelId,
}: SubscribeToChannelParams) => {
	return http.post<Subscription>(`/subscriptions`, {
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

export const createChannel = async (channel: FormData) => {
	const response = await http.post<ChannelDTO>(`/channels`, channel, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});

	return response;
};

export const selectChannel = async (channelId: number) => {
	const response = await http.get<Channel>(`/channels/select/${channelId}`);

	return response;
};

export const deleteChannel = async (channelId: number) => {
	const response = await http.delete<Channel>(`/channels/${channelId}`);

	return response;
};
