import { useAuthContext } from '../context/autenticacion/authState';
import Loader from '../context/loaderpage/Loader';
import PagePlaceholder from '../components/layout/common/placeholders/PagePlaceholder';

const RouteFallback = () => {
	const { autenticado } = useAuthContext();
	return autenticado ? <PagePlaceholder /> : <Loader show={true} texto={'Cargando...'} />;
};

export default RouteFallback;
