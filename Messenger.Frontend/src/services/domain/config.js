/* eslint-disable no-undef */
import axios from 'axios';

import { Token } from './token';

const axiosInstanse = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	withCredentials: true,
	headers: {
		Authorization: `Bearer ${Token.get() || ''}`,
	},
});

export default axiosInstanse;
