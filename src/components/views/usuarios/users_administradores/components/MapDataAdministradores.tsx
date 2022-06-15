import { validarFotoPerfil } from '../../../../utils';
import { UserTypeTable } from '../../types';
import BotonesAdministrador from './BotonesAdministrador';

interface IMapDataAdministradores {
	data: UserTypeTable[];
	eliminarUsuario(id: number): void;
	editarUsuario(id: number): void;
	editarBids(id: number): void;
	viewUser(id: number): void;
}
const MapDataAdministradores = (props: IMapDataAdministradores) => {
	const { data } = props;
	const newData = data.map(item => {
		item.options = (
			<BotonesAdministrador
				element={item}
				eliminarUsuario={props.eliminarUsuario}
				editarUsuario={props.editarUsuario}
				viewUser={props.viewUser}
			/>
		);

		item.fotoperfilHtml = (
			<img
				width={45}
				style={{ borderRadius: '50%' }}
				height={45}
				src={validarFotoPerfil(item)}
				alt="Imagen Foto Perfil"
			/>
		);

		return item;
	});
	return newData;
};

export default MapDataAdministradores;
