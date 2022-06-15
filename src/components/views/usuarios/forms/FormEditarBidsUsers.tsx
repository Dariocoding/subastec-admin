import { useState } from 'react';
import { FaCoins, FaPlus, FaMinus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import clienteAxios from '../../../../config/axios';
import { handleError } from '../../../utils';
import { Input, Button } from '../../../layout/common/forms';
import { Formik, Form, FormikHelpers } from 'formik';
import { useModal } from '../../../../context/modal/ModalState';
import { UserType } from '../types';

interface IFormEditarBidUsersProps {
	usuario: UserType;
	editBitsUser(bids: number, iduser: number): void;
}
const FormEditarBidsUsers: React.FunctionComponent<IFormEditarBidUsersProps> = props => {
	const { usuario, editBitsUser } = props;
	const { setBgHeaderModal, cerrarModal } = useModal();
	const [statusAddRemoveBids, setStatusAddRemoveBids] = useState('add');
	const [bidsActual, setBidsActual] = useState(usuario.bids);

	const INITIAL_VALUES = {
		bids: '',
		iduser: usuario.iduser,
	};

	async function updateBids(values: typeof INITIAL_VALUES) {
		try {
			if (values.bids === '') {
				return toast.error('Tienes que escribir un número');
			}
			const url = `administradores/add-remove-bids`;
			const { data } = await clienteAxios.put(url, {
				...values,
				statusAddRemoveBids,
			});
			toast.success(data.msg);
			setBidsActual(data.bids);
			editBitsUser(data.bids, values.iduser);
			cerrarModal();
		} catch (e) {
			handleError(e);
		}
	}

	const addBidsSet = () => {
		setBgHeaderModal('primary');
		setStatusAddRemoveBids('add');
	};
	const removeBidsSet = () => {
		setBgHeaderModal('danger');
		setStatusAddRemoveBids('remove');
	};

	return (
		<Formik initialValues={INITIAL_VALUES} onSubmit={updateBids}>
			<Form>
				<h4 className="text-center mb-3">
					{statusAddRemoveBids === 'add' ? 'Añadir' : 'Eliminar'} bids{' '}
					<FaCoins />
				</h4>

				<h6 className="text-left">Este Usuario tiene {bidsActual} bids</h6>

				<Input
					label="Cantidad de Bids"
					type="number"
					name="bids"
					placeholder="Ingrese la cantidad de bids"
				/>

				<div className="form-group">
					<div className="d-flex">
						<button
							type="button"
							className="btn btn-info w-100"
							onClick={addBidsSet}
						>
							<h5 className="mt-2">Añadir</h5>
							<FaPlus />
						</button>

						<button
							type="button"
							className="btn btn-danger w-100"
							onClick={removeBidsSet}
						>
							<h5 className="mt-2">Quitar</h5>
							<FaMinus />
						</button>
					</div>
				</div>

				<Button
					text={
						statusAddRemoveBids === 'add'
							? 'Añadir Bids'
							: 'Quitar Bids'
					}
					Icon={FaCoins}
				/>
			</Form>
		</Formik>
	);
};

export default FormEditarBidsUsers;
