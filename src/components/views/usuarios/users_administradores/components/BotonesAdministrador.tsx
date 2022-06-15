import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaPen, FaTrash } from 'react-icons/fa';
import Dropdown, { ButtonDropdown } from '../../../../layout/common/tables/Dropdown';
import authContext from '../../../../../context/autenticacion/authContext';
import { UserType } from '../../types';
import { IDSUPERADMINISTRADOR } from '../../../../utils';

interface IBotonesUsuarioProps {
	element: UserType;
	eliminarUsuario(id: number): void;
	editarUsuario(id: number): void;
	viewUser(id: number): void;
}

const BotonesAdministrador: React.FunctionComponent<IBotonesUsuarioProps> = props => {
	const { element } = props;
	const { usuario } = useContext(authContext);
	const { iduser } = element;
	const validacion = iduser === IDSUPERADMINISTRADOR || usuario.iduser === iduser;

	if (validacion) return null;

	const handleUpdate = () => props.editarUsuario(iduser);
	const handleDelete = () => props.eliminarUsuario(iduser);
	const hadleViewUser = () => props.viewUser(iduser);

	return (
		<Dropdown>
			<ButtonDropdown color="primary" onClick={hadleViewUser}>
				<FaEye /> Ver Administrador
			</ButtonDropdown>

			<ButtonDropdown color="info" onClick={handleUpdate}>
				<FaPen /> Editar Administrador
			</ButtonDropdown>

			<ButtonDropdown color="danger" onClick={handleDelete}>
				<FaTrash /> Eliminar administrador
			</ButtonDropdown>
		</Dropdown>
	);
};

export default BotonesAdministrador;
