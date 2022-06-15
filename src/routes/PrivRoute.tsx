import { useAuthContext } from '../context/autenticacion/authState';
import { Navigate } from 'react-router-dom';

const PrivRoute = ({ component: Component }: { component: any }) => {
	const { autenticado, cargando } = useAuthContext();
	if (!autenticado && !cargando) return <Navigate to={'/'} />;

	return <Component />;
};

export default PrivRoute;
