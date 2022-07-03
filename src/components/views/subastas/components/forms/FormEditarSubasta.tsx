import { useState } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import validarSubasta from '../validations/validarSubasta';
import dataInputsSubastas from './dataInputs';

// COMPONENTS
import { Input, Select, Button, DateTimePicker } from '../../../../layout/common/forms';
import MostrarElementSelected from './MostrarElementSelected';

// HOOKS
import useTabs from '../../../../../hooks/useTabs';
import { toast } from 'react-toastify';
import { controlDecimal, handleError, fechaActual } from '../../../../utils';
import clienteAxios from '../../../../../config/axios';
import { SubastaType } from '../../types';
import { ProductoType } from '../../../articulos_productos/types';
import { PaqueteBidType } from '../../../settings_paquete_bids/types';
import { useModal } from '../../../../../context/modal/ModalState';

interface IFormEditarSubastaProps {
	setSubasta(value: SubastaType): void;
	productos: ProductoType[];
	paqueteBids: PaqueteBidType[];
	subasta: SubastaType;
}

const FormEditarSubasta: React.FunctionComponent<IFormEditarSubastaProps> = props => {
	const { setSubasta, subasta, productos, paqueteBids } = props;
	const [productoActual, setProductoActual] = useState(subasta.productoid);
	const { cerrarModal } = useModal();
	const [paqueteBidSelecionado, setPaqueteBidSeleccionado] = useState(subasta.paqueteBidId);
	const [fotoSubasta, setFotoSubasta] = useState(subasta.fotoSubasta);
	const { Tabset, selectedTab } = useTabs({
		arrValues: [
			{ label: 'Producto', name: 'producto' },
			{ label: 'Paquete Bid', name: 'paqueteBid' },
		],
		initialSelected: subasta.productoid ? 'producto' : 'paqueteBid',
	});

	const INITIAL_VALUES: SubastaType = {
		titulo: subasta.titulo,
		productoid: subasta.productoid,
		paqueteBidId: subasta.paqueteBidId,
		costopuja: subasta.costopuja,
		fechaFinalizacion: subasta.fechaFinalizacion,
		fechaInicio: subasta.fechaInicio,
		// @ts-ignore
		preciominimo: controlDecimal(subasta.preciominimo.toFixed(2)),
	};

	async function handleSubmit(values: SubastaType, actions: FormikHelpers<any>) {
		if (values.fechaInicio >= values.fechaFinalizacion) {
			return toast.error('Fecha actual no puede ser mayor que la finalizacion');
		}

		if (productoActual) {
			if (!fotoSubasta) return toast.error('Por favor, elige una foto');
		}

		try {
			const url = `subastas/${subasta.idsubasta}`;
			const { data } = await clienteAxios.put(url, {
				...values,
				fotoSubasta,
			});

			toast.success(data.msg);
			setSubasta(data.subasta);
			cerrarModal();
		} catch (error) {
			handleError(error);
		} finally {
			actions.setSubmitting(false);
		}
	}

	//@ts-ignore
	function onChangeTab(selected, setFieldValue) {
		if (selected !== selectedTab) {
			if (selected === 'producto') {
				setPaqueteBidSeleccionado(null);
				setFieldValue('paqueteBidId', null);
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
								label="Fecha Inicio"
								minDate={fechaActual()}
								name={'fechaInicio'}
							/>

							<DateTimePicker
								label="Fecha Finalizacion"
								minDate={fechaActual()}
								name={'fechaFinalizacion'}
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

							<Button text={'Editar Subasta'} />
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

export default FormEditarSubasta;
