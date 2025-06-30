import clsx from 'clsx';
import { CSSProperties } from 'react';
import styles from './CircularLoader.module.css';

interface CircularLoaderProps {
	className?: string;
	onFullScreen?: boolean;
	paddingY?: string;
}

export const CircularLoader = ({
	className,
	onFullScreen,
	paddingY = '0px',
}: CircularLoaderProps) => {
	const style = {
		'--padding-y': paddingY,
	} as CSSProperties;

	return (
		<div
			className={clsx(
				styles.circularLoader,
				onFullScreen ? styles.onFullScreen : '',
				className
			)}
			style={style}
			role='progressbar'
		>
			<svg
				className={styles.loaderSvg}
				viewBox='22 22 44 44'
				width='32'
				height='32'
			>
				<circle
					className={styles.loaderCircle}
					cx='44'
					cy='44'
					r='20'
					fill='none'
					strokeWidth='4'
				/>
			</svg>
		</div>
	);
};
