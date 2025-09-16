import { CircularLoader, Show } from '@/shared/ui';
import clsx from 'clsx';
import { ComponentType } from 'react';
import { Video, VideoWithoutChannel } from '../../model';
import { VideoCard } from '../VideoCard';
import styles from './VideosList.module.css';

interface VideosListProps {
	title?: string;
	videos: (Video | VideoWithoutChannel)[] | undefined;
	isLoading?: boolean;
	isError?: boolean;
	error?: Error | null;
	layout?: 'grid' | 'verticalList';
	gap?: 'lg' | 'xl';
	VideoCardComponent?: ComponentType<{ video: Video | VideoWithoutChannel }>;
}

export const VideosList = ({
	title,
	videos,
	isLoading,
	isError,
	error,
	layout = 'grid',
	gap = 'lg',
	VideoCardComponent = VideoCard,
}: VideosListProps) => {
	return (
		<section className={styles.videosListSection}>
			<Show when={title}>
				<h2 className={styles.title}>{title}</h2>
			</Show>

			<Show when={isLoading}>
				<CircularLoader paddingY='60px' />
			</Show>

			<Show when={isError}>
				<span className={styles.errorMessage}>
					Error fetching videos: {error?.message}
				</span>
			</Show>

			<Show when={!isLoading && !isError && !videos?.length}>
				<span className={styles.errorMessage}>No videos found</span>
			</Show>

			<Show when={videos?.length && !isLoading && !isError}>
				<ul
					className={clsx(
						styles.videosList,
						styles[layout],
						styles[`gap-${gap}`]
					)}
				>
					{videos?.map(video => (
						<VideoCardComponent key={video.id} video={video} />
					))}
				</ul>
			</Show>
		</section>
	);
};
