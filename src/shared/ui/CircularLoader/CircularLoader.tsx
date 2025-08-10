import clsx from 'clsx';
import { CSSProperties } from 'react';
import styles from './CircularLoader.module.css';

interface CircularLoaderProps {
	className?: string;
	onFullScreen?: boolean;
	fullWidth?: boolean;
	paddingY?: string;
	size?: 's' | 'm';
	color?: 'grey' | 'contrast';
}

export const CircularLoader = ({
	className,
	onFullScreen = false,
	fullWidth = true,
	paddingY = '0px',
	size = 'm',
	color = 'grey',
}: CircularLoaderProps) => {
	const containerStyle = {
		'--padding-y': paddingY,
	} as CSSProperties;

	const strokeColor =
		color === 'grey' ? 'var(--color-secondary)' : 'var(--color-text)';

	const circleStyle = {
		stroke: strokeColor,
	} as CSSProperties;

	return (
		<div
			className={clsx(
				styles.circularLoader,
				{
					[styles.onFullScreen]: onFullScreen,
					[styles.fullWidth]: fullWidth,
				},
				className
			)}
			style={containerStyle}
			role='progressbar'
			aria-label='Loading'
		>
			<svg
				className={clsx(styles.loaderSvg, styles[`size-${size}`])}
				viewBox='22 22 44 44'
			>
				<circle
					className={clsx(styles.loaderCircle, styles[`circleSize-${size}`])}
					cx='44'
					cy='44'
					r='20'
					fill='none'
					style={circleStyle}
				/>
			</svg>
		</div>
	);
};
