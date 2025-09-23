import { PATH_GENERATORS } from '@/app/routes';
import { formatDate } from '@/entities/video/lib';
import { Avatar, Button } from '@/shared/ui';
import { TrashIcon } from '@/shared/ui/icons';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { FaCheck } from 'react-icons/fa6';
import { Channel } from '../../model';
import styles from './MyChannelCard.module.css';

interface MyChannelCardProps {
	channel: Channel;
	isSelected: boolean;
	onSelect: (channelId: number) => void;
	onDelete: (channelId: number) => void;
}

export const MyChannelCard = ({
	channel,
	isSelected,
	onSelect,
	onDelete,
}: MyChannelCardProps) => {
	const router = useRouter();

	const {
		id,
		name,
		description,
		avatarUrl,
		videosCount,
		subscribersCount,
		createdAt,
	} = channel;

	const handleCardClick = () => {
		router.push(PATH_GENERATORS.channel(id));
	};

	const handleSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		onSelect(id);
	};

	const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		onDelete(id);
	};

	return (
		<li
			className={clsx(styles.channelCard, { [styles.selected]: isSelected })}
			onClick={handleCardClick}
		>
			<div className={styles.content}>
				<div className={styles.main}>
					<Avatar className={styles.avatar} src={avatarUrl} />
					<div className={styles.details}>
						<h2 className={styles.name}>{name}</h2>
						<ul className={styles.stats}>
							<li className={styles.statItem}>
								{subscribersCount} subscribers
							</li>
							<li className={styles.statItem}>{videosCount} videos</li>
						</ul>
						<p className={styles.createdAt}>
							Created at {formatDate(new Date(createdAt))}
						</p>
					</div>
				</div>

				<p className={styles.description}>{description}</p>

				<div className={styles.actions}>
					<Button
						className={styles.actionButton}
						variant={isSelected ? 'success' : 'primary'}
						onClick={handleSelect}
					>
						<FaCheck className={styles.buttonIcon} />
						{isSelected ? 'Selected' : 'Select'}
					</Button>

					<Button
						background='outlined'
						variant='danger'
						onClick={handleDelete}
						className={styles.actionButton}
					>
						<TrashIcon className={styles.buttonIcon} />
						Delete
					</Button>
				</div>
			</div>
		</li>
	);
};
