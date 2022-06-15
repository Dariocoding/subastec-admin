import { AuthInterface } from './auth.interface';

export const initialValueStateAuth: AuthInterface = {
	at: localStorage.getItem('at'),
	rt: localStorage.getItem('rt'),
	autenticado: false,
	usuario: {},
	mensaje: null,
	cargando: true,
};
