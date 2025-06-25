export interface SignUpCredentials {
	login: string;
	nickname: string;
	password: string;
	passwordConfirmation: string;
}

export interface SignUpResponse {
	login: string;
	userId: number;
}
