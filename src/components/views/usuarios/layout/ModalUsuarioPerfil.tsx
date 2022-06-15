import { FaUserCircle } from 'react-icons/fa';
import moment from 'moment-timezone';
import { validarFotoPerfil } from '../../../utils';
import { UserType } from '../types';

interface IModalUsuarioPerfil {
	persona: UserType;
}

const ModalUsuarioPerfil: React.FunctionComponent<IModalUsuarioPerfil> = props => {
	const { persona } = props;
	if (!persona) return null;

	const dataPersona = [
		{ label: 'ID', value: persona.iduser },
		{ label: 'Username', value: persona.username },
		{ label: 'Correo', value: persona.email_user },
		{
			label: 'Fecha Registro',
			value: moment(persona.date_created).format('DD/MM/YYYY'),
		},
		{ label: 'Rol', value: persona.rol.nombrerol },
		{ label: 'Teléfono', value: persona.telefono },
	];

	return (
		<div className="text-center">
			<img
				src={validarFotoPerfil(persona)}
				alt=""
				className="user-img rounded-circle"
			/>

			<h4>
				{persona.nombres} {persona.apellidos}
			</h4>

			<h5 className="mb-3">
				Datos Personales <FaUserCircle />
			</h5>
			{dataPersona.map(({ label, value }) => (
				<p className="mb-0 text-left" key={label}>
					<>
						<b>{label}:</b> {value}
					</>
				</p>
			))}
		</div>
	);
};

export default ModalUsuarioPerfil;
