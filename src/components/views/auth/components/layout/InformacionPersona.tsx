import { LazyLoadImage } from 'react-lazy-load-image-component';
import { PF } from '../../../../utils';
import { UserType } from '../../../usuarios/types';

const userImage = require('../../../../../Assets/images/perfil.png');

interface IInformacionPersonaProps {
	persona: UserType;
}
const InformacionPersona: React.FunctionComponent<IInformacionPersonaProps> = props => {
	const { persona } = props;
	const validacionFoto = !persona.image_profile;

	return (
		<>
			<LazyLoadImage
				className="rounded-circle user-image"
				alt="Imagen Usuario"
				effect="blur"
				wrapperClassName="d-block"
				src={validacionFoto ? userImage : PF + persona.image_profile}
			/>
			<h4 className="text-center user-name">
				{persona.nombres.prefix()} {persona.apellidos.prefix()}
			</h4>
			<p className="text-center text-muted">{persona.email_user}</p>
		</>
	);
};

export default InformacionPersona;
