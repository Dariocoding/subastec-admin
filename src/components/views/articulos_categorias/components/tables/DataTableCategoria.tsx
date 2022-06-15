import { FaPlus } from 'react-icons/fa';
import { DeleteInfo } from '../../../../utils';
import clienteAxios from '../../../../../config/axios';
// COMPONENTS
import DataTable from '../../../../layout/common/tables/datatable';
import FormularioEditarCategoria from '../forms/FormularioEditarCategoria';
import FormularioCrearCategoria from '../forms/FormularioCrearCategoria';
import ImagenPortada from '../ImagenPortada';
import HeadingTableCategorias from './HeadingTableCategorias';
import MapDataCategoria from './MapDataCategoria';
// HOOKS
import { useLoader } from '../../../../../context/loaderpage/LoaderPageState';
import { useModal } from '../../../../../context/modal/ModalState';
import useRequestData from '../../../../../hooks/useRequestData';
import { CategoriaType, CategoriaTypeTable } from '../../types';

interface IDataTableCategoriaProps {
	urlRequest: string;
}

const DataTableCategoria: React.FunctionComponent<IDataTableCategoriaProps> = props => {
	const { urlRequest } = props;
	const { setLoader } = useLoader();

	const { setModal } = useModal();

	const [data, cargando, , setDatos] = useRequestData<CategoriaTypeTable[]>([], {
		url: urlRequest,
	});

	function setImagenActualVerModal(img: string) {
		setModal({
			content: <ImagenPortada imagenModal={img} />,
			titulo: '',
			bgHeader: null,
			size: 'xl',
		});
	}

	async function setEditarCategoria(id: number) {
		setLoader(true, 'Cargando categoría...');
		const request = await clienteAxios(`/categorias/getCategoriaById/${id}`);
		const updateCategoria = (categoria: CategoriaTypeTable) =>
			setDatos(
				data.map(c =>
					c.idcategoria === categoria.idcategoria
						? { totalproductos: c.totalproductos, ...categoria }
						: c
				)
			);

		setModal({
			titulo: 'Editar Categoria',
			bgHeader: 'secondary',
			size: 'xl',
			content: (
				<FormularioEditarCategoria
					categoria={request.data}
					updateCategoria={updateCategoria}
				/>
			),
		});
		setLoader(false);
	}

	function crearCategoria() {
		const addCategoria = (c: CategoriaType) => setDatos([c, ...data]);
		setModal({
			titulo: 'Crear Categoria',
			size: 'xl',
			bgHeader: 'primary',
			content: <FormularioCrearCategoria addCategoria={addCategoria} />,
		});
	}

	async function eliminarCategoria(idcategoria: number) {
		DeleteInfo({
			title: 'Estás seguro de eliminar esta categoria?',
			text: 'No serás capz de recuperarlo!',
			callback: () => setDatos(data.filter(c => c.idcategoria !== idcategoria)),
			urlDelete: `/categorias/${idcategoria}`,
		});
	}

	return (
		<DataTable
			data={MapDataCategoria({
				data,
				setEditarCategoria,
				setImagenActualVerModal,
				eliminarCategoria,
			})}
			heading={HeadingTableCategorias}
			loading={cargando}
			buttonHeader={
				<button
					className="btn btn-secondary btn-sm"
					onClick={crearCategoria}
				>
					<FaPlus />
				</button>
			}
		/>
	);
};

export default DataTableCategoria;
