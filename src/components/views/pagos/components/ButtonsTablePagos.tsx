import * as React from 'react';
import { FaEye } from 'react-icons/fa';
import Dropdown, { ButtonDropdown } from '../../../layout/common/tables/Dropdown';

interface IButtonsTablePagosProps {
	idpago: number;
	viewPago(idpago: number): void;
}

const ButtonsTablePagos: React.FunctionComponent<IButtonsTablePagosProps> = props => {
	const { idpago, viewPago } = props;
	const handleView = () => viewPago(idpago);
	return (
		<Dropdown>
			<ButtonDropdown color={'primary'} onClick={handleView}>
				<FaEye /> Ver Pago
			</ButtonDropdown>
		</Dropdown>
	);
};

export default ButtonsTablePagos;
