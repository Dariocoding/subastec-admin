import * as React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useAuthContext } from '../../../../../context/autenticacion/authState';
const BotonCerrarSesion = () => {
	const { cerrarSesion } = useAuthContext();
	return (
		<li>
			<span
				onClick={() => {
					Swal.fire({
						title: '¿Quieres cerrar la sesión?',
						showDenyButton: true,
						confirmButtonText: 'Cerrar Sesión',
					}).then(result => {
						if (result.isConfirmed) cerrarSesion();
					});
				}}
				className="app-menu__item"
			>
				<FaSignOutAlt className="app-menu__icon" />
				<span className="app-menu__label">Cerrar Sesión</span>
			</span>
		</li>
	);
};

export default React.memo(BotonCerrarSesion);
