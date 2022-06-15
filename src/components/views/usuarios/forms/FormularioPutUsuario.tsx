import { FaUserCircle } from 'react-icons/fa';

import { handleError } from '../../../utils';
import validarUsuario from '../validations/validarUsuario';
import clienteAxios from '../../../../config/axios';
import dataInputsUsuarios from './dataInputsUsuarios';
import { Input, Button } from '../../../layout/common/forms';
import { toast } from 'react-toastify';
import { Formik, Form } from 'formik';
import { UserType } from '../types';
import { useModal } from '../../../../context/modal/ModalState';

interface IFormularioProps {
	usuario: UserType;
	editUser(user: UserType): void;
}

const FormularioPutUsuario: React.FunctionComponent<IFormularioProps> = props => {
	const { setShowModal } = useModal();
	const { usuario, editUser } = props;
	const INITIAL_VALUES: UserType = {
		nombres: usuario.nombres,
		apellidos: usuario.apellidos,
		email_user: usuario.email_user,
		username: usuario.username,
		telefono: usuario.telefono,
	};

	async function actualizarUsuario(values: UserType) {
		try {
			const url = `/administradores/putUsuario/${usuario.iduser}`;
			const response = await clienteAxios.put(url, values);
			toast.success(response.data.msg);
			editUser(response.data.user);
			setShowModal(false);
		} catch (e) {
			handleError(e);
		}
	}

	// quitamos el ultimo elemento del array ya que tiene el input contraseña y no lo queremos
	const dataInputs = dataInputsUsuarios.slice(0, -1);

	return (
		<Formik
			initialValues={INITIAL_VALUES}
			onSubmit={actualizarUsuario}
			validate={validarUsuario}
		>
			<Form>
				<h4 className="text-center mb-3">
					Datos Personales <FaUserCircle />
				</h4>
				{dataInputs.map(input => (
					<Input {...input} key={input.name} />
				))}

				<Button text={'Actualizar Usuario'} />
			</Form>
		</Formik>
	);
};

export default FormularioPutUsuario;
