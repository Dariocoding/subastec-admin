import * as React from 'react';
import { FaEye } from 'react-icons/fa';
import clienteAxios from '../../../../../config/axios';
import { useLoader } from '../../../../../context/loaderpage/LoaderPageState';
import { useModal } from '../../../../../context/modal/ModalState';
import DataTable from '../../../../layout/common/tables/datatable';
import Dropdown, { ButtonDropdown } from '../../../../layout/common/tables/Dropdown';
import { formatter, handleError } from '../../../../utils';
import ModalUsuarioPerfil from '../../../usuarios/layout/ModalUsuarioPerfil';
import { UserType } from '../../../usuarios/types';
import { PujaTableType } from '../../types';

interface IDataTablePujaProps {
	isLoading: boolean;
	pujas: PujaTableType[];
}

const DataTablePuja: React.FunctionComponent<IDataTablePujaProps> = props => {
	const { setLoader } = useLoader();
	const { setModal } = useModal();
	async function viewUser(idpersona: number) {
		try {
			setLoader(true, 'Cargando usuario...');
			const url = `usuarios/${idpersona}`;
			const request = await clienteAxios(url);
			const user = request.data as UserType;

			setModal({
				bgHeader: 'secondary',
				content: <ModalUsuarioPerfil persona={user} />,
				size: 'md',
				titulo: 'Ver Usuario',
			});
		} catch (e) {
			handleError(e);
		} finally {
			setLoader(false);
		}
	}

	function mapeoPujas() {
		return props.pujas.map(p => {
			console.log(p);
			const formula = (p.costopuja / 100) * p.cantidadBids;
			const price = formatter.format(formula ? formula : 0);

			p.price = price + ' USD';

			p.modalidadFormated = p.modalidad === 'M' ? 'Manual' : 'Automático';

			p.nameFormated =
				p.user.nombres + ' ' + (p.user.apellidos ? p.user.apellidos : '');

			p.options = (
				<Dropdown>
					<ButtonDropdown
						color="primary"
						onClick={() => viewUser(p.userid)}
					>
						<FaEye /> Ver Usuario
					</ButtonDropdown>
				</Dropdown>
			);
			return p;
		});
	}

	return (
		<DataTable
			titulo={<h3>Todas las pujas de esta Subasta</h3>}
			heading={[
				{
					name: 'ID Puja',
					dataKey: 'idpuja',
					center: true,
				},
				{
					name: 'Usuario',
					dataKey: 'nameFormated',
					center: true,
				},
				{
					name: 'Cantidad Bids',
					dataKey: 'cantidadBids',
					center: true,
				},
				{
					name: 'Costo Puja',
					dataKey: 'costopuja',
					center: true,
				},

				{
					name: 'Modalidad',
					dataKey: 'modalidadFormated',
					center: true,
				},

				{
					name: 'Precio',
					dataKey: 'price',
					center: true,
				},

				{
					name: 'Acciones',
					dataKey: 'options',
					center: true,
				},
			]}
			data={mapeoPujas()}
			loading={props.isLoading}
		/>
	);
};

export default DataTablePuja;
