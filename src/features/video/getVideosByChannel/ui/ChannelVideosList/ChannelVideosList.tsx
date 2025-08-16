'use client';

import { VideosList } from '@/entities/video/ui';
import { useParams } from 'next/navigation';
import { useGetVideosByChannel } from '../../model';

export const ChannelVideosList = () => {
	const channelId = Number(useParams()?.channelId);

	const { videosByChannel, isLoading } = useGetVideosByChannel(channelId);

	return <VideosList videos={videosByChannel} isLoading={isLoading} />;
};
