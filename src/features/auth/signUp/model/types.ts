export interface SignUpCredentials {
	login: string;
	email: string;
	password: string;
	passwordConfirmation: string;
}

export interface SignUpResponse {
	login: string;
	userId: number;
}
