import { IInputProps } from '../../../../layout/common/forms/Input';
import { controlDecimal } from '../../../../utils';

const dataInputsSubastas: IInputProps[] = [
	{
		label: 'Titulo',
		name: 'titulo',
		placeholder: 'Ingrese titulo de la subasta',
	},
	{
		label: 'Costo Puja',
		type: 'number',
		required: true,
		name: 'costopuja',
		placeholder: 'Ingrese costo puja',
	},
	{
		label: 'Costo Minimo',
		name: 'preciominimo',
		required: true,
		placeholder: 'Ingrese el costo minimo',
		onChange(e, setInput) {
			e.target.value = controlDecimal(e.target.value);
			setInput(e);
		},
	},
];

export default dataInputsSubastas;
