import * as React from 'react';
import PageComponent from '../../layout/app/Content/PageComponent';
import { GiReceiveMoney } from 'react-icons/gi';
import { useParams } from 'react-router-dom';
import { PujaTableType, SubastaType } from './types';
import clienteAxios from '../../../config/axios';
import { toast } from 'react-toastify';
import DetalleSubastaContent from './components/DetalleSubasta';
import PagePlaceholder from '../../layout/common/placeholders/PagePlaceholder';
import ItemNotFound from '../../layout/common/ItemNotFound';

interface IDetalleSubastaProps {}

const DetalleSubasta: React.FC<IDetalleSubastaProps> = () => {
	const { idsubasta } = useParams();

	const [subasta, setSubasta] = React.useState<SubastaType>();
	const [pujas, setPujas] = React.useState<PujaTableType[]>([]);
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		async function fetchData() {
			const idToast = toast.loading('Cargando subasta...');
			try {
				const urlSubasta = `subastas/${idsubasta}`;
				const urlPujas = `puja?subastaid=${idsubasta}`;
				const [reqSubasta, reqPujas] = await Promise.all([
					clienteAxios(urlSubasta),
					clienteAxios(urlPujas),
				]);
				setSubasta(reqSubasta.data);
				setPujas(reqPujas.data);
				toast.update(idToast, {
					type: 'success',
					render: 'Subasta cargada correctamente',
					autoClose: 3000,
					isLoading: false,
				});
			} catch (error) {
				toast.update(idToast, {
					type: 'success',
					render: 'Subasta no encontrada, o no cargada correctamente.',
					autoClose: 3000,
					isLoading: false,
				});
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, []);

	if (loading) return <PagePlaceholder />;

	return (
		<PageComponent
			titulo={'Detalle Subasta'}
			Icon={GiReceiveMoney}
			btnBackUrl={'/subastas'}
			btnBackText={'Ir a Subastas'}
			breadCrumb={[
				{ titulo: 'Subastas', link: '/subastas' },
				{ titulo: 'Detalle subasta' },
			]}
		>
			{subasta ? (
				<DetalleSubastaContent
					pujas={pujas}
					isLoading={loading}
					subasta={subasta}
					setSubasta={setSubasta}
					setPujas={setPujas}
				/>
			) : (
				<ItemNotFound mensaje="Subasta no encontrada" />
			)}
		</PageComponent>
	);
};

export default DetalleSubasta;
