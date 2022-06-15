import { UserType } from '../../../components/views/usuarios/types';
export interface AuthInterface {
	at: string | null;
	rt: string | null;
	autenticado: boolean;
	usuario: UserType;
	mensaje: string;
	cargando: boolean;
	usuarioAutenticado?(): Promise<void>;
	cerrarSesion?(): Promise<void>;
}
