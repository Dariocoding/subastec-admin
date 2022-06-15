import { useContext } from 'react';
import { FaUserCircle, FaLock, FaTrash } from 'react-icons/fa';
import authContext from '../../../../../../context/autenticacion/authContext';
import CambiarFotoDePerfil from '../forms/CambiarFotoDePerfil';
import TabContent from './TabContent';
import FormularioPutPerfil from '../forms/FormularioPutPerfil';
import FormularioCambiarPassword from '../forms/FormularioCambiarPassword';
import BorrarCuentaBoton from '../forms/BorrarCuentaBoton';
import { IDSUPERADMINISTRADOR } from '../../../../../utils';

interface ITabContentsProps {
	itemActual: string;
}
const TabContents: React.FunctionComponent<ITabContentsProps> = ({ itemActual }) => {
	const { usuario, usuarioAutenticado, cerrarSesion } = useContext(authContext);
	const tabs = [
		{
			Icon: FaUserCircle,
			itemActual: 'Cambiar Foto de Perfil',
			content: <CambiarFotoDePerfil />,
			validation: true,
		},
		{
			Icon: FaUserCircle,
			itemActual: 'Datos Personales',
			content: <FormularioPutPerfil />,
			validation: true,
		},
		{
			Icon: FaLock,
			itemActual: 'Cambiar Contraseña',
			content: <FormularioCambiarPassword />,
			validation: true,
		},
		{
			Icon: FaTrash,
			itemActual: 'Eliminar Cuenta',
			content: <BorrarCuentaBoton />,
			validation: usuario.iduser !== IDSUPERADMINISTRADOR,
		},
	];

	return (
		<div className="tab-content">
			{tabs.map(
				tab =>
					tab.itemActual === itemActual &&
					tab.validation && (
						<TabContent {...tab} key={tab.itemActual} />
					)
			)}
		</div>
	);
};

export default TabContents;
