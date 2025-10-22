'use client';

import { Button } from '@/shared/ui';
import {
	CategoryScale,
	Chart,
	ChartOptions,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
} from 'chart.js';
import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import styles from './TimeRangeChart.module.css';

Chart.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
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
}

interface TimeRangeButtonConfig {
	timeRange: TimeRange;
	label: string;
}

const TIME_RANGE_BUTTONS: TimeRangeButtonConfig[] = [
	{ timeRange: '24h', label: '24 hours' },
	{ timeRange: '7d', label: '7 days' },
	{ timeRange: '30d', label: '30 days' },
	{ timeRange: '90d', label: '90 days' },
	{ timeRange: 'All time', label: 'All time' },
];

const getLabelFormat = (range: TimeRange): Intl.DateTimeFormatOptions => {
	if (range === '24h') {
		return {
			hour: '2-digit',
			minute: '2-digit',
		};
	}
	return {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	};
};

export const TimeRangeChart = ({
	title,
	historicalData,
	selectedRange,
	onRangeChange,
	minDate,
	nonNegativeY = true,
}: TimeRangeChartProps) => {
	const dataAgeDays = useMemo(() => {
		if (!minDate) return Infinity;

		const now = new Date();
		const earliest = new Date(minDate);
		const diffMs = now.getTime() - earliest.getTime();

		return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
	}, [minDate]);

	const availableRangeButtons = useMemo(() => {
		return TIME_RANGE_BUTTONS.filter(btn => {
			switch (btn.timeRange) {
				case '7d':
					return dataAgeDays >= 7;
				case '30d':
					return dataAgeDays >= 30;
				case '90d':
					return dataAgeDays >= 90;
				default:
					return true;
			}
		});
	}, [dataAgeDays]);

	const lineChartData = useMemo(() => {
		if (!historicalData || historicalData.length === 0) {
			return { labels: [], datasets: [] };
		}

		let processedDataPoints: StatsDataPoint[];

		switch (selectedRange) {
			case '24h':
				processedDataPoints = historicalData.slice(-24);
				break;
			case '7d':
				processedDataPoints = historicalData.slice(-7);
				break;
			case '30d':
				processedDataPoints = historicalData.slice(-30);
				break;
			case '90d':
				processedDataPoints = historicalData.slice(-90);
				break;
			case 'All time':
			default:
				processedDataPoints = historicalData;
				break;
		}

		const labelFormat = getLabelFormat(selectedRange);

		const labels = processedDataPoints.map(d => {
			const date = new Date(d.timestamp);
			return date.toLocaleString('en-GB', labelFormat);
		});

		return {
			labels: labels,
			datasets: [
				{
					label: title,
					data: processedDataPoints.map(d => d.value),
					borderColor: 'rgb(75, 192, 192)',
					backgroundColor: 'rgba(75, 192, 192, 0.5)',
				},
			],
		};
	}, [selectedRange, historicalData, title]);

	const options: ChartOptions<'line'> = useMemo(
		() => ({
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: { position: 'top' as const },
				title: {
					display: true,
					text: `${title} | Range: ${
						selectedRange === 'All time' ? 'All available' : selectedRange
					}`,
				},
			},
			scales: {
				y: {
					beginAtZero: nonNegativeY,
					ticks: {
						precision: 0,
					},
				},
			},
		}),
		[title, selectedRange]
	);

	return (
		<article className={styles.timeRangeChart}>
			<div className={styles.rangeButtons}>
				{availableRangeButtons.map(btn => (
					<Button
						key={btn.timeRange}
						onClick={() => onRangeChange(btn.timeRange)}
						variant={selectedRange === btn.timeRange ? 'success' : 'primary'}
					>
						{btn.label}
					</Button>
				))}
			</div>

			<div className={styles.chartWrapper}>
				<Line options={options} data={lineChartData} />
			</div>
		</article>
	);
};
