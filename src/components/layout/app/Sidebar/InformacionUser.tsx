import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useAuthContext } from '../../../../context/autenticacion/authState';
import { IDSUPERADMINISTRADOR, validarFotoPerfil } from '../../../utils';
const InformacionUser = () => {
	const { usuario } = useAuthContext();
	return (
		<div className="app-sidebar__user">
			<LazyLoadImage
				className="app-sidebar__user-avatar rounded-circle"
				src={validarFotoPerfil(usuario)}
				alt="Foto Perfil"
				effect="blur"
			/>
			<div>
				<p className="app-sidebar__user-name">
					{usuario?.nombres && usuario.nombres.prefix()} <br />
					{usuario?.apellidos && usuario.apellidos.prefix()}
				</p>
				<p className="app-sidebar__user-designation">
					{usuario?.iduser === IDSUPERADMINISTRADOR
						? 'Super Administrador'
						: usuario?.rol?.nombrerol}
				</p>
			</div>
		</div>
	);
};

export default InformacionUser;
