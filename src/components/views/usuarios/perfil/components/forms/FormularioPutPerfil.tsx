import { useContext } from 'react';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';
import { handleError } from '../../../../../utils';
import clienteAxios from '../../../../../../config/axios';
import validarUsuario from '../../../validations/validarUsuario';

// COMPONENTS
import { Input, Button } from '../../../../../layout/common/forms';

// CONTEXT
import authContext from '../../../../../../context/autenticacion/authContext';
import { UserType } from '../../../types';

const FormularioPutPerfil = () => {
	const { usuarioAutenticado, usuario } = useContext(authContext);
	const INITIAL_VALUES: UserType = {
		nombres: usuario.nombres,
		apellidos: usuario.apellidos,
		email_user: usuario.email_user,
		username: usuario.username,
		telefono: usuario.telefono,
	};

	async function actualizarCuenta(values: UserType) {
		try {
			const response = await clienteAxios.put('perfil/putPerfil', values);
			const localStoragePersona = JSON.parse(localStorage.getItem('persona'));
			const personaRecordar = localStoragePersona as UserType;
			if (personaRecordar) {
				const newData = {
					...personaRecordar,
					apellidos: values.apellidos,
					email_user: values.email_user.trim().toLocaleLowerCase(),
					nombres: values.nombres,
				} as UserType;
				localStorage.setItem('persona', JSON.stringify(newData));
			}
			toast.success(response.data.msg);
			usuarioAutenticado();
		} catch (e) {
			handleError(e);
		}
	}

	return (
		<Formik
			initialValues={INITIAL_VALUES}
			onSubmit={actualizarCuenta}
			validate={validarUsuario}
		>
			<Form>
				<Input
					label="Nombre de Usuario"
					name="username"
					placeholder="Ingresa su nombre de usuario"
					required
				/>

				<Input
					label="Nombres"
					name="nombres"
					placeholder="Ingrese su Nombre"
					required
				/>

				<Input
					label="Apellidos"
					name="apellidos"
					placeholder="Ingrese su Apellido"
					required
				/>

				<Input
					label="Correo"
					name="email_user"
					placeholder="Ingrese su correo"
					required
				/>

				<Input
					label="Teléfono"
					name="telefono"
					placeholder="Ingrese su telefono"
				/>

				<Button text={'Actualizar Perfil'} />
			</Form>
		</Formik>
	);
};

export default FormularioPutPerfil;
