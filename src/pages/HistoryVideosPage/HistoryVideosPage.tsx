'use client';

import { withAuth } from '@/features/auth/checkAuth';
import { HistoryVideosList } from '@/features/video/getHistoryVideos';

export const HistoryVideosPage = withAuth(() => {
	return <HistoryVideosList />;
});
