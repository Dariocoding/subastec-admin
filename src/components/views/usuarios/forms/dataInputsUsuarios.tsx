import { IInputProps } from '../../../layout/common/forms/Input';

interface DataInterface extends IInputProps {
	col: string;
}

const dataInputsUsuarios: DataInterface[] = [
	{
		label: 'Nombre de Usuario',
		name: 'username',
		required: true,
		placeholder: 'Ingresa el nombre de usuario',
		col: 'col-lg-8',
	},
	{
		label: 'Nombres',
		required: true,
		name: 'nombres',
		placeholder: 'Ingrese el Nombre',
		col: 'col-lg-6',
	},
	{
		label: 'Apellidos',
		name: 'apellidos',
		placeholder: 'Ingresa el apellido',
		required: true,
		col: 'col-lg-6',
	},
	{
		label: 'Correo',
		name: 'email_user',
		placeholder: 'Ingresa el correo',
		required: true,
		col: 'col-lg-6',
	},
	{
		label: 'Teléfono',
		name: 'telefono',
		placeholder: 'Ingresa el telefono',
		col: 'col-lg-6',
	},
	{
		label: 'Contraseña',
		name: 'password',
		type: 'password',
		placeholder: 'Ingresa la contraseña',
		required: true,
		col: 'col-lg-6',
	},
];

export default dataInputsUsuarios;
