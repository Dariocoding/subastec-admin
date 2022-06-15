import { FaPaperPlane, FaEye } from 'react-icons/fa';
import clienteAxios from '../../../config/axios';

// COMPONENTS
import DataTable from '../../layout/common/tables/datatable';
import PageComponent from '../../layout/app/Content/PageComponent';

// HOOKS
import useValidarPermisosPagina from '../../../hooks/useValidarPermisosPagina';
import useRequestData from '../../../hooks/useRequestData';
import { useLoader } from '../../../context/loaderpage/LoaderPageState';
import { useModal } from '../../../context/modal/ModalState';
import { RADMIN } from '../../utils';
import { ContactoTableType, ContactoType } from './types';
import { HeadDataTable } from '../../layout/common/tables/datatable/interfaces';
import ModalContacto from './ModalContacto';
import moment from 'moment-timezone';

const Contactos = () => {
	const { setModal } = useModal();
	const { setLoader } = useLoader();

	useValidarPermisosPagina({
		rolesPermisos: [RADMIN],
		urlReturn: '/home',
	});

	const [contactos, cargando] = useRequestData<ContactoTableType[]>([], {
		url: '/contactos',
	});

	function Map() {
		return contactos.map(item => {
			item.options = (
				<button
					className="btn btn-primary"
					onClick={() => obtenerContacto(item.id)}
				>
					<FaEye />
				</button>
			);
			item.datecreatedFormated = moment(item.date_created).format('DD/MM/YYYY');
			return item;
		});
	}

	const Heading: HeadDataTable[] = [
		{ name: 'ID', dataKey: 'id' },
		{ name: 'Nombre', dataKey: 'nombre', center: true },
		{ name: 'Correo', dataKey: 'email', center: true },
		{ name: 'Fecha', dataKey: 'datecreatedFormated', center: true },
		{ name: 'Acciones', dataKey: 'options', center: true },
	];

	async function obtenerContacto(id: number) {
		try {
			setLoader(true, 'Cargando contacto...');
			const request = await clienteAxios('/contactos/' + id);
			const contacto = request.data as ContactoType;
			setModal({
				titulo: 'Contacto',
				bgHeader: 'primary',
				size: 'md',
				content: <ModalContacto contacto={contacto} />,
			});
		} catch (error) {
		} finally {
			setLoader(false);
		}
	}

	return (
		<PageComponent
			titulo={'Contactos'}
			Icon={FaPaperPlane}
			btnBackUrl={'/settings'}
			btnBackText={'Ir a configuraciones'}
			breadCrumb={[
				{ titulo: 'Configuración', link: '/settings' },
				{ titulo: 'Contactos' },
			]}
		>
			<DataTable data={Map()} heading={Heading} loading={cargando} />
		</PageComponent>
	);
};

export default Contactos;
