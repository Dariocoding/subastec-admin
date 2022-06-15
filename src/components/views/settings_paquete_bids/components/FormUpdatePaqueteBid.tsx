import { Formik, Form } from 'formik';
import CardBid from './CardBid';
import clienteAxios from '../../../../config/axios';
import { Input, Button } from '../../../layout/common/forms';
import { handleError, controlDecimal } from '../../../utils';
import validarPaqueteBid from '../validations/validarPaqueteBid';
import { toast } from 'react-toastify';
import { PaqueteBidType } from '../types';
import { useModal } from '../../../../context/modal/ModalState';

interface IFormUpdatePaqueteBidProps {
	paqueteBid: PaqueteBidType;
	editPaquete(paqueteBid: PaqueteBidType): void;
}

const FormUpdatePaqueteBid: React.FunctionComponent<IFormUpdatePaqueteBidProps> = props => {
	const { setShowModal } = useModal();
	const { editPaquete, paqueteBid } = props;
	const INITIAL_STATE: PaqueteBidType = {
		bonus: paqueteBid.bonus,
		cantidadBids: paqueteBid.cantidadBids,
		price: paqueteBid.price.toString(),
		background: paqueteBid.background,
	};

	//@ts-ignore
	async function handleSubmit(values, actions) {
		try {
			const { data } = await clienteAxios.put(
				'/paquete-bids/' + paqueteBid.idpaquete,
				values
			);
			toast.success(data.msg);
			editPaquete(data.paqueteBid);
			setShowModal(false);
		} catch (error) {
			handleError(error);
		} finally {
			actions.setSubmitting(false);
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

export default FormUpdatePaqueteBid;
