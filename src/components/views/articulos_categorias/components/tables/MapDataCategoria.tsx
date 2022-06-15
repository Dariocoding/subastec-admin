import BotonesCategorias from './BotonesCategoria';
import { PF } from '../../../../utils';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { CategoriaTypeTable } from '../../types';

interface IMapDataCategoriaProps {
	data: CategoriaTypeTable[];
	setImagenActualVerModal(value: string): void;
	eliminarCategoria(id: number): void;
	setEditarCategoria(id: number): void;
}

const MapDataCategoria = (props: IMapDataCategoriaProps) => {
	const { data, setImagenActualVerModal, eliminarCategoria, setEditarCategoria } = props;

	const newData = data.map(item => {
		const badge = {
			className: item.status === 1 ? 'badge-success' : 'badge-danger',
			text: item.status === 1 ? 'Activo' : 'Inactivo',
		};

		item.totalproductosHtml = (
			<h6>
				{item.totalproductos
					? item.totalproductos
					: 'No existen productos asociados a esta categoria'}
			</h6>
		);

		const srcCondition = !item.portada || item.portada === '';
		const image = PF + (srcCondition ? 'portada_categoria.png' : item.portada);
		const style = { width: '150px', cursor: 'pointer' };

		item.portadaHtml = (
			<LazyLoadImage
				alt={'Portada Categoria'}
				style={style}
				src={image}
				effect={'blur'}
				onClick={() => setImagenActualVerModal(image)}
			/>
		);

		item.statusHtml = <span className={`badge ${badge.className}`}>{badge.text}</span>;

		item.options = (
			<BotonesCategorias
				idcategoria={item.idcategoria}
				eliminarCategoria={eliminarCategoria}
				setEditarCategoria={setEditarCategoria}
			/>
		);

		return item;
	});

	return newData;
};

export default MapDataCategoria;
