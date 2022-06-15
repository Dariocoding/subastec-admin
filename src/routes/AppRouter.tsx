import { Routes, Route } from 'react-router-dom';
import AdminRoutes from './AdminRoutes';
import * as React from 'react';
interface IAppRouterProps {}

const Login = React.lazy(() => import('../components/views/auth/Login'));
const ForgetPass = React.lazy(() => import('../components/views/auth/ForgetPass'));
const NotFound = React.lazy(() => import('../components/views/NotFound'));

const AppRouter: React.FunctionComponent<IAppRouterProps> = () => (
	<Routes>
		<Route path="/" element={<Login />} />
		<Route path="/recuperar-usuario/:correo/:token" element={<ForgetPass />} />
		<Route path="/admin/*" element={<AdminRoutes />} />
		<Route path="*" element={<NotFound />} />
	</Routes>
);

export default AppRouter;
