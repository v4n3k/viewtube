'use client';

import { getVideoById } from '@/entities/video/api';
import { CommentsSection } from '@/widgets/comment/CommentsSection/ui';
import { VideoDetails } from '@/widgets/video';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import styles from './WatchPage.module.css';

const DynamicVideoPlayer = dynamic(
	() =>
		import('@/entities/video/ui/VideoPlayer/VideoPlayer').then(
			mod => mod.VideoPlayer
		),
	{
		ssr: false, // Это самое главное: не рендерить на сервере
		loading: () => <p>Загрузка видеоплеера...</p>, // Опционально: что показывать во время загрузки
	}
);

export const WatchPage = () => {
	const { data: video } = useQuery({
		queryKey: ['video'],
		queryFn: () => getVideoById(1),
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
