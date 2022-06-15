import * as React from 'react';
import PrivRoute from './PrivRoute';
import { Routes, Route } from 'react-router-dom';

interface ISettingsRoutesProps {}

const Settings = React.lazy(() => import('../components/views/settings/Settings'));
const Contactos = React.lazy(() => import('../components/views/settings_contactos/Contactos'));
const PaqueteBids = React.lazy(
	() => import('../components/views/settings_paquete_bids/PaqueteBids')
);

const SubastasDestacadas = React.lazy(
	() => import('../components/views/settings_subastas-destacadas/SubastasDestacadas')
);

const SettingsRoutes: React.FunctionComponent<ISettingsRoutesProps> = () => (
	<Routes>
		<Route path="/" element={<PrivRoute component={Settings} />} />
		<Route path="/contactos" element={<PrivRoute component={Contactos} />} />
		<Route path="paquete-bids" element={<PrivRoute component={PaqueteBids} />} />
		<Route
			path="subastas-destacadas"
			element={<PrivRoute component={SubastasDestacadas} />}
		/>
	</Routes>
);

export default SettingsRoutes;
