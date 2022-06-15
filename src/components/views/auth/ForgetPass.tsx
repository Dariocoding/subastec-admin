import { useState, useEffect, useContext } from 'react';
import { FaUnlockAlt } from 'react-icons/fa';
import clienteAxios from '../../../config/axios';
import authContext from '../../../context/autenticacion/authContext';

// COMPONENTS
import AuthComponent from './components/layout/AuthComponent';
import FrmRecuperar from './components/forms/FrmRecuperar';

import { useNavigate, useParams } from 'react-router-dom';

const ForgetPass = () => {
	const navigate = useNavigate();
	const { correo, token } = useParams();
	const { autenticado, usuarioAutenticado } = useContext(authContext);
	const [usuario, setUsuario] = useState(null);

	const STATE_INICIAL = {
		password: '',
		passwordConfirm: '',
		email_user: correo.trim().toLowerCase(),
		token: token,
	};

	useEffect(() => {
		autenticado ? navigate('/admin/home') : usuarioAutenticado();
		// eslint-disable-next-line
	}, [autenticado, navigate]);

	useEffect(() => {
		obtenerUsuario();
		// eslint-disable-next-line
	}, []);

	async function obtenerUsuario() {
		try {
			const url = `/usuarios/verificarUsuarioCorreoAndToken/${correo
				.trim()
				.toLowerCase()}/${token}`;
			const response = await clienteAxios.get(url);

			setUsuario(response.data.usuario);
		} catch (error) {
			navigate('/');
		}
	}

	return (
		<AuthComponent titulo={'Recuperar Contraseña'} Icon={FaUnlockAlt}>
			<FrmRecuperar STATE_INICIAL={STATE_INICIAL} usuario={usuario} />
		</AuthComponent>
	);
};

export default ForgetPass;
