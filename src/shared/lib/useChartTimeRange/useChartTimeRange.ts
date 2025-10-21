'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type TimeRange = '24h' | '7d' | '30d' | '90d' | 'All time';

const MS_PER_DAY = 24 * 60 * 60 * 1000;

const getInitialRange = (ageInDays: number): TimeRange => {
	if (ageInDays >= 90) return '90d';
	if (ageInDays >= 30) return '30d';
	if (ageInDays >= 7) return '7d';
	return '24h';
};

const roundToNearestMinute = (date: Date): Date => {
	const rounded = new Date(date);
	rounded.setSeconds(0, 0);
	return rounded;
};

export const useChartTimeRange = (createdAt: Date | undefined) => {
	const [selectedRange, setSelectedRange] = useState<TimeRange>('24h');
	const hasAutoSelectedRange = useRef(false);

	useEffect(() => {
		if (!hasAutoSelectedRange.current && createdAt) {
			const age = Math.max(
				0,
				Math.ceil((Date.now() - createdAt.getTime()) / MS_PER_DAY)
			);
			setSelectedRange(getInitialRange(age));
			hasAutoSelectedRange.current = true;
		}
	}, [createdAt]);

	const { startDate, endDate } = useMemo(() => {
		const now = roundToNearestMinute(new Date());
		const nowIso = now.toISOString();
		const createdAtIso = createdAt?.toISOString();

		if (selectedRange === 'All time') {
			return {
				startDate: createdAtIso || nowIso,
				endDate: nowIso,
			};
		}

		let start: Date;
		switch (selectedRange) {
			case '24h':
				start = new Date(now.getTime() - MS_PER_DAY);
				break;
			case '7d':
				start = new Date(now.getTime() - 7 * MS_PER_DAY);
				break;
			case '30d':
				start = new Date(now.getTime() - 30 * MS_PER_DAY);
				break;
			case '90d':
				start = new Date(now.getTime() - 90 * MS_PER_DAY);
				break;
			default:
				start = new Date(now.getTime() - 30 * MS_PER_DAY);
		}

		const roundedStart = roundToNearestMinute(start);

		return {
			startDate: roundedStart.toISOString(),
			endDate: nowIso,
		};
	}, [selectedRange, createdAt]);

	return {
		selectedRange,
		setSelectedRange,
		startDate,
		endDate,
	};
};
