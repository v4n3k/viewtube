'use client';

import { Button, Modal } from '@/shared/ui';
import styles from './ConfirmModal.module.css';

interface ConfirmModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	description: string;
	confirmButtonText?: string;
	cancelButtonText?: string;
	confirmButtonVariant?: 'primary' | 'secondary' | 'danger';
}

export const ConfirmModal = ({
	isOpen,
	onClose,
	onConfirm,
	title,
	description,
	confirmButtonText = 'Delete',
	cancelButtonText = 'Cancel',
	confirmButtonVariant = 'danger',
}: ConfirmModalProps) => {
	return (
		<Modal
			isOpen={isOpen}
			title={title}
			footer={
				<>
					<Button onClick={onClose}>{cancelButtonText}</Button>
					<Button variant={confirmButtonVariant} onClick={onConfirm}>
						{confirmButtonText}
					</Button>
				</>
			}
			onClose={onClose}
		>
			<p className={styles.modalDescription}>{description}</p>
		</Modal>
	);
};
