import { toast } from 'react-toastify';
import { FaLockOpen } from 'react-icons/fa';
import validarRecuperarContrasenia from '../../validations/validarRecuperarContrasenia';
import { Formik, Form } from 'formik';
import clienteAxios from '../../../../../config/axios';
import { handleError } from '../../../../utils';

// COMPONENTS
import { Input, Button } from '../../../../layout/common/forms';

// HOOKS
import { useNavigate } from 'react-router-dom';
import { ChangePasswordType, UserType } from '../../../usuarios/types';

interface STATE_INICIAL_TYPE extends ChangePasswordType {
	email_user: string;
	token: string;
}

interface IFrmRecuperarProps {
	STATE_INICIAL: STATE_INICIAL_TYPE;
	usuario: UserType;
}

const FrmRecuperar: React.FunctionComponent<IFrmRecuperarProps> = props => {
	const { STATE_INICIAL, usuario } = props;
	const navigate = useNavigate();

	async function cambiarPassword(values: STATE_INICIAL_TYPE) {
		try {
			const url = `usuarios/recoverPass/${usuario.iduser}`;
			const response = await clienteAxios.put(url, values);
			toast.success(response.data.msg);
			setTimeout(() => navigate('/'), 1000);
		} catch (error) {
			handleError(error);
		}
	}

	return (
		<Formik
			initialValues={STATE_INICIAL}
			validate={validarRecuperarContrasenia}
			onSubmit={cambiarPassword}
		>
			<Form>
				<Input
					label="Contraseña"
					type="password"
					name="password"
					placeholder="Ingrese la nueva Contraseña"
					autoFocus
				/>

				<Input
					label="'Confirmar Contraseña'"
					type="password"
					name="passwordConfirm"
					placeholder="Confirme la Contraseña"
				/>

				<Button
					text={'Recuperar contraseña'}
					cargando={!usuario}
					Icon={FaLockOpen}
				/>
			</Form>
		</Formik>
	);
};

export default FrmRecuperar;
