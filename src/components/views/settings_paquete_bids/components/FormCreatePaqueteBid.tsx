import { Formik, Form } from 'formik';
import CardBid from './CardBid';
import clienteAxios from '../../../../config/axios';
import { Input, Button } from '../../../layout/common/forms';
import { handleError, controlDecimal } from '../../../utils';
import validarPaqueteBid from '../validations/validarPaqueteBid';
import { toast } from 'react-toastify';
import { PaqueteBidType } from '../types';
import { useModal } from '../../../../context/modal/ModalState';

interface IFormCrearPaqueteBidProps {
	addPaquete(paquebid: PaqueteBidType): void;
}

const FormCreatePaqueteBid: React.FunctionComponent<IFormCrearPaqueteBidProps> = props => {
	const { setShowModal } = useModal();
	const INITIAL_STATE: PaqueteBidType = {
		bonus: 0,
		cantidadBids: 0,
		price: '',
		background: '',
	};

	// @ts-ignore
	async function handleSubmit(values) {
		try {
			const { data } = await clienteAxios.post('/paquete-bids', values);
			toast.success(data.msg);
			props.addPaquete(data.paqueteBid);
			setShowModal(false);
		} catch (error) {
			handleError(error);
		}
	}

	return (
		<Formik
			initialValues={INITIAL_STATE}
			validate={validarPaqueteBid}
			onSubmit={handleSubmit}
		>
			{({ values }) => (
				<Form>
					<div className="row">
						<div className="col-lg-6">
							<Input
								label="Cantidad de Bids"
								type="number"
								name="cantidadBids"
								required
								placeholder="Ingrese la cantidad de bids"
							/>

							<Input
								label="Bonus"
								type="number"
								name="bonus"
								placeholder="Ingrese los bonus"
							/>

							<Input
								label="Precio"
								name="price"
								required
								placeholder="Ingrese el precio"
								onChange={(e, handleChange) => {
									e.target.value =
										controlDecimal(
											e.target
												.value
										);
									handleChange(e);
								}}
							/>

							<Input
								label="Color de Fondo"
								name="background"
								required
								placeholder="Ingrese el color de fondo"
							/>

							<Button text={'Crear Paquete'} />
						</div>
						<div className="col-lg-6">
							<CardBid
								bonus={values.bonus}
								cantidadBids={values.cantidadBids}
								price={values.price}
								background={values.background}
							/>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default FormCreatePaqueteBid;
