import { useState } from 'react';
import SidebarData from './SidebarData';
import ItemLink from './ItemLink';
import BotonCerrarSesion from './BotonCerrarSesion';
const Menu = () => {
	const [subnav, setSubnav] = useState('');

	return (
		<ul className="app-menu">
			{SidebarData.map(item => (
				<ItemLink
					subnav={subnav}
					setSubnav={setSubnav}
					key={item.title}
					Item={item}
				/>
			))}

			<BotonCerrarSesion />
		</ul>
	);
};

export default Menu;
