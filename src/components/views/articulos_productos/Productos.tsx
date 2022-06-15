import { FaBoxes } from 'react-icons/fa';

// COMPONENTS
import PageComponent from '../../layout/app/Content/PageComponent';
import DataTableProducto from './components/table/DataTableProductos';
// HOOKS
import useValidarPermisosPagina from '../../../hooks/useValidarPermisosPagina';
import { RADMIN } from '../../utils';

const Productos = () => {
	useValidarPermisosPagina({
		rolesPermisos: [RADMIN],
		urlReturn: '/home',
	});

	return (
		<PageComponent
			titulo={'Articulos'}
			descripcion={'¡Administra los articulos de subastec!'}
			Icon={FaBoxes}
			btnBackUrl={'/home'}
			btnBackText={'Ir al Inicio'}
			breadCrumb={[{ titulo: 'Productos' }]}
		>
			<DataTableProducto urlRequest={'/productos'} />
		</PageComponent>
	);
};

export default Productos;
