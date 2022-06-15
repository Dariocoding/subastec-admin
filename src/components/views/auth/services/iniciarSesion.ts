import clienteAxios from '../../../../config/axios';
import { toast } from 'react-toastify';
import { handleError } from '../../../utils';
import { FormikHelpers } from 'formik';
import { AuthType } from '../types';
import { UserType } from '../../usuarios/types';

export async function iniciarSesion(
	values: AuthType,
	actions: FormikHelpers<any>,
	usuarioAutenticado: () => Promise<void>,
	recordar: boolean
) {
	try {
		if (values.username.trim() === '') {
			actions.setSubmitting(false);
			return toast.error('El campo nombre de usuario no puede ir vacío');
		}

		if (values.password.trim() === '') {
			actions.setSubmitting(false);
			return toast.error('Debe escribir su contraseña');
		}
		const response = await clienteAxios.post('/auth/local/signin', values);
		localStorage.setItem('at', response.data.access_token);
		localStorage.setItem('rt', response.data.refresh_token);

		if (recordar) {
			const user = response.data.user as UserType;
			const json: UserType = {
				email_user: user.email_user,
				nombres: user.nombres,
				apellidos: user.apellidos,
				image_profile: user.image_profile,
			};
			localStorage.setItem('persona', JSON.stringify(json));
		} else {
			localStorage.removeItem('persona');
		}

		toast.success('Has iniciado sesión correctamente.');
		await usuarioAutenticado();
	} catch (e) {
		handleError(e);
	}
}
