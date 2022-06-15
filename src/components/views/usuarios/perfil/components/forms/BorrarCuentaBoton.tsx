import { useAuthContext } from '../../../../../../context/autenticacion/authState';
import { DeleteInfo } from '../../../../../utils';
const BorrarCuentaBoton = () => {
	const { cerrarSesion } = useAuthContext();
	async function eliminarCuenta() {
		DeleteInfo({
			title: '¿Estás seguro de eliminar tu cuenta?',
			text: 'No serás capz de recuperarla!',
			urlDelete: '/perfil/eliminarCuenta',
			callback() {
				localStorage.removeItem('persona');
				cerrarSesion();
			},
		});
	}
	return (
		<button className="btn btn-danger btn-block" onClick={eliminarCuenta}>
			Borrar cuenta
		</button>
	);
};

export default BorrarCuentaBoton;
