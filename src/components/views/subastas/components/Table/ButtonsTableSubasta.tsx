import { FaInfoCircle, FaPen, FaTrash } from 'react-icons/fa';
import Dropdown, { ButtonDropdown } from '../../../../layout/common/tables/Dropdown';
import { SubastaType } from '../../types';

interface IButtonsSubasta {
	el: SubastaType;
	eliminarSubasta(id: number): void;
	editarSubasta(id: number): void;
}

const ButtonsTableSubasta: React.FunctionComponent<IButtonsSubasta> = props => {
	const { el, eliminarSubasta, editarSubasta } = props;
	const { idsubasta } = el;

	const handleUpdate = () => editarSubasta(idsubasta);
	const handleDelete = () => eliminarSubasta(idsubasta);

	return (
		<Dropdown>
			<ButtonDropdown
				color="info"
				to={`/admin/subastas/detalle-subasta/${idsubasta}`}
			>
				<FaInfoCircle /> Detalle Subasta
			</ButtonDropdown>
			<ButtonDropdown color="primary" onClick={handleUpdate}>
				<FaPen /> Editar Subasta
			</ButtonDropdown>
			<ButtonDropdown color="danger" onClick={handleDelete}>
				<FaTrash /> Eliminar Subasta
			</ButtonDropdown>
		</Dropdown>
	);
};

export default ButtonsTableSubasta;
