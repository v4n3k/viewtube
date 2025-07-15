import { api } from '@/shared/api';
import { Channel } from '../model';

export const getChannel = async (channelId: number) => {
	const response = await api.get<Channel>(`/channels/${channelId}`);

	return response.data;
};
