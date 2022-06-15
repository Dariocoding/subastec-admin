import { toast } from 'react-toastify';
import { handleError } from '../../../../../utils';
import clienteAxios from '../../../../../../config/axios';
import validarPasswordPerfil from '../../../validations/validarPassword';

import { Input, Button } from '../../../../../layout/common/forms';
import { Formik, Form, FormikHelpers } from 'formik';
import { ChangePasswordType } from '../../../types';
const FormularioCambiarPassword = () => {
	const INITIAL_VALUES: ChangePasswordType = {
		password: '',
		passwordConfirm: '',
	};

	async function actualizarPasswordPerfil(
		values: ChangePasswordType,
		actions: FormikHelpers<any>
	) {
		try {
			const url = '/perfil/changePasswordPerfil';
			const response = await clienteAxios.put(url, values);
			toast.success(response.data.msg);
			actions.resetForm();
		} catch (e) {
			handleError(e);
		}
	}

	return (
		<Formik
			onSubmit={actualizarPasswordPerfil}
			validate={validarPasswordPerfil}
			initialValues={INITIAL_VALUES}
		>
			<Form>
				<Input
					label="Contraseña"
					type="password"
					name="password"
					placeholder="Ingrese su nueva contraseña"
					required
				/>

				<Input
					label="Confirmar Contraseña"
					type="password"
					name="passwordConfirm"
					placeholder="Confirme su nueva contraseña"
					required
				/>

				<Button text={'Cambiar Contraseña'} />
			</Form>
		</Formik>
	);
};

export default FormularioCambiarPassword;
