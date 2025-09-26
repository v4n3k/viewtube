import { ChannelVideosList } from '@/features/video/getChannelVideos';
import { ChannelHeader } from '@/widgets/channel/ChannelHeader';
import styles from './ChannelPage.module.css';

export const ChannelPage = () => {
	return (
		<div className={styles.channelPage}>
			<ChannelHeader />
			<ChannelVideosList />
		</div>
	);
};
