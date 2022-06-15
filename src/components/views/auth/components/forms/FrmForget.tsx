import { FaEnvelope, FaSignInAlt } from 'react-icons/fa';
import { Formik, Form } from 'formik';
import { recoverPassword } from '../../services';

// COMPONENTS
import { Input, Button } from '../../../../layout/common/forms';

interface IFrmForgetProps {
	toggleForgetForm(): void;
}

const FrmForget: React.FunctionComponent<IFrmForgetProps> = props => (
	<Formik initialValues={{ username: '' }} onSubmit={recoverPassword}>
		{({ isSubmitting }) => (
			<Form>
				<Input
					label="Usuario o Correo"
					placeholder="Ingresa tu correo o nombre de Usuario"
					name="username"
				/>
				<Button text={'Enviar correo'} Icon={FaEnvelope} />

				<p className="semibold-text mb-0 mt-3">
					<button
						type="button"
						className="btn btn-link"
						disabled={isSubmitting}
						onClick={props.toggleForgetForm}
					>
						<FaSignInAlt /> Iniciar Sesión
					</button>
				</p>
			</Form>
		)}
	</Formik>
);

export default FrmForget;
