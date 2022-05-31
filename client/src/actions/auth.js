import { BASE_URL } from '../utils';
import api from '../utils/api';
import { setAlert } from './alert';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
} from './types';

export const loadUser = () => async (dispatch) => {
	try {
		const res = await api.get(`${BASE_URL}/auth`);

		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (err) {
		dispatch({ type: AUTH_ERROR });
	}
};

export const register =
	({ name, email, githubusername, password }) =>
	async (dispatch) => {
		const body = { name, email, githubusername, password };

		try {
			const res = await api.post(`${BASE_URL}/api/users`, body);

			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});

			dispatch(loadUser());
		} catch (err) {
			const errors = err.response.data.errors;
			if (errors) {
				errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
			}

			dispatch({ type: REGISTER_FAIL });
		}
	};

export const login = (email, password) => async (dispatch) => {
	const body = { email, password };

	try {
		const res = await api.post(`${BASE_URL}/api/auth`, body);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});

		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({ type: LOGIN_FAIL });
	}
};

export const logout = () => (dispatch) => {
	dispatch({ type: LOGOUT });
};
