'use client';

import { getVideoById } from '@/entities/video/api';
import { useChannelId } from '@/shared/lib';
import { CommentsSection } from '@/widgets/comment/CommentsSection/ui';
import { VideoDetails } from '@/widgets/video';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import styles from './WatchPage.module.css';

const DynamicVideoPlayer = dynamic(
	() =>
		import('@/entities/video/ui/VideoPlayer/VideoPlayer').then(
			mod => mod.VideoPlayer
		),
	{
		ssr: false,
		loading: () => <p>Загрузка видеоплеера...</p>,
	}
);

export const WatchPage = () => {
	const channelId = useChannelId();
	const videoId = Number(useParams<{ videoId: string }>()?.videoId);

	const { data: video } = useQuery({
		queryKey: ['video', channelId],
		queryFn: () => getVideoById({ channelId, videoId }),
		select: data => ({
			...data,
			createdAt: new Date(data.createdAt),
		}),
	});

	if (!video) {
		return null;
	}

	return (
		<div className={styles.page}>
			<DynamicVideoPlayer src='/video.mp4' />
			<VideoDetails video={video} />
			<CommentsSection />
		</div>
	);
};
