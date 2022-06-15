import { useContext } from 'react';
import { FaCogs } from 'react-icons/fa';
import ConfigContext from '../../../context/configuracion/ConfigContext';

// COMPONENTS
import PageComponent from '../../layout/app/Content/PageComponent';
import CardDatas from './components/CardDatas';
import Card from './components/Card';
import FormularioEditarConfiguracion from './components/FormularioEditarConfiguracion';
import Tile from '../../layout/common/Tile';

// HOOKS
import useValidarPermisosPagina from '../../../hooks/useValidarPermisosPagina';
import { RADMIN } from '../../utils';

const Settings = () => {
	const configContext = useContext(ConfigContext);
	const { configuracion, obtenerConfiguracion } = configContext;

	useValidarPermisosPagina({
		rolesPermisos: [RADMIN],
		urlReturn: '/home',
	});

	return (
		<PageComponent
			titulo={'Configuraciones'}
			descripcion={'Configuraciones del sistema'}
			Icon={FaCogs}
			btnBackUrl={'/home'}
			btnBackText={'Ir al Inicio'}
			breadCrumb={[{ titulo: 'Configuracion' }]}
		>
			<div className="row justify-content-center">
				<div className="col-lg-4">
					<Tile>
						{Object.keys(configuracion).length && (
							<FormularioEditarConfiguracion />
						)}
					</Tile>
				</div>

				<div className="col-lg-8">
					<div className="form-row">
						{CardDatas.map((card, index) => (
							<div key={index} className="col-lg-6 mb-3">
								<Card
									title={card.title}
									descripcion={
										card.descripcion
									}
									Icon={card.Icon}
									url={card.url}
									className={card.className}
									btnLinkText={
										card.btnLinkText
									}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</PageComponent>
	);
};

export default Settings;
