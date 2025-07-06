'use client';

import { createComment } from '@/entities/comment/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';

const channelId = 1;

export const useCreateComment = () => {
	const [text, setText] = useState('');

	const videoId = Number(useParams<{ videoId: string }>()?.videoId ?? NaN);
	const parentCommentId = Number(localStorage.getItem('parentCommentId'));

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
			queryClient.invalidateQueries({ queryKey: ['comments'] });
		},
	});

	return {
		createComment: () => mutation.mutate(),
		...mutation,
		text,
		setText,
	};
};
