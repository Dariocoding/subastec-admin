import { FaPlus } from 'react-icons/fa';
import { DeleteInfo, handleError } from '../../../../utils';
import clienteAxios from '../../../../../config/axios';

// COMPONENTS
import DataTable from '../../../../layout/common/tables/datatable';
import MapDataProductos from './MapDataProductos';
import HeadingProductosTable from './HeadingProductosTable';
import FormularioCrearProducto from '../forms/FormularioCrearProducto';
import FormularioEditarProducto from '../forms/FormularioEditarProducto';
import EditarImagenesProducto from '../forms/EditarImagenesProducto';
// HOOKS
import { useModal } from '../../../../../context/modal/ModalState';
import useRequestData from '../../../../../hooks/useRequestData';
import { useLoader } from '../../../../../context/loaderpage/LoaderPageState';
import { ProductoTableType, ProductoType } from '../../types';

interface IDataTableProducto {
	urlRequest: string;
}

const DataTableProducto: React.FunctionComponent<IDataTableProducto> = ({ urlRequest }) => {
	const { setLoader } = useLoader();
	const { setModal } = useModal();

	const [data, cargando, , setData] = useRequestData<ProductoTableType[]>([], {
		url: urlRequest,
	});

	const crearProducto = async () => {
		setLoader(true, 'Cargando...');
		const addProducto = (producto: ProductoType) => setData([producto, ...data]);
		const categorias = await clienteAxios.get('categorias');
		setModal({
			content: (
				<FormularioCrearProducto
					addProducto={addProducto}
					categorias={categorias.data}
				/>
			),
			titulo: 'Crear Articulo',
			size: 'xl',
			bgHeader: 'primary',
		});
		setLoader(false);
	};

	async function editarProducto(id: number) {
		try {
			setLoader(true, 'Buscando articulo...');
			const [requestProducto, requestCategorias] = await Promise.all([
				clienteAxios(`/productos/getProductoById/${id}`),
				clienteAxios('categorias'),
			]);

			const updateProducto = (producto: ProductoType) =>
				setData(data.map(p => (p.idproducto === id ? producto : p)));

			setModal({
				titulo: 'Editar Articulo',
				content: (
					<div className="row">
						<div className="col-lg-7">
							<FormularioEditarProducto
								updateProducto={updateProducto}
								producto={requestProducto.data}
								categorias={requestCategorias.data}
							/>
						</div>
						<div className="col-lg-5">
							<EditarImagenesProducto
								producto={requestProducto.data}
							/>
						</div>
					</div>
				),
				bgHeader: 'primary',
				size: 'xl',
			});
		} catch (e) {
			handleError(e);
		} finally {
			setLoader(false);
		}
	}

	function eliminarProducto(id: number) {
		DeleteInfo({
			title: '¿Estás seguro de eliminar este artículo?',
			text: 'No lo podrás recuperar!',
			urlDelete: `/productos/${id}`,
			callback: () => setData(data.filter(p => p.idproducto !== id)),
		});
	}
	return (
		<DataTable
			data={MapDataProductos({ data, eliminarProducto, editarProducto })}
			heading={HeadingProductosTable}
			loading={cargando}
			buttonHeader={
				<div className="btn-group btn-group-sm">
					<button
						className="btn btn-secondary"
						onClick={crearProducto}
					>
						<FaPlus />
					</button>
				</div>
			}
		/>
	);
};

export default DataTableProducto;
