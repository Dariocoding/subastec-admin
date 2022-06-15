import clienteAxios from '../../../../config/axios';
import { handleError } from '../../../utils';
import { toast } from 'react-toastify';
import { FormikHelpers } from 'formik';

export async function recoverPassword(values: { username: string }, actions: FormikHelpers<any>) {
	if (values.username.trim() !== '') {
		try {
			const url = '/usuarios/forgetPass';
			const response = await clienteAxios.put(url, { username: values.username });
			toast.success(response.data.msg);
			actions.resetForm();
		} catch (error) {
			handleError(error);
		}
	} else toast.error('Debe introducir un usuario o correo para recuperar su contraseña');
}

export default recoverPassword;
