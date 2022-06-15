import FormularioPutUsuario from '../forms/FormularioPutUsuario';
import FormularioCambiarPasswordUsuario from '../forms/FormularioCambiarPasswordUsuario';
import { UserType } from '../types';

interface IContentEditarUsuario {
	usuario: UserType;
	editUser(user: UserType): void;
}

const ContentEditarUsuario: React.FunctionComponent<IContentEditarUsuario> = ({
	usuario,
	editUser,
}) => (
	<div className="row w-100">
		<div className="col-lg-6">
			<FormularioPutUsuario usuario={usuario} editUser={editUser} />
		</div>
		<div className="col-lg-6">
			<FormularioCambiarPasswordUsuario usuario={usuario} />
		</div>
	</div>
);

export default ContentEditarUsuario;
