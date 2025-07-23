import { Video } from '../../model';
import { VideoCard } from '../VideoCard/VideoCard';
import styles from './VideosList.module.css';

interface VideosListProps {
	title: string;
	videos: Video[] | undefined;
}

export const VideosList = ({ title, videos }: VideosListProps) => {
	return (
		<section className={styles.videosListSection}>
			<h2 className={styles.title}>{title}</h2>
			<ul className={styles.videosList}>
				{videos?.map(video => (
					<VideoCard key={video.id} video={video} />
				))}
			</ul>
		</section>
	);
};
