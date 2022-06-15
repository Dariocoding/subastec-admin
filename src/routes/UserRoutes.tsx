import * as React from 'react';
import PrivRoute from './PrivRoute';
import { Route, Routes } from 'react-router-dom';

interface IUserRoutesProps {}

const Perfil = React.lazy(() => import('../components/views/usuarios/perfil/Perfil'));

const Administradores = React.lazy(
	() => import('../components/views/usuarios/users_administradores/Administradores')
);

const Usuarios = React.lazy(() => import('../components/views/usuarios/users_usuarios/Usuarios'));

const UserRoutes: React.FunctionComponent<IUserRoutesProps> = () => (
	<Routes>
		<Route path="/perfil" element={<PrivRoute component={Perfil} />} />
		<Route
			path="/administradores"
			element={<PrivRoute component={Administradores} />}
		/>

		<Route path="/" element={<PrivRoute component={Usuarios} />} />
	</Routes>
);

export default UserRoutes;
