import { MdOutlinePayments } from 'react-icons/md';
import clienteAxios from '../../../config/axios';
// COMPONENTES
import PageComponent from '../../layout/app/Content/PageComponent';
import DataTable from '../../layout/common/tables/datatable';
// HOOKS
import { useModal } from '../../../context/modal/ModalState';
import { useLoader } from '../../../context/loaderpage/LoaderPageState';
import { HeadDataTable } from '../../layout/common/tables/datatable/interfaces';
import useRequestData from '../../../hooks/useRequestData';
import { PagoType, PagoTypeTable } from './types';
import moment from 'moment-timezone';
import ButtonsTablePagos from './components/ButtonsTablePagos';
import { handleError, SMONEY } from '../../utils';
import ContentPago from './components/ContentPago';

const Pagos: React.FunctionComponent = () => {
	const { setModal } = useModal();
	const { setLoader } = useLoader();
	const [pagos, loading, , setPagos] = useRequestData<PagoTypeTable[]>([], { url: 'pagos' });
	const HeadingSubasta: HeadDataTable[] = [
		{ name: 'ID', dataKey: 'idpago' },
		{ name: 'Nombres', dataKey: 'user.nombres', center: true },
		{ name: 'Apellidos', dataKey: 'user.apellidos', center: true },
		{ name: 'IDTransacción', dataKey: 'transactionId', center: true },
		{ name: 'Fecha Pago', dataKey: 'datecreatedFormated', center: true },
		{ name: 'Método de Pago', dataKey: 'metodopago', center: true },
		{ name: 'Total', dataKey: 'montoFormated', center: true },
		{ name: 'Estado', dataKey: 'transactionStatus', center: true },
		{ name: 'Acciones', dataKey: 'options', center: true },
	];

	const viewPago = async (idpago: number) => {
		try {
			setLoader(true, 'Cargando pago...');
			const req = await clienteAxios('pagos/' + idpago);
			const pago = req.data as PagoType;
			setModal({
				titulo: 'Ver Pago',
				content: <ContentPago pago={pago} />,
				bgHeader: 'primary',
				size: 'sm',
			});
		} catch (error) {
			handleError(error);
		} finally {
			setLoader(false);
		}
	};

	function map() {
		return pagos.map(item => {
			item.metodopago = 'PayPhone';
			item.options = (
				<ButtonsTablePagos viewPago={viewPago} idpago={item.idpago} />
			);
			item.datecreatedFormated = moment(item.date_created).format('DD/MM/YYYY');
			item.montoFormated = item.amount / 100 + SMONEY;
			return item;
		});
	}

	return (
		<PageComponent
			titulo={'Pagos'}
			Icon={MdOutlinePayments}
			btnBackUrl={'/home'}
			btnBackText={'Ir a inicio'}
			breadCrumb={[{ titulo: 'Pagos' }]}
		>
			<DataTable data={map()} loading={loading} heading={HeadingSubasta} />
		</PageComponent>
	);
};

export default Pagos;
