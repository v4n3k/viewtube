import { Video } from '../../model';
import { VideoCard } from '../VideoCard/VideoCard';
import styles from './VideosList.module.css';

interface VideosListProps {
	videos: Video[] | undefined;
}

export const VideosList = ({ videos }: VideosListProps) => {
	console.log(videos?.length);

	return (
		<ul className={styles.videosList}>
			{videos?.map(video => (
				<VideoCard key={video.id} video={video} />
			))}
		</ul>
	);
};
