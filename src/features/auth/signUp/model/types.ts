export interface SignUpCredentials {
	username: string;
	email: string;
	password: string;
	passwordConfirmation: string;
}

export interface SignUpResponse {
	login: string;
	userId: number;
}
