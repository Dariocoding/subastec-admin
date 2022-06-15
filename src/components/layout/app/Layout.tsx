import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import { useConfigContext } from '../../../context/configuracion/ConfigState';
import { useAuthContext } from '../../../context/autenticacion/authState';
import '../../../Assets/css/app.css';
import Header from './Header';
import { useLocation } from 'react-router-dom';

const Layout = () => {
	// Extraer la información de autenticación
	const { obtenerConfiguracion } = useConfigContext();
	const { usuarioAutenticado } = useAuthContext();
	const location = useLocation();
	useEffect(() => {
		Promise.allSettled([usuarioAutenticado(), obtenerConfiguracion()]);
		// eslint-disable-next-line
	}, []);

	if (location.pathname.substring(0, 6) !== '/admin') return;

	return (
		<>
			<ToastContainer position="bottom-right" theme="colored" />
			<Header />
		</>
	);
};

export default Layout;
