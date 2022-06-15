import { FaUserTag } from 'react-icons/fa';
// COMPONENTS
import PageComponent from '../../../layout/app/Content/PageComponent';
import DataTableUsuario from '../layout/DataTableUsuario';
// HOOKS
import useValidarPermisosPagina from '../../../../hooks/useValidarPermisosPagina';
import { RADMIN, RUSER } from '../../../utils';

const Usuarios = () => {
	useValidarPermisosPagina({
		rolesPermisos: [RADMIN],
		urlReturn: '/home',
	});

	return (
		<PageComponent
			titulo={'Usuarios'}
			Icon={FaUserTag}
			btnBackUrl={'/home'}
			btnBackText={'Ir al Inicio'}
			breadCrumb={[{ titulo: 'Usuarios' }]}
		>
			<DataTableUsuario
				idrol={RUSER}
				urlRequest={'/administradores/getUsuarios'}
			/>
		</PageComponent>
	);
};

export default Usuarios;
