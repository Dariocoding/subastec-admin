import { controlDecimal, SMONEY } from '../../../../utils';
import { ProductoType } from '../../../articulos_productos/types';
import Img from './Img';

interface ICardProducto {
	producto: ProductoType;
	setImagenSeleccionada(value: string): void;
	imagenSeleccionada: string;
}

const CardProductoSelected: React.FunctionComponent<ICardProducto> = props => {
	const { producto, setImagenSeleccionada, imagenSeleccionada } = props;
	if (!producto) return;
	return (
		<>
			<h4 className="text-center">{producto.nombre}</h4>
			<p className="text-center mb-0">{producto.categoria.nombre}</p>
			<h6 className="text-center font-weight-bold">
				{/*@ts-ignore */}
				{controlDecimal(producto.precio.toFixed(2))} {SMONEY}
			</h6>
			{producto.imagenes.length && (
				<div className="row mt-3">
					{producto.imagenes.map(({ filename }, index) => (
						<Img
							key={index}
							filename={filename}
							setImagenSeleccionada={
								setImagenSeleccionada
							}
							imagenSeleccionada={imagenSeleccionada}
						/>
					))}
				</div>
			)}
		</>
	);
};

export default CardProductoSelected;
