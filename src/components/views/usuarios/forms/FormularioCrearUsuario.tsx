import { handleError } from '../../../utils';
import validarCrearUsuario from '../validations/validarUsuario';
import clienteAxios from '../../../../config/axios';
import { toast } from 'react-toastify';
import dataInputsUsuarios from './dataInputsUsuarios';
import { Input, Button } from '../../../layout/common/forms';
import { Formik, Form, FormikHelpers } from 'formik';
import { UserType } from '../types';
import { useModal } from '../../../../context/modal/ModalState';

interface IFormularioCrearUsuarioProps {
	idrol: number;
	addUser(user: UserType): void;
}

const FormularioCrearUsuario: React.FunctionComponent<IFormularioCrearUsuarioProps> = ({
	idrol,
	addUser,
}) => {
	const { setShowModal } = useModal();
	const INITIAL_VALUES: UserType = {
		nombres: '',
		apellidos: '',
		email_user: '',
		username: '',
		rolid: idrol,
		telefono: '',
		password: '',
	};

	async function crearUsuario(values: UserType, actions: FormikHelpers<any>) {
		try {
			const response = await clienteAxios.post('/administradores', values);
			toast.success(response.data.msg);
			actions.resetForm();
			addUser(response.data.user);
			setShowModal(false);
		} catch (e) {
			handleError(e);
		}
	}

	const dataInputs = dataInputsUsuarios;
	return (
		<Formik
			onSubmit={crearUsuario}
			validate={validarCrearUsuario}
			initialValues={INITIAL_VALUES}
		>
			<Form>
				<div className="form-row">
					{dataInputs.map(input => (
						<div key={input.name} className={input.col}>
							<Input {...input} />
						</div>
					))}
				</div>

				<Button text={'Crear Usuario'} />
			</Form>
		</Formik>
	);
};

export default FormularioCrearUsuario;
