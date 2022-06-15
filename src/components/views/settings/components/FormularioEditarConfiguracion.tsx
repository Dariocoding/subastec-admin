import { toast } from 'react-toastify';
import { FaCogs } from 'react-icons/fa';
import { Formik, Form } from 'formik';
import { handleError } from '../../../utils';
import validarConfiguracion from '../validations/validarConfiguracion';
import clienteAxios from '../../../../config/axios';
import { Input, Textarea, Button, SelectDefault } from '../../../layout/common/forms';
import { useConfigContext } from '../../../../context/configuracion/ConfigState';
import { SettingsType } from '../types';
import { IInputProps } from '../../../layout/common/forms/Input';

const FormularioEditarConfiguracion: React.FunctionComponent = () => {
	const { configuracion, obtenerConfiguracion } = useConfigContext();
	const INITIAL_VALUES: SettingsType = {
		nombre: configuracion.nombre,
		correo: configuracion.correo,
		direccion: configuracion.direccion,
		cantidad_subastas_inicio: configuracion.cantidad_subastas_inicio,
		telefono: configuracion.telefono,
		web: configuracion.web,
		orden_categoria: configuracion.orden_categoria,
		bidsAfiliados: configuracion.bidsAfiliados,
	};

	async function actualizarConfiguracion(values: SettingsType) {
		try {
			const response = await clienteAxios.put('/settings', values);
			toast.success(response.data.msg);
			obtenerConfiguracion();
		} catch (e) {
			handleError(e);
		}
	}

	const dataInputs: IInputProps[] = [
		{
			label: 'Nombre',
			name: 'nombre',
			placeholder: 'Ingresa el nombre de la empresa o app',
		},
		{
			label: 'Teléfono',
			name: 'telefono',
			placeholder: 'Ingresa el telefono',
		},
		{
			label: 'Correo',
			name: 'correo',
			placeholder: 'Ingresa el correo',
		},
		{
			label: 'URL WEB',
			name: 'urlweb',
			placeholder: 'Ingresa la url del sitio',
		},

		{
			type: 'number',
			label: 'Cantidad Subastas Inicio',
			name: 'cantidad_subastas_inicio',
			placeholder: 'Ingresa la cantidad',
		},

		{
			type: 'number',
			label: 'Cantidad Bids Afiliados',
			name: 'bidsAfiliados',
			placeholder: 'Ingresa la cantidad de bids',
		},
	];

	return (
		<Formik
			initialValues={INITIAL_VALUES}
			onSubmit={actualizarConfiguracion}
			validate={validarConfiguracion}
		>
			<Form>
				<h4 className="text-center">
					Editar Configuracion <FaCogs />
				</h4>
				{dataInputs.map(input => (
					<Input {...input} key={input.name} />
				))}

				<SelectDefault name="orden_categoria" label="Orden Categorías">
					<option value="ASC">ASC</option>
					<option value="DESC">DESC</option>
					<option value="RAND">RAND</option>
					<option value="ALPHABET">ALPHABET</option>
				</SelectDefault>

				<Textarea label={'Dirección'} name={'direccion'} />

				<Button text={'Actualizar Configuración'} />
			</Form>
		</Formik>
	);
};

export default FormularioEditarConfiguracion;
