import { validarFotoPerfil } from '../../../../utils';
import { UserTypeTable } from '../../types';
import BotonesUsuario from './BotonesUsuario';

interface IMapDataUsuarioProps {
	data: UserTypeTable[];
	eliminarUsuario(id: number): void;
	editarUsuario(id: number): void;
	editarBids(id: number): void;
	viewUser(id: number): void;
}

const MapDataUsuarios = (props: IMapDataUsuarioProps) => {
	const { data } = props;
	const newData = data.map(item => {
		item.options = (
			<BotonesUsuario
				element={item}
				eliminarUsuario={props.eliminarUsuario}
				editarUsuario={props.editarUsuario}
				editarBids={props.editarBids}
				viewUser={props.viewUser}
			/>
		);

		item.fotoperfilHtml = (
			<img
				width={45}
				style={{ borderRadius: '50%' }}
				height={45}
				src={validarFotoPerfil(item)}
				alt="Imagen foto Perfil"
			/>
		);

		return item;
	});
	return newData;
};

export default MapDataUsuarios;
