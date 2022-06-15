import { FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import clienteAxios from '../../../../config/axios';
import { handleError } from '../../../utils';
import validarPasswordPerfil from '../validations/validarPassword';
import { Input, Button } from '../../../layout/common/forms';
import { Formik, Form, FormikHelpers } from 'formik';
import { ChangePasswordType, UserType } from '../types';

interface IFormularioCambiarPasswordUsuarioProps {
	usuario: UserType;
}

const FormularioCambiarPasswordUsuario: React.FunctionComponent<
	IFormularioCambiarPasswordUsuarioProps
> = ({ usuario }) => {
	const INITIAL_VALUES: ChangePasswordType = {
		password: '',
		passwordConfirm: '',
	};

	async function actualizarPasswordPerfil(
		values: ChangePasswordType,
		{ setSubmitting, resetForm }: FormikHelpers<any>
	) {
		try {
			const url = `/administradores/changePasswordUser/${usuario.iduser}`;
			const response = await clienteAxios.put(url, values);
			toast.success(response.data.msg);
			resetForm();
		} catch (e) {
			handleError(e);
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<Formik
			initialValues={INITIAL_VALUES}
			validate={validarPasswordPerfil}
			onSubmit={actualizarPasswordPerfil}
		>
			<Form>
				<h4 className="text-center mb-3">
					Cambiar Contraseña <FaLock />
				</h4>

				<Input
					label="Contraseña"
					type="password"
					name="password"
					placeholder="Ingrese la nueva contraseña"
					required
				/>

				<Input
					label="Confirmar contraseña"
					type="password"
					name="passwordConfirm"
					placeholder="Confirme la contraseña"
					required
				/>

				<Button text={'Cambiar Contraseña'} Icon={FaLock} />
			</Form>
		</Formik>
	);
};

export default FormularioCambiarPasswordUsuario;
