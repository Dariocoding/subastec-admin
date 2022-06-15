import { OBTENER_USUARIO, LOGIN_ERROR, CERRAR_SESION } from '../types';
import { AuthInterface } from './interfaces';

const authReducer = (state: AuthInterface, action: { type: string; payload?: any }) => {
	switch (action.type) {
		case OBTENER_USUARIO:
			return {
				...state,
				autenticado: true,
				usuario: action.payload.usuario,
				cargando: false,
			};
		case CERRAR_SESION:
		case LOGIN_ERROR:
			return {
				...state,
				usuario: {},
				autenticado: false,
				mensaje: action.payload,
				cargando: false,
			};

		default:
			return state;
	}
};

export default authReducer;
