import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/autenticacion/authState';
import { PermisosInterface } from './interfaces';
const useValidarPermisosPagina = ({ rolesPermisos, urlReturn }: PermisosInterface) => {
	const navigation = useNavigate();
	const { usuario } = useAuthContext();

	useEffect(() => {
		if (usuario.rol?.idrol) {
			if (!rolesPermisos.includes(usuario.rol.idrol)) {
				navigation('/admin' + urlReturn);
			}
		}
		// eslint-disable-next-line
	}, [usuario.rol?.idrol, navigation]);

	return { usuario };
};

export default useValidarPermisosPagina;
