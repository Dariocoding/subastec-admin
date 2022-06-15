import { useState } from 'react';
// COMPONENTS
import TabContents from './components/layout/TabContents';
import InfoPerfil from './components/layout/InfoPerfil';
import NavLinks from './components/layout/NavLinks';
import PageComponent from '../../../layout/app/Content/PageComponent';

const Perfil = () => {
	const [itemActual, setItemActual] = useState('Datos Personales');

	return (
		<PageComponent showTitle={false}>
			<div className="row user">
				<div className="col-md-12">
					<InfoPerfil />
				</div>
				<div className="col-lg-3">
					<NavLinks
						itemActual={itemActual}
						setItemActual={setItemActual}
					/>
				</div>
				<div className="col-lg-9">
					<TabContents itemActual={itemActual} />
				</div>
			</div>
		</PageComponent>
	);
};

export default Perfil;
