'use client';

import { VideosList } from '@/entities/video/ui';
import { useChannelId } from '@/shared/lib';
import { useGetVideosByChannel } from '../../model';

export const VideosByChannelList = () => {
	const channelId = useChannelId();

	const { videosByChannel, isLoading } = useGetVideosByChannel(channelId);

	console.log(videosByChannel);

	return <VideosList videos={videosByChannel} isLoading={isLoading} />;
};
