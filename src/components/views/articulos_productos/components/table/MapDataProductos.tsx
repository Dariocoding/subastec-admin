import BotonesProducto from './BotonesProducto';
import { controlDecimal, SMONEY } from '../../../../utils';
import { ProductoTableType } from '../../types';

interface IMapProductos {
	data: ProductoTableType[];
	eliminarProducto(id: number): void;
	editarProducto(id: number): void;
}

const MapDataProductos = ({ data, eliminarProducto, editarProducto }: IMapProductos) => {
	const newData = data.map(item => {
		item.statusHtml =
			item.status === 1 ? (
				<span className="badge badge-success">Activo</span>
			) : (
				<span className="badge badge-danger">Inactivo</span>
			);

		item.precioText =
			controlDecimal(
				//@ts-ignore
				item.precio?.toFixed(2) ? item.precio.toFixed(2) : item.precio
			) +
			' ' +
			SMONEY;

		item.options = (
			<BotonesProducto
				element={item}
				eliminarProducto={eliminarProducto}
				editarProducto={editarProducto}
			/>
		);
		return item;
	});
	return newData;
};

export default MapDataProductos;
