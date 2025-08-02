import { Button } from '@/shared/ui';
import { SignUpCredentials, useSignUp } from '../model';

interface SignUpButtonProps {
	credentials: SignUpCredentials;
}

export const SignUpButton = ({ credentials }: SignUpButtonProps) => {
	const { signUp } = useSignUp(credentials);

	return <Button onClick={signUp}>Sign Up</Button>;
};
