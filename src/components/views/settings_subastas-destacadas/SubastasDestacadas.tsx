import * as React from 'react';
import { FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';
import clienteAxios from '../../../config/axios';
import useRequestData from '../../../hooks/useRequestData';
import PageComponent from '../../layout/app/Content/PageComponent';
import TablePlaceholder from '../../layout/common/placeholders/TablePlaceholder';
import Tile from '../../layout/common/Tile';
import { SubastaType } from '../subastas/types';
import CardSubasta from './components/CardSubasta';
import { SubastaDestacadaType } from './types';

interface ISubastasDestacadasProps {}

const SubastasDestacadas: React.FunctionComponent<ISubastasDestacadasProps> = () => {
	const [subastas, setSubastas] = React.useState<SubastaType[]>([]);
	const [subastasDestacadas, setSubastasDestacadas] = React.useState<SubastaDestacadaType[]>(
		[]
	);
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		async function fetchData() {
			const urlSubastas = 'subastas/not-paquete-bids';
			const urlSubastasDestacadas = 'subastas-destacadas';
			const [reqSubastas, reqSubastasDestacadas] = await Promise.all([
				clienteAxios(urlSubastas),
				clienteAxios(urlSubastasDestacadas),
			]);
			setSubastas(reqSubastas.data);
			setSubastasDestacadas(reqSubastasDestacadas.data);
			setLoading(false);
		}

		fetchData();
	}, []);

	function limpiarSubastasDestacadas() {
		toast.promise(
			async () => {
				for (let i = 0; i < subastasDestacadas.length; i++) {
					const subastaDestacada = subastasDestacadas[i];
					const url = `subastas-destacadas/${subastaDestacada.subastaid}`;
					await clienteAxios.delete(url);
				}
				setSubastasDestacadas([]);
			},
			{
				pending: 'Eliminando subastas destacadas...',
				success: 'Subastas destacadas eliminada correctamente',
				error: 'Ha ocurrido un error',
			}
		);
	}

	return (
		<PageComponent
			titulo="Subastas Destacas"
			Icon={FaStar}
			btnBackUrl={'/settings'}
			btnBackText={'Ir a configuraciones'}
			breadCrumb={[
				{ titulo: 'Configuración', link: '/settings' },
				{ titulo: 'Paquete Bids' },
			]}
		>
			<Tile className="d-flex justify-content-center">
				<button
					className="btn btn-danger"
					type="button"
					onClick={limpiarSubastasDestacadas}
				>
					Limpiar Subastas Destacadas
				</button>
			</Tile>

			{!loading ? (
				subastas.map(s => (
					<CardSubasta
						subasta={s}
						subastasDestacadas={subastasDestacadas}
						setSubastasDestacadas={setSubastasDestacadas}
						key={s.idsubasta}
					/>
				))
			) : (
				<TablePlaceholder />
			)}
		</PageComponent>
	);
};

export default SubastasDestacadas;
