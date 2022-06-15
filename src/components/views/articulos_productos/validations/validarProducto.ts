import { ProductoType } from '../types';

const validarCategoria = (valores: ProductoType) => {
	let errores: ProductoType = {};

	if (valores.nombre.trim() === '') {
		errores.nombre = 'El nombre del producto es obligatorio.';
	}

	if (!valores.precio) {
		errores.precio = 'El precio es obligatorio.';
	}

	if (!valores.categoriaid) {
		errores.categoriaid = 'Debes elegir una categoria';
	}

	return errores;
};

export default validarCategoria;
