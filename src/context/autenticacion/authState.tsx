import { useReducer, useState, useContext } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import clienteAxios from '../../config/axios';
import axios from 'axios';
import tokenAuth from '../../config/token';

import { OBTENER_USUARIO, LOGIN_ERROR, CERRAR_SESION } from '../types';
import { AuthInterface, initialValueStateAuth } from './interfaces';

interface IAuthState {
	children: React.ReactNode;
}

const AuthState: React.FunctionComponent<IAuthState> = props => {
	const [askingIsAuthenticated, setAskingIsAuthenticated] = useState(false);
	const { REACT_APP_BACKEND_URL } = process.env;

	const [state, dispatch] = useReducer(AuthReducer, initialValueStateAuth);

	function handleErrorAuth(mensaje?: string) {
		dispatch({
			type: LOGIN_ERROR,
			payload: mensaje,
		});
	}

	// Retorna el usuario autenticado
	const usuarioAutenticado = async () => {
		if (askingIsAuthenticated) return;

		// auth Token
		const at = localStorage.getItem('at');
		const rt = localStorage.getItem('rt');
		if (at) tokenAuth(at);
		// Refresh token

		try {
			if (!rt) return handleErrorAuth();

			setAskingIsAuthenticated(true);
			const urlRefresh = REACT_APP_BACKEND_URL + '/auth/refresh';
			const headers = {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${rt}`,
			};

			const { data } = await axios.get(urlRefresh, {
				headers,
			});

			if (data.user.status !== 1)
				return handleErrorAuth(
					'Tu cuenta ha sido inactiva temporalmente, comunícate con el soporte'
				);

			const { user, access_token, refresh_token } = data;
			const payload = { usuario: user, at: access_token, rt: refresh_token };
			dispatch({ type: OBTENER_USUARIO, payload });
			localStorage.setItem('at', data.access_token);
			localStorage.setItem('rt', data.refresh_token);
			tokenAuth(data.access_token);
		} catch (error) {
			handleErrorAuth();
		} finally {
			setAskingIsAuthenticated(false);
		}
	};

	// Cierra la sesión del usuario
	const cerrarSesion = async () => {
		localStorage.removeItem('at');
		localStorage.removeItem('rt');
		await clienteAxios.post('/auth/logout');
		dispatch({
			type: CERRAR_SESION,
			payload: 'Se ha cerrado la sesión',
		});
		tokenAuth(null);
	};

	const valuesProvider: AuthInterface = {
		at: state.at,
		rt: state.rt,
		autenticado: state.autenticado,
		usuario: state.usuario,
		mensaje: state.mensaje,
		cargando: state.cargando,
		usuarioAutenticado,
		cerrarSesion,
	};

	return <AuthContext.Provider value={valuesProvider}>{props.children}</AuthContext.Provider>;
};

export default AuthState;

export const useAuthContext = (): AuthInterface => useContext(AuthContext);
