import { FaEye, FaPen, FaTrash, FaCoins } from 'react-icons/fa';
import Dropdown, { ButtonDropdown } from '../../../../layout/common/tables/Dropdown';
import { UserType } from '../../types';

interface IBotonesUsuarioProps {
	element: UserType;
	eliminarUsuario(id: number): void;
	editarUsuario(id: number): void;
	editarBids(id: number): void;
	viewUser(id: number): void;
}

const BotonesUsuario: React.FunctionComponent<IBotonesUsuarioProps> = props => {
	const { element } = props;
	const { iduser } = element;

	const handleUpdate = () => props.editarUsuario(iduser);
	const handleDelete = () => props.eliminarUsuario(iduser);
	const handleEditarBid = () => props.editarBids(iduser);
	const handleViewUser = () => props.viewUser(iduser);

	return (
		<Dropdown>
			<ButtonDropdown color={'primary'} onClick={handleViewUser}>
				<FaEye /> Ver Usuario
			</ButtonDropdown>
			<ButtonDropdown color="secondary" onClick={handleUpdate}>
				<FaPen /> Editar Usuario
			</ButtonDropdown>
			<ButtonDropdown color="danger" onClick={handleDelete}>
				<FaTrash /> Eliminar Usuario
			</ButtonDropdown>
			<ButtonDropdown color="info" onClick={handleEditarBid}>
				<FaCoins /> Añadir Remover BIds
			</ButtonDropdown>
		</Dropdown>
	);
};
export default BotonesUsuario;
