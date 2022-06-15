import { useEffect, useState } from 'react';
import clienteAxios from '../../../../../config/axios';
import { ProductoType } from '../../../articulos_productos/types';
import CardBid from '../../../settings_paquete_bids/components/CardBid';
import { PaqueteBidType } from '../../../settings_paquete_bids/types';
import CardProductoSelected from './CadProductoSelected';

interface IElementProp {
	productoSeleccionado: number | string;
	paqueteBidSeleccionado: number | string;
	paqueteBids: PaqueteBidType[];
	productos: ProductoType[];
	setFotoSubasta(value: string): void;
	fotoSubasta: string;
}
const MostrarElementSelected: React.FunctionComponent<IElementProp> = props => {
	const {
		productoSeleccionado,
		paqueteBidSeleccionado,
		paqueteBids,
		productos,
		setFotoSubasta,
		fotoSubasta,
	} = props;

	const [productoCargado, setProductoCargado] = useState<ProductoType>(null);
	const paqueteBid = paqueteBids.find(p => p.idpaquete === paqueteBidSeleccionado);
	const producto = productos.find(p => p.idproducto === productoSeleccionado);
	useEffect(() => {
		async function getImagesProducto() {
			const url = 'productos/getProductoById/' + producto.idproducto;
			const { data } = await clienteAxios(url);
			setProductoCargado(data);
		}

		if (producto) getImagesProducto();
	}, [producto]);

	let JSXElement;

	if (paqueteBid) {
		JSXElement = () => <CardBid {...paqueteBid} />;
	}

	if (producto) {
		JSXElement = () => (
			<CardProductoSelected
				producto={productoCargado}
				setImagenSeleccionada={setFotoSubasta}
				imagenSeleccionada={fotoSubasta}
			/>
		);
	}

	return JSXElement ? <JSXElement /> : null;
};

export default MostrarElementSelected;
