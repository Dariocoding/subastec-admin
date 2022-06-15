import { CategoriaType } from '../types';

const validarCategoria = (valores: CategoriaType) => {
	let errores: CategoriaType = {};

	if (valores.nombre.trim() === '') {
		errores.nombre = 'El titulo de una categoría es obligatoria.';
	}

	if (!valores.status) {
		errores.status = 'El estado es obligatorio';
	}

	return errores;
};

export default validarCategoria;
