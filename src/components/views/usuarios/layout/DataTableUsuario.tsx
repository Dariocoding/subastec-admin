import { FaPlus } from 'react-icons/fa';
import { handleError, DeleteInfo, RADMIN } from '../../../utils';
import clienteAxios from '../../../../config/axios';

// COMPONENTS
import HeadingTableAdmin from './HeadingTableAdmin';
import HeadingTableUsuario from './HeadingTableUsuario';
import DataTable from '../../../layout/common/tables/datatable';
import MapDataUsuarios from '../users_usuarios/components/MapDataUsuarios';
import MapDataAdministradores from '../users_administradores/components/MapDataAdministradores';
import ContentEditarUsuario from './ContentEditarUsuario';
import FormularioCrearUsuario from '../forms/FormularioCrearUsuario';
import FormEditarBidsUsers from '../forms/FormEditarBidsUsers';

// HOOKS
import { useLoader } from '../../../../context/loaderpage/LoaderPageState';
import { useModal } from '../../../../context/modal/ModalState';
import useRequestData from '../../../../hooks/useRequestData';
import { UserType, UserTypeTable } from '../types';
import ModalUsuarioPerfil from './ModalUsuarioPerfil';

interface IDataTableUsuarioProps {
	idrol: number;
	urlRequest: string;
	titulo?: React.ReactNode;
}

const DataTableUsuario: React.FunctionComponent<IDataTableUsuarioProps> = props => {
	const { idrol, urlRequest, titulo } = props;
	const isAdmin = idrol === RADMIN;
	const { setLoader } = useLoader();
	const { setModal } = useModal();
	const [data, cargando, , setDatos] = useRequestData<UserTypeTable[]>([], {
		url: urlRequest,
	});

	function crearUsuario(titulo: string) {
		const addUser = (user: UserType) => setDatos([user, ...data]);
		setModal({
			titulo,
			bgHeader: 'primary',
			content: <FormularioCrearUsuario idrol={idrol} addUser={addUser} />,
			size: 'md',
		});
	}

	async function editarUsuario(id: number) {
		try {
			setLoader(true, 'Cargando usuario...');
			const titulo = isAdmin ? 'Editar Administrador' : 'Editar Usuario';
			const url = `/administradores/getUsuarioByRolAndId/${id}/${idrol}`;
			const request = await clienteAxios(url);
			const editUser = (user: UserType) =>
				setDatos(data.map(u => (u.iduser === user.iduser ? user : u)));
			setModal({
				bgHeader: 'secondary',
				content: (
					<ContentEditarUsuario
						usuario={request.data}
						editUser={editUser}
					/>
				),
				size: 'xl',
				titulo,
			});
		} catch (e) {
			handleError(e);
		} finally {
			setLoader(false);
		}
	}

	async function editarBids(id: number) {
		try {
			setLoader(true, 'Cargando usuario...');
			const url = `/administradores/getUsuarioByRolAndId/${id}/${idrol}`;
			const request = await clienteAxios(url);
			const user = request.data as UserType;

			const editBitsUser = (bids: number) => {
				setDatos(
					data.map(u => {
						return u.iduser === user.iduser
							? { ...u, bids }
							: u;
					})
				);
			};

			setModal({
				bgHeader: 'secondary',
				content: (
					<FormEditarBidsUsers
						usuario={request.data}
						editBitsUser={editBitsUser}
					/>
				),
				size: 'md',
				titulo: 'Editar Bids',
			});
		} catch (e) {
			handleError(e);
		} finally {
			setLoader(false);
		}
	}

	function eliminarUsuario(idpersona: number) {
		let titulo: string;
		if (isAdmin) titulo = '¿Estás seguro de eliminar este administrador?';
		else titulo = '¿Estás seguro de eliminar este usuario?';

		DeleteInfo({
			title: titulo,
			text: 'No serás capz de recuperarlo!',
			urlDelete: `/administradores/${idpersona}`,
			callback() {
				setDatos(data.filter(d => d.iduser !== idpersona));
			},
		});
	}

	async function viewUser(idpersona: number) {
		try {
			setLoader(true, 'Cargando usuario...');
			const url = `/administradores/getUsuarioByRolAndId/${idpersona}/${idrol}`;
			const request = await clienteAxios(url);
			const user = request.data as UserType;

			setModal({
				bgHeader: 'secondary',
				content: <ModalUsuarioPerfil persona={request.data} />,
				size: 'md',
				titulo: 'Ver Usuario',
			});
		} catch (e) {
			handleError(e);
		} finally {
			setLoader(false);
		}
	}

	const map = isAdmin ? MapDataAdministradores : MapDataUsuarios;

	const HeadingTable = isAdmin ? HeadingTableAdmin : HeadingTableUsuario;

	return (
		<DataTable
			data={map({ data, eliminarUsuario, editarBids, editarUsuario, viewUser })}
			heading={HeadingTable}
			loading={cargando}
			titulo={titulo}
			buttonHeader={
				<button
					className="btn btn-secondary btn-sm"
					onClick={() => {
						const title = isAdmin
							? 'Crear Administrador'
							: 'Crear Usuario';
						crearUsuario(title);
					}}
				>
					<FaPlus />
				</button>
			}
		/>
	);
};

export default DataTableUsuario;
