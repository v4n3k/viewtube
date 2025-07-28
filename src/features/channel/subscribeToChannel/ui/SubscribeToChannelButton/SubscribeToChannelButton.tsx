import { Button, Show } from '@/shared/ui';
import { MdCheckCircle, MdOutlineCheckCircle } from 'react-icons/md';
import { useSubscribeToChannel, useUnsubscribeFromChannel } from '../../model';
import styles from './SubscribeToChannelButton.module.css';

interface SubscribeToChannelButtonProps {
	isSubscribed: boolean;
	subscribedToChannelId: number;
}

const ICON_SIZE = 20;

export const SubscribeToChannelButton = ({
	isSubscribed,
	subscribedToChannelId,
}: SubscribeToChannelButtonProps) => {
	const { subscribeToChannel } = useSubscribeToChannel(subscribedToChannelId);
	const { unsubscribeFromChannel } = useUnsubscribeFromChannel(
		subscribedToChannelId
	);

	const toggleSubscription = () => {
		if (isSubscribed) {
			unsubscribeFromChannel();
		} else {
			subscribeToChannel();
		}
	};

	return (
		<Button className={styles.subscribeButton} onClick={toggleSubscription}>
			<Show when={isSubscribed}>
				Subscribed <MdCheckCircle size={ICON_SIZE} />
			</Show>
			<Show when={!isSubscribed}>
				Subscribe <MdOutlineCheckCircle size={ICON_SIZE} />
			</Show>
		</Button>
	);
};
