import { ChangePasswordType } from '../types';

const validarPasswordPerfil = (valores: ChangePasswordType) => {
	let errores: ChangePasswordType = {};

	if (valores.password.trim() === '') {
		errores.password = 'La contraseña es obligatoria';
	} else {
		if (valores.password.trim() !== valores.passwordConfirm.trim()) {
			errores.password = 'Las contraseñas no son iguales';
		}

		if (valores.password.trim().length < 6) {
			errores.password = 'La contraseña debe ser de al menos 6 caracteres';
		}
	}

	return errores;
};

export default validarPasswordPerfil;
