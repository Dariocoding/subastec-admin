import { IInputProps } from '../../../../layout/common/forms/Input';
import { controlDecimal } from '../../../../utils';
const dataInputsProducto: IInputProps[] = [
	{
		label: 'Código',
		name: 'codigo',
		placeholder: 'Ingresa el código del artículo',
	},

	{
		label: 'Código Tarjeta',
		name: 'codigoTarjeta',
		placeholder: 'Ingresa el código de una Tarjeta',
	},

	{
		label: 'Nombre Artículo',
		required: true,
		name: 'nombre',
		placeholder: 'Ingresa el nombre del artículo',
	},
	{
		label: 'Marca',
		name: 'marca',
		placeholder: 'Ingresa la marca del artículo',
	},
	{
		label: 'Precio Artículo',
		required: true,
		name: 'precio',
		placeholder: 'Ingresa el precio del artículo',
		onChange(e, handleChange) {
			e.target.value = controlDecimal(e.target.value);
			handleChange(e);
		},
	},
];

export default dataInputsProducto;
