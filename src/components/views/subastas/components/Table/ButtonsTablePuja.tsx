import * as React from 'react';
import { FaEye } from 'react-icons/fa';
import Dropdown, { ButtonDropdown } from '../../../../layout/common/tables/Dropdown';
import { PujaTableType } from '../../types';

interface IButtonsTablePujaProps {
	puja: PujaTableType;
}

const ButtonsTablePuja: React.FC<IButtonsTablePujaProps> = props => {
	const { puja } = props;
	return (
		<Dropdown>
			<ButtonDropdown color="primary">
				<FaEye />
				Ver Usuario
			</ButtonDropdown>
		</Dropdown>
	);
};

export default ButtonsTablePuja;
