import { useState } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import validarSubasta from '../validations/validarSubasta';
import dataInputsSubastas from './dataInputs';

// COMPONENTS
import { Input, Select, Button, DateTimePicker } from '../../../../layout/common/forms';
import MostrarElementSelected from './MostrarElementSelected';
import moment from 'moment-timezone';
// HOOKS
import useTabs from '../../../../../hooks/useTabs';
import { toast } from 'react-toastify';
import { fechaActual, handleError } from '../../../../utils';
import clienteAxios from '../../../../../config/axios';
import { SubastaType } from '../../types';
import { ProductoType } from '../../../articulos_productos/types';
import { PaqueteBidType } from '../../../settings_paquete_bids/types';
import { useModal } from '../../../../../context/modal/ModalState';

interface IFormCrearSubastaProps {
	addSubasta(value: SubastaType): void;
	productos: ProductoType[];
	paqueteBids: PaqueteBidType[];
}

moment.tz.setDefault('America/Guayaquil');
const FormCrearSubasta: React.FC<IFormCrearSubastaProps> = props => {
	console.log(mo);
	const { addSubasta, productos, paqueteBids } = props;
	const { cerrarModal } = useModal();
	const [productoActual, setProductoActual] = useState(null);
	const [paqueteBidSelecionado, setPaqueteBidSeleccionado] = useState(null);
	const [fotoSubasta, setFotoSubasta] = useState('');
	const { Tabset, selectedTab } = useTabs({
		arrValues: [
			{ label: 'Producto', name: 'producto' },
			{ label: 'Paquete Bid', name: 'paqueteBid' },
		],
	});
	const INITIAL_VALUES: SubastaType = {
		titulo: '',
		productoid: null,
		paqueteBidId: null,
		costopuja: 1,
		preciominimo: '',
		fechaInicio: fechaActual(),
		fechaFinalizacion: fechaActual(),
	};

	async function handleSubmit(values: SubastaType) {
		if (values.fechaInicio >= values.fechaFinalizacion) {
			return toast.error('Fecha actual no puede ser mayor que la finalizacion');
		}

		if (productoActual) {
			if (!fotoSubasta) return toast.error('Por favor, elige una foto');
		}

		try {
			const { data } = await clienteAxios.post('/subastas', {
				...values,
				fotoSubasta,
			});

			toast.success(data.msg);
			setProductoActual(null);
			setPaqueteBidSeleccionado(null);
			addSubasta(data.subasta);
			cerrarModal();
		} catch (error) {
			handleError(error);
		}
	}

	// @ts-ignore
	function onChangeTab(selected, setFieldValue) {
		if (selected !== selectedTab) {
			if (selected === 'producto') {
				setPaqueteBidSeleccionado(null);
				setFieldValue('paqueteBid', null);
			}
			if (selected === 'paqueteBid') {
				setProductoActual(null);
				setFieldValue('productoid', null);
			}
			setFotoSubasta(null);
		}
	}
	const isSelectedProducto = selectedTab === 'producto';

	function onChangeSelect(value: string) {
		if (isSelectedProducto) setProductoActual(value);
		else setPaqueteBidSeleccionado(value);
		setFotoSubasta(null);
	}

	const arrSelect =
		selectedTab === 'producto'
			? productos.map(p => ({
					label: p.nombre,
					value: p.idproducto,
			  }))
			: paqueteBids.map(p => ({
					label: p.cantidadBids + ' Bids',
					value: p.idpaquete,
			  }));

	return (
		<Formik
			validate={validarSubasta}
			initialValues={INITIAL_VALUES}
			onSubmit={handleSubmit}
		>
			{({ setFieldValue }) => (
				<Form>
					<Tabset
						onChange={selected =>
							onChangeTab(selected, setFieldValue)
						}
					/>

					<div className="row">
						<div className="col-lg-6">
							{dataInputsSubastas.map(field => (
								<Input
									{...field}
									key={field.name}
								/>
							))}

							<DateTimePicker
								name={'fechaInicio'}
								label={'Fecha Inicio'}
								minDate={fechaActual()}
								required
							/>

							<DateTimePicker
								name={'fechaFinalizacion'}
								label={'Fecha Finalizacion'}
								minDate={fechaActual()}
								required
							/>

							<Select
								label={
									isSelectedProducto
										? 'Elija un producto'
										: 'Elija un paquete de Bids'
								}
								required
								values={arrSelect}
								name={
									isSelectedProducto
										? 'productoid'
										: 'paqueteBidId'
								}
								busquedaInput
								onChange={onChangeSelect}
							/>

							<Button text={'Crear Subasta'} />
						</div>
						<div className="col-lg-6">
							<MostrarElementSelected
								productoSeleccionado={
									productoActual
								}
								paqueteBidSeleccionado={
									paqueteBidSelecionado
								}
								paqueteBids={paqueteBids}
								productos={productos}
								setFotoSubasta={setFotoSubasta}
								fotoSubasta={fotoSubasta}
							/>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default FormCrearSubasta;
