import { Routes, Route } from 'react-router-dom';
import PrivRoute from './PrivRoute';
import * as React from 'react';
import UserRoutes from './UserRoutes';
import SettingsRoutes from './SettingsRoutes';

interface IAdminRoutesProps {}

const Home = React.lazy(() => import('../components/views/Home/Home'));

const Productos = React.lazy(() => import('../components/views/articulos_productos/Productos'));
const VerProducto = React.lazy(() => import('../components/views/articulos_productos/VerProducto'));

// CATEGORIAS

const Categorias = React.lazy(() => import('../components/views/articulos_categorias/Categorias'));
const VerCategoria = React.lazy(
	() => import('../components/views/articulos_categorias/VerCategoria')
);

// SUBASTAS

const Pagos = React.lazy(() => import('../components/views/pagos/Pagos'));

// PAGOS

const Subastas = React.lazy(() => import('../components/views/subastas/Subastas'));
const DetalleSubasta = React.lazy(() => import('../components/views/subastas/DetalleSubasta'));

const AdminRoutes: React.FunctionComponent<IAdminRoutesProps> = () => (
	<Routes>
		<Route path="home" element={<PrivRoute component={Home} />} />

		<Route path="usuarios/*" element={<UserRoutes />} />

		<Route path="settings/*" element={<SettingsRoutes />} />

		<Route path="/categorias" element={<PrivRoute component={Categorias} />} />
		<Route
			path="/categorias/ver-categoria/:id"
			element={<PrivRoute component={VerCategoria} />}
		/>

		<Route path="/articulos" element={<PrivRoute component={Productos} />} />
		<Route
			path="/articulos/ver-articulo/:id"
			element={<PrivRoute component={VerProducto} />}
		/>

		<Route path="/subastas" element={<PrivRoute component={Subastas} />} />

		<Route
			path="/subastas/detalle-subasta/:idsubasta"
			element={<PrivRoute component={DetalleSubasta} />}
		/>

		<Route path="/pagos" element={<PrivRoute component={Pagos} />} />
	</Routes>
);

export default AdminRoutes;
