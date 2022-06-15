import { SubastaType } from '../../types';

const validarSubasta = (valores: SubastaType) => {
	let errores: SubastaType = {};

	/* 	if (valores.titulo.trim() === '') {
		errores.titulo = 'Tienes que escribir un titulo';
	} */

	if (!valores.productoid && !valores.paqueteBidId) {
		errores.productoid = 'Tienes que elegir un valor';
		errores.paqueteBidId = 'Tienes que elegir un valor';
	}

	if (!valores.costopuja) {
		errores.costopuja = 'Escribe un costo de puja, por favor';
	}

	if (!valores.preciominimo) {
		errores.preciominimo = 'Tienes que escribir un precio minimo, por favor';
	}

	return errores;
};

export default validarSubasta;
