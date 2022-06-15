import { FaPlus } from 'react-icons/fa';
import clienteAxios from '../../../../../config/axios';
import { handleError, DeleteInfo } from '../../../../utils';

// COMPONENTS
import HeadingSubasta from './HeadingSubasta';
import DataTable from '../../../../layout/common/tables/datatable';
import MapeoSubastas from './MapeoSubastas';
import FormCrearSubasta from '../forms/FormCrearSubasta';
import FormEditarSubasta from '../forms/FormEditarSubasta';

// HOOKS
import { useLoader } from '../../../../../context/loaderpage/LoaderPageState';
import { useModal } from '../../../../../context/modal/ModalState';
import { SubastaTableType, SubastaType } from '../../types';
import useRequestData from '../../../../../hooks/useRequestData';
import React from 'react';
import { HeadDataTable } from '../../../../layout/common/tables/datatable/interfaces';

interface IDataTableSubasta {
	urlRequest: string;
	titulo?: React.ReactNode;
	canSearch?: boolean;
	showPagination?: boolean;
	heading?: HeadDataTable[];
}

const DataTableSubata: React.FC<IDataTableSubasta> = props => {
	const { setLoader } = useLoader();
	const { setModal } = useModal();
	const [data, cargando, , setDatos] = useRequestData<SubastaTableType[]>([], {
		url: props.urlRequest,
	});

	const crearSubasta = async () => {
		setLoader(true, 'Cargando...');
		const [productos, paqueteBids] = await Promise.all([
			clienteAxios('productos/selectProductosIdName'),
			clienteAxios('paquete-bids'),
		]);

		const addSubasta = (subasta: SubastaType) => setDatos([subasta, ...data]);
		setModal({
			titulo: 'Crear Subasta',
			bgHeader: 'primary',
			size: 'xl',
			content: (
				<FormCrearSubasta
					addSubasta={addSubasta}
					productos={productos.data}
					paqueteBids={paqueteBids.data}
				/>
			),
		});
		setLoader(false);
	};

	async function editarSubasta(id: number) {
		try {
			setLoader(true, 'Cargando subasta...');

			const [productos, paqueteBids, paqueteActual] = await Promise.all([
				clienteAxios('productos/selectProductosIdName'),
				clienteAxios('paquete-bids'),
				clienteAxios(`/subastas/${id}`),
			]);

			const setSubasta = (subasta: SubastaType) =>
				setDatos(
					data.map(u =>
						u.idsubasta === subasta.idsubasta ? subasta : u
					)
				);

			setModal({
				titulo: 'Editar Subasta',
				bgHeader: 'secondary',
				size: 'xl',
				content: (
					<FormEditarSubasta
						subasta={paqueteActual.data}
						setSubasta={setSubasta}
						productos={productos.data}
						paqueteBids={paqueteBids.data}
					/>
				),
			});
		} catch (e) {
			handleError(e);
		} finally {
			setLoader(false);
		}
	}

	const eliminarSubasta = (id: number) => {
		DeleteInfo({
			title: 'Eliminar subasta',
			text: 'No serás capz de recuperarlo!',
			urlDelete: `subastas/${id}`,
			callback() {
				setDatos(data.filter(d => d.idsubasta !== id));
			},
		});
	};

	return (
		<DataTable
			data={MapeoSubastas({ data, eliminarSubasta, editarSubasta })}
			heading={props.heading || HeadingSubasta}
			loading={cargando}
			titulo={props.titulo}
			canSearch={props.canSearch}
			showPagination={props.showPagination}
			buttonHeader={
				props.urlRequest === '/subastas' ? (
					<button
						className="btn btn-secondary btn-sm"
						onClick={crearSubasta}
					>
						<FaPlus />
					</button>
				) : null
			}
		/>
	);
};

export default DataTableSubata;
