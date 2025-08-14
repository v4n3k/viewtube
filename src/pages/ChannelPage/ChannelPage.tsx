import { Divider } from '@/shared/ui';
import { ChannelHeader } from '@/widgets/channel/ChannelHeader';
import styles from './ChannelPage.module.css';

export const ChannelPage = () => {
	return (
		<div className={styles.channelPage}>
			<ChannelHeader />
			<Divider />
		</div>
	);
};
