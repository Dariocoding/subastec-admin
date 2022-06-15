import { useState, useContext } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { Formik, Form } from 'formik';
import { iniciarSesion } from '../../services';
import Utilitys from '../layout/Utilitys';
// COMPONENTS
import { Checkbox, Input, Button } from '../../../../layout/common/forms';

// HOOKS

// CONTEXT
import authContext from '../../../../../context/autenticacion/authContext';

const INITIAL_VALUES = {
	username: '',
	password: '',
};

interface IFrmLoginProps {
	toggleForgetForm(): void;
}

const FrmLogin: React.FunctionComponent<IFrmLoginProps> = props => {
	const { usuarioAutenticado } = useContext(authContext);
	const [isChecked, setChecked] = useState(false);

	return (
		<Formik
			initialValues={INITIAL_VALUES}
			onSubmit={async (values, actions) =>
				await iniciarSesion(values, actions, usuarioAutenticado, isChecked)
			}
		>
			{({ isSubmitting }) => (
				<Form>
					<Input
						label="Usuario"
						placeholder="Correo"
						name="username"
						autoFocus
					/>

					<Input
						label="Contraseña"
						type="password"
						placeholder="Contraseña"
						name="password"
					/>

					<Utilitys
						margin={'my-3'}
						components={[
							<Checkbox
								label={'Recordar'}
								isChecked={isChecked}
								onChange={setChecked}
							/>,
							<button
								onClick={props.toggleForgetForm}
								type="button"
								disabled={isSubmitting}
								style={{
									textAlign: 'right',
								}}
								className="btn btn-link"
							>
								¿Olvidaste la contraseña?
							</button>,
						]}
					/>
					<Button text={'Iniciar Sesión'} Icon={FaSignInAlt} />
				</Form>
			)}
		</Formik>
	);
};

export default FrmLogin;
