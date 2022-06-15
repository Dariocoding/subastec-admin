import { FaHome } from 'react-icons/fa';

// COMPONENTS
import PageComponent from '../../layout/app/Content/PageComponent';
import DashboardAdministrador from './components/DashboardAdministrador';
const Home = () => (
	<PageComponent titulo={'Inicio'} Icon={FaHome} descripcion={'Bienvenido a subastec'}>
		<DashboardAdministrador />
	</PageComponent>
);

export default Home;
