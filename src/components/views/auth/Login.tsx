import { useState, useEffect, useContext, Fragment } from 'react';
import { toast } from 'react-toastify';
import { FaUser, FaUnlock } from 'react-icons/fa';
import authContext from '../../../context/autenticacion/authContext';
// COMPONENTS
import AuthComponent from './components/layout/AuthComponent';
import FrmLogin from './components/forms/FrmLogin';
import FrmPersona from './components/forms/FrmPersona';
import InformacionPersona from './components/layout/InformacionPersona';
import FrmForget from './components/forms/FrmForget';
import { useNavigate } from 'react-router-dom';
import { UserType } from '../usuarios/types';

const Login = () => {
	const navigate = useNavigate();
	const { autenticado, mensaje, usuarioAutenticado } = useContext(authContext);
	const [persona, setPersona] = useState<UserType>(
		JSON.parse(localStorage.getItem('persona'))
	);
	const [forgetForm, setForgetForm] = useState(false);
	const toggleForgetForm = () => setForgetForm(!forgetForm);

	useEffect(() => {
		autenticado ? navigate('/admin/home') : usuarioAutenticado();
		// eslint-disable-next-line
	}, [autenticado, navigate]);

	useEffect(() => {
		if (mensaje) toast.success(mensaje);
	}, [mensaje]);

	const validacionPersona = persona && persona.nombres ? true : false;

	const titulo = forgetForm ? 'Recuperar Contraseña' : 'Iniciar Sesión';

	return (
		<AuthComponent
			titulo={persona ? null : titulo}
			Icon={!forgetForm ? FaUser : FaUnlock}
		>
			{validacionPersona ? (
				<Fragment>
					<InformacionPersona persona={persona} />
					<FrmPersona persona={persona} setPersona={setPersona} />
				</Fragment>
			) : forgetForm ? (
				<FrmForget toggleForgetForm={toggleForgetForm} />
			) : (
				<FrmLogin toggleForgetForm={toggleForgetForm} />
			)}
		</AuthComponent>
	);
};

export default Login;
