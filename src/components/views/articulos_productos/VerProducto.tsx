import { useState } from 'react';
import { FaBoxes } from 'react-icons/fa';
import { controlDecimal, RADMIN, SMONEY } from '../../utils';
// COMPONENTS
import Modal from '../../layout/common/Modal';
import PageComponent from '../../layout/app/Content/PageComponent';
import TableInfo, { InfoTableInterface } from '../../layout/common/tables/tableInfo/TableInfo';
import TileImagen from './components/TileImagen';
import ReactHtmlParser from 'react-html-parser';

// HOOKS
import useValidarPermisosPagina from '../../../hooks/useValidarPermisosPagina';
import useRequestData from '../../../hooks/useRequestData';
import { useParams } from 'react-router-dom';
import { ProductoType } from './types';

const VerProducto: React.FunctionComponent = () => {
	const { id } = useParams();

	useValidarPermisosPagina({
		rolesPermisos: [RADMIN],
		urlReturn: '/home',
	});

	const [imagenActualModal, setImagenActualVerModal] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [info, setInfo] = useState<InfoTableInterface>([]);

	const [producto, cargando] = useRequestData<ProductoType>(null, {
		url: `/productos/getProductoById/${id}`,
		onCompleteData(data) {
			// @ts-ignore
			const precio = `${controlDecimal(data.precio.toFixed(2))} ${SMONEY}`;
			setInfo([
				{ label: 'ID', value: data.idproducto },
				{ label: 'Código', value: data.codigo },
				{ label: 'Nombre', value: data.nombre },
				{ label: 'Categoría', value: data.categoria.nombre },
				{
					label: 'Precio',
					value: precio,
				},
				{ label: 'Descripción', value: ReactHtmlParser(data.descripcion) },
				{
					label: 'Estado',
					value: (
						<span>
							{data.status === 1 ? (
								<span className="badge badge-success">
									Activo
								</span>
							) : (
								<span className="badge badge-dark">
									Inactivo
								</span>
							)}
						</span>
					),
				},
			]);
		},
	});

	return (
		<PageComponent
			titulo={'Ver Articulo'}
			Icon={FaBoxes}
			btnBackUrl={'/articulos'}
			btnBackText={'Ir a Articulos'}
			breadCrumb={[
				{ titulo: 'Articulos', link: '/articulos' },
				{ titulo: 'Ver Articulo' },
			]}
		>
			<Modal
				showModal={showModal}
				setShowModal={setShowModal}
				position={'center'}
			>
				<div className="d-flex justify-content-center">
					<img
						className="img-fluid"
						src={imagenActualModal}
						alt="Imagen actual"
					/>
				</div>
			</Modal>
			<div className="row justify-content-center">
				<div className="col-md-8">
					<TableInfo
						cargando={cargando}
						bgHeader={'bg-primary'}
						info={info}
						titulo={'Información del Articulo'}
						notFoundErrorText={'Articulo no encontrado'}
					>
						{producto && producto.imagenes?.length && (
							<TileImagen
								setImagenActualVerModal={
									setImagenActualVerModal
								}
								showModal={showModal}
								setShowModal={setShowModal}
								imagenes={producto.imagenes}
							/>
						)}
					</TableInfo>
				</div>
			</div>
		</PageComponent>
	);
};

export default VerProducto;
