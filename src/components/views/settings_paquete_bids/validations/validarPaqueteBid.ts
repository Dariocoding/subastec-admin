import { PaqueteBidType } from '../types';

const validarPaqueteBid = (valores: PaqueteBidType) => {
	let errores: PaqueteBidType = {};

	if (!valores.cantidadBids) {
		errores.cantidadBids = 'Tienes que poner un número valido de cantidad de Bids';
	}
	if (!valores.price) {
		errores.price = 'El precio no puede ir vacio';
	}

	if (valores.background.trim() === '') {
		errores.background = 'Tiene que tener un fondo obligatoriamente';
	}

	return errores;
};

export default validarPaqueteBid;
