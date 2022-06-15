import { UserType } from '../types';

const validarUsuario = (valores: UserType) => {
	let errores: UserType = {};

	if (valores.username.trim() === '') {
		errores.username = 'El Nombre de usuario es obligatorio';
	}

	if (valores.nombres.trim() === '') {
		errores.nombres = 'El Nombre es obligatorio';
	}

	if (valores.apellidos.trim() === '') {
		errores.apellidos = 'El Apellido es obligatorio';
	}

	if (valores.email_user.trim() === '') {
		errores.email_user = 'El Correo es Obligatorio';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email_user.trim())) {
		errores.email_user = 'Email no válido';
	}

	if (valores.password?.trim() === '') {
		errores.password = 'La contraseña no puede ir vacía';
	}

	return errores;
};

export default validarUsuario;
