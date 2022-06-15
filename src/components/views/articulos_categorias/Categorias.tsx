import { FaTags } from 'react-icons/fa';
// COMPONENTS
import PageComponent from '../../layout/app/Content/PageComponent';
import DataTableCategoria from './components/tables/DataTableCategoria';
// HOOKS
import useValidarPermisosPagina from '../../../hooks/useValidarPermisosPagina';
import { RADMIN } from '../../utils';

const Categorias = () => {
	useValidarPermisosPagina({
		rolesPermisos: [RADMIN],
		urlReturn: '/home',
	});

	return (
		<PageComponent
			titulo={'Categorías'}
			Icon={FaTags}
			btnBackUrl={'/home'}
			btnBackText={'Ir a Inicio'}
			breadCrumb={[{ titulo: 'Categorías' }]}
		>
			<DataTableCategoria urlRequest={'/categorias'} />
		</PageComponent>
	);
};

export default Categorias;
