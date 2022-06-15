import * as React from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { Formik, Form } from 'formik';
import { iniciarSesion } from '../../services';
// COMPONENTS
import { Input, Button } from '../../../../layout/common/forms';
import Utilitys from '../layout/Utilitys';

import { UserType } from '../../../usuarios/types';
import { useAuthContext } from '../../../../../context/autenticacion/authState';

interface IFrmPersona {
	setPersona(user: UserType): void;
	persona: UserType;
}

const FrmPersona: React.FC<IFrmPersona> = props => {
	const { setPersona, persona } = props;
	const { usuarioAutenticado } = useAuthContext();
	const INITIAL_VALUE = {
		username: persona.email_user,
		password: '',
	};

	return (
		<Formik
			initialValues={INITIAL_VALUE}
			onSubmit={async (values, actions) =>
				await iniciarSesion(values, actions, usuarioAutenticado, true)
			}
		>
			{({ isSubmitting }) => (
				<Form>
					<Input
						label="Contraseña"
						type="password"
						name="password"
						placeholder="Contraseña"
						autoFocus
					/>
					<Button text="Iniciar Sesión" Icon={FaSignInAlt} />

					<Utilitys
						margin={'mt-3'}
						center={true}
						components={[
							<button
								onClick={() => setPersona(null)}
								type="button"
								disabled={isSubmitting}
								className="btn btn-link btn-block"
							>
								¿No eres{' '}
								{persona?.nombres?.prefix()}{' '}
								{persona?.apellidos?.prefix()}
								? <br /> Inicia sesion aqui
							</button>,
						]}
					/>
				</Form>
			)}
		</Formik>
	);
};

export default FrmPersona;
