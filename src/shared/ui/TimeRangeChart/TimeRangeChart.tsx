'use client';

import { VideoMetricType } from '@/entities/video/api';
import { useTheme } from '@/features/theme/toggleTheme';
import { Button } from '@/shared/ui';
import {
	CategoryScale,
	Chart,
	ChartOptions,
	Filler,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
} from 'chart.js';
import { useEffect, useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import styles from './TimeRangeChart.module.css';

Chart.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Filler,
	Title,
	Tooltip,
	Legend
);

type TimeRange = '24h' | '7d' | '30d' | '90d' | 'All time';

export interface StatsDataPoint {
	timestamp: string;
	value: number;
}

interface TimeRangeChartProps {
	title: string;
	historicalData: StatsDataPoint[];
	minDate: string;
	selectedRange: TimeRange;
	onRangeChange: (range: TimeRange) => void;
	nonNegativeY?: boolean;
	metricType: VideoMetricType;
}

const TIME_RANGE_CONFIG: Record<TimeRange, { label: string; days?: number }> = {
	'24h': { label: '24 hours' },
	'7d': { label: '7 days', days: 7 },
	'30d': { label: '30 days', days: 30 },
	'90d': { label: '90 days', days: 90 },
	'All time': { label: 'All time' },
};

const getLabelFormat = (range: TimeRange): Intl.DateTimeFormatOptions => {
	return range === '24h'
		? { hour: '2-digit', minute: '2-digit' }
		: { year: 'numeric', month: 'short', day: 'numeric' };
};

const getCSSColor = (variable: string): string => {
	if (typeof window === 'undefined') return '';
	const value = getComputedStyle(document.documentElement)
		.getPropertyValue(variable)
		.trim();
	return value.startsWith('#') || value.startsWith('rgb') ? value : '';
};

const COLORS: Record<VideoMetricType, { line: string; fill: string }> = {
	like: { line: '--color-chart-like', fill: '--color-chart-like-fill' },
	dislike: {
		line: '--color-chart-dislike',
		fill: '--color-chart-dislike-fill',
	},
	view: { line: '--color-chart-view', fill: '--color-chart-view-fill' },
};

export const TimeRangeChart = ({
	title,
	historicalData,
	selectedRange,
	onRangeChange,
	minDate,
	nonNegativeY = true,
	metricType,
}: TimeRangeChartProps) => {
	const { theme } = useTheme();

	const [chartColors, setChartColors] = useState({
		line: '',
		fill: '',
		grid: '',
		text: '',
		title: '',
	});

	useEffect(() => {
		const { line, fill } = COLORS[metricType];

		setChartColors({
			line: getCSSColor(line),
			fill: getCSSColor(fill),
			grid: getCSSColor('--color-chart-grid'),
			text: getCSSColor('--color-chart-text'),
			title: getCSSColor('--color-chart-title'),
		});
	}, [theme, metricType]);

	const dataAgeDays = useMemo(() => {
		if (!minDate) return Infinity;

		const now = new Date();
		const earliest = new Date(minDate);
		const diffMs = now.getTime() - earliest.getTime();

		return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
	}, [minDate]);

	const availableRangeButtons = useMemo(() => {
		return Object.entries(TIME_RANGE_CONFIG)
			.filter(([, config]) => !config.days || dataAgeDays >= config.days)
			.map(([range, config]) => ({
				timeRange: range as TimeRange,
				label: config.label,
			}));
	}, [dataAgeDays]);

	const lineChartData = useMemo(() => {
		if (!historicalData?.length) {
			return { labels: [], datasets: [] };
		}

		let sliceCount: number | undefined;
		switch (selectedRange) {
			case '24h':
				sliceCount = 24;
				break;
			case '7d':
				sliceCount = 7;
				break;
			case '30d':
				sliceCount = 30;
				break;
			case '90d':
				sliceCount = 90;
				break;
			default:
				sliceCount = undefined;
		}

		const processedData = sliceCount
			? historicalData.slice(-sliceCount)
			: historicalData;

		const labelFormat = getLabelFormat(selectedRange);
		const labels = processedData.map(d =>
			new Date(d.timestamp).toLocaleString('en-GB', labelFormat)
		);

		return {
			labels,
			datasets: [
				{
					label: title,
					data: processedData.map(d => d.value),
					borderColor: chartColors.line,
					backgroundColor: chartColors.fill,
					borderWidth: 3,
					pointRadius: 2,
					pointHoverRadius: 4,
					pointHoverBorderWidth: 4,
					fill: true,
					tension: 0.3,
				},
			],
		};
	}, [selectedRange, historicalData, title, chartColors]);

	const options = useMemo<ChartOptions<'line'>>(
		() => ({
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					position: 'top',
					labels: {
						color: chartColors.text,
						font: { family: 'inherit' },
					},
				},
				title: {
					display: true,
					text: `${title} | Range: ${
						selectedRange === 'All time' ? 'All available' : selectedRange
					}`,
					color: chartColors.title,
					font: { size: 16, weight: 'bold', family: 'inherit' },
					padding: { top: 10, bottom: 20 },
				},
			},
			scales: {
				x: {
					grid: { color: chartColors.grid },
					ticks: {
						color: chartColors.text,
						font: { family: 'inherit' },
					},
				},
				y: {
					beginAtZero: nonNegativeY,
					ticks: {
						precision: 0,
						color: chartColors.text,
						font: { family: 'inherit' },
					},
					grid: { color: chartColors.grid },
				},
			},
		}),
		[title, selectedRange, nonNegativeY, chartColors]
	);

	return (
		<article className={styles.timeRangeChart}>
			<div className={styles.chartWrapper}>
				<Line options={options} data={lineChartData} />
			</div>
			<div className={styles.rangeButtons}>
				{availableRangeButtons.map(({ timeRange, label }) => (
					<Button
						key={timeRange}
						onClick={() => onRangeChange(timeRange)}
						variant={selectedRange === timeRange ? 'success' : 'primary'}
					>
						{label}
					</Button>
				))}
			</div>
		</article>
	);
};
