'use client';

import { VideosList } from '@/entities/video/ui';
import { useParams } from 'next/navigation';
import { useGetChannelVideos } from '../../model';

export const ChannelVideosList = () => {
	const channelId = Number(useParams()?.channelId);

	const { channelVideos, isLoading } = useGetChannelVideos(channelId);

	return <VideosList videos={channelVideos} isLoading={isLoading} />;
};
