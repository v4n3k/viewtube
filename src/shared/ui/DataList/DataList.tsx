import { CircularLoader, Show } from '@/shared/ui';
import clsx from 'clsx';
import { ComponentType } from 'react';
import styles from './DataList.module.css';

type Identifiable = {
	id: string | number;
};

export interface DataListProps<T extends Identifiable> {
	title?: string;
	items: T[] | undefined;
	isLoading?: boolean;
	isError?: boolean;
	error?: Error | null;
	layout?: 'grid' | 'verticalList';
	gap?: 'lg' | 'xl';
	ItemComponent: ComponentType<{ item: T } & Record<string, any>>;
	dataName?: 'items' | 'videos' | 'channels';
	emptyMessage?: string;
}

export const DataList = <T extends Identifiable>({
	title,
	items,
	isLoading,
	isError,
	error,
	layout = 'grid',
	gap = 'lg',
	ItemComponent,
	dataName = 'items',
	emptyMessage,
}: DataListProps<T>) => {
	const displayEmptyMessage = emptyMessage ?? `No ${dataName} found`;

	return (
		<section className={styles.dataListSection}>
			<Show when={title}>
				<h2 className={styles.title}>{title}</h2>
			</Show>

			<Show when={isLoading}>
				<CircularLoader paddingY='60px' />
			</Show>

			<Show when={isError}>
				<span className={styles.errorMessage}>
					Error fetching {dataName}: {error?.message}
				</span>
			</Show>

			<Show when={!isLoading && !isError && !items?.length}>
				<span className={styles.errorMessage}>{displayEmptyMessage}</span>
			</Show>

			<Show when={items?.length && !isLoading && !isError}>
				<ul className={clsx(styles.list, styles[layout], styles[`gap-${gap}`])}>
					{items?.map(item => (
						<ItemComponent key={item.id} item={item} />
					))}
				</ul>
			</Show>
		</section>
	);
};
