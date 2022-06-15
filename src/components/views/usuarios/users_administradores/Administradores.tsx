import { FaUserTie } from 'react-icons/fa';

// COMPONENTS
import PageComponent from '../../../layout/app/Content/PageComponent';
// HOOKS
import useValidarPermisosPagina from '../../../../hooks/useValidarPermisosPagina';
import DataTableUsuario from '../layout/DataTableUsuario';
import { RADMIN } from '../../../utils';

const Administradores = () => {
	useValidarPermisosPagina({
		rolesPermisos: [RADMIN],
		urlReturn: '/home',
	});

	return (
		<PageComponent
			titulo={'Administradores'}
			Icon={FaUserTie}
			btnBackUrl={'/home'}
			btnBackText={'Ir al Inicio'}
			breadCrumb={[{ titulo: 'Administradores' }]}
		>
			<DataTableUsuario
				idrol={RADMIN}
				urlRequest={'/administradores/getAdministradores'}
			/>
		</PageComponent>
	);
};

export default Administradores;
