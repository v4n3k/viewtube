import axios from 'axios';

export const api = axios.create({
	baseURL: 'http://localhost:4200/api',
	withCredentials: true,
});

export const PAGINATION_LIMIT = 30;
