import { GiReceiveMoney } from 'react-icons/gi';
import PageComponent from '../../layout/app/Content/PageComponent';
import DataTableSubata from './components/Table/DataTableSubata';
const Subastas: React.FC = () => (
	<PageComponent
		titulo={'Subastas'}
		Icon={GiReceiveMoney}
		btnBackUrl={'/home'}
		btnBackText={'Ir a inicio'}
		breadCrumb={[{ titulo: 'Subastas' }]}
	>
		<DataTableSubata urlRequest={'/subastas'} />
	</PageComponent>
);

export default Subastas;
