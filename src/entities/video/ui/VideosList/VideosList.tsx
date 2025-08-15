import { CircularLoader, Show } from '@/shared/ui';
import { Video } from '../../model';
import { VideoCard } from '../VideoCard/VideoCard';
import styles from './VideosList.module.css';

interface VideosListProps {
	title?: string;
	videos: Video[] | undefined;
	isLoading?: boolean;
	isError?: boolean;
	error?: Error | null;
}

export const VideosList = ({
	title,
	videos,
	isLoading,
	isError,
	error,
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
				<ul className={styles.videosList}>
					{videos?.map(video => (
						<VideoCard key={video.id} video={video} />
					))}
				</ul>
			</Show>
		</section>
	);
};
