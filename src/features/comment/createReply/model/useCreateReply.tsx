'use client';

import { createComment } from '@/entities/comment/api';
import { useCommentStore } from '@/entities/comment/model';
import { useChannelId } from '@/shared/lib';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export const useCreateReply = () => {
	const channelId = useChannelId();
	const [text, setText] = useState('');

	const videoId = Number(useParams<{ videoId: string }>()?.videoId ?? NaN);
	const parentCommentId = useCommentStore(state => state.parentCommentId);

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: () =>
			createComment({
				channelId,
				videoId,
				parentCommentId,
				text,
			}),

		onSuccess: () => {
			setText('');
			queryClient.invalidateQueries({ queryKey: ['repliesToComment'] });
			queryClient.invalidateQueries({ queryKey: ['comments'] });
		},
	});

	return {
		createReply: () => mutation.mutate(),
		...mutation,
		text,
		setText,
	};
};
