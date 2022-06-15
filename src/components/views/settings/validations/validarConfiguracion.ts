import { SettingsType } from '../types';

const validarConfiguracion = (valores: SettingsType) => {
	let errores: SettingsType = {};

	if (valores.nombre.trim() === '') {
		errores.nombre = 'Debe introducir el nombre del sitio.';
	}

	return errores;
};

export default validarConfiguracion;
