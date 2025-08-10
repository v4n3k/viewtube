import { Button } from '@/shared/ui';
import { ComponentProps } from 'react';

interface SignUpButtonProps extends ComponentProps<typeof Button> {}

export const SignUpButton = ({ ...props }: SignUpButtonProps) => {
	return (
		<Button type='submit' {...props}>
			Sign Up
		</Button>
	);
};
