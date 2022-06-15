import { useState } from 'react';
import { FaTags } from 'react-icons/fa';

// COMPONENTS
import PageComponent from '../../layout/app/Content/PageComponent';
import DataTableProductos from '../articulos_productos/components/table/DataTableProductos';
import TableInfo from '../../layout/common/tables/tableInfo/TableInfo';
// HOOKS
import { PF, RADMIN } from '../../utils';
import useValidarPermisosPagina from '../../../hooks/useValidarPermisosPagina';
import useRequestData from '../../../hooks/useRequestData';
import { useParams } from 'react-router-dom';
import { CategoriaType } from './types';

const VerCategoria = () => {
	const { id } = useParams();

	useValidarPermisosPagina({
		rolesPermisos: [RADMIN],
		urlReturn: '/home',
	});

	const [info, setInfo] = useState([]);
	const [categoria, cargandoCategoria] = useRequestData<CategoriaType>(null, {
		url: `/categorias/getCategoriaById/${id}`,
		onCompleteData(data) {
			const { idcategoria, nombre, descripcion, status } = data;
			setInfo([
				{ l: 'ID', v: idcategoria },
				{ l: 'Nombre', v: nombre },
				{ l: 'Descripción', v: descripcion },
				{ l: 'Estado', v: status },
			]);
		},
	});

	return (
		<PageComponent
			titulo={'Ver Categoría'}
			Icon={FaTags}
			btnBackUrl={'/categorias'}
			btnBackText={'Ir a Categorías'}
			breadCrumb={[
				{ titulo: 'Categorías', link: '/categorias' },
				{ titulo: 'Ver Categoría' },
			]}
		>
			<div className="row justify-content-center">
				<div className="col-md-8">
					<TableInfo
						cargando={cargandoCategoria}
						bgHeader={'bg-primary'}
						info={info}
						titulo={'Información de la categoría'}
						notFoundErrorText="Categoría no encontrada"
					>
						{categoria && categoria.portada !== '' && (
							<div className="text-center">
								<h5>Portada</h5>

								<img
									src={
										PF +
										categoria?.portada
									}
									alt=""
									width={300}
									className="img-fluid mt-3"
								/>
							</div>
						)}
					</TableInfo>
				</div>
				<div className="col-md-12">
					{categoria && (
						<DataTableProductos
							urlRequest={`/productos/getByCategoria/${categoria.idcategoria}`}
						/>
					)}
				</div>
			</div>
		</PageComponent>
	);
};

export default VerCategoria;
