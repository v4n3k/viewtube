import styles from './ChannelBanner.module.css';

interface ChannelBannerProps {
	url: string;
}

export const ChannelBanner = ({ url }: ChannelBannerProps) => {
	return (
		<img className={styles.channelBanner} src={url} alt='Channel banner' />
	);
};
