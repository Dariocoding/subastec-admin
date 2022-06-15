import { useContext } from 'react';
import NavLink from './NavLink';
import authContext from '../../../../../../context/autenticacion/authContext';
import { IDSUPERADMINISTRADOR } from '../../../../../utils';

interface INavLinkProps {
	itemActual: string;
	setItemActual(value: string): void;
}

const NavLinks: React.FunctionComponent<INavLinkProps> = ({ itemActual, setItemActual }) => {
	const { usuario } = useContext(authContext);
	const NavLinks = [
		{ titulo: 'Cambiar Foto de Perfil', validation: true },
		{ titulo: 'Datos Personales', validation: true },
		{ titulo: 'Cambiar Contraseña', validation: true },
		{
			titulo: 'Eliminar Cuenta',
			validation: usuario.iduser !== IDSUPERADMINISTRADOR,
		},
	];

	return (
		<div className="tile p-0">
			<ul className="nav flex-column nav-tabs user-tabs">
				{NavLinks.map(({ validation, titulo }, index) =>
					validation ? (
						<NavLink
							key={index}
							itemActual={itemActual}
							handleClick={() => setItemActual(titulo)}
							title={titulo}
						/>
					) : null
				)}
			</ul>
		</div>
	);
};

export default NavLinks;
