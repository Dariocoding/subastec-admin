import { useAuthContext } from '../../../../../../context/autenticacion/authState';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IDSUPERADMINISTRADOR, validarFotoPerfil } from '../../../../../utils';

const laptop = require('../../../../../../Assets/images/laptop.jpg');

const InfoPerfil = () => {
	const { usuario } = useAuthContext();

	return (
		<div className="profile">
			<div className="info">
				<LazyLoadImage
					className="user-img rounded-circle"
					src={validarFotoPerfil(usuario)}
					alt="Foto Perfil"
					effect="blur"
				/>
				<h4>
					{usuario.nombres} {usuario.apellidos}
				</h4>
				<p>
					{usuario.iduser === IDSUPERADMINISTRADOR
						? 'Super Administrador'
						: usuario.rol?.nombrerol}
				</p>
			</div>
			<div
				className="cover-image"
				style={{ backgroundImage: `url(${laptop})` }}
			/>
		</div>
	);
};

export default InfoPerfil;
