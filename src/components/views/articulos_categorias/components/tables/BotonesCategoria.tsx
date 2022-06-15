import { FaTrash, FaEye, FaPen } from 'react-icons/fa';
import Dropdown, { ButtonDropdown } from '../../../../layout/common/tables/Dropdown';

interface IBotonesCategoriasProps {
	idcategoria: number;
	eliminarCategoria(id: number): void;
	setEditarCategoria(id: number): void;
}

const BotonesCategorias: React.FunctionComponent<IBotonesCategoriasProps> = props => {
	const { idcategoria, eliminarCategoria, setEditarCategoria } = props;

	const handleUpdate = () => setEditarCategoria(idcategoria);
	const handleDelete = () => eliminarCategoria(idcategoria);

	return (
		<Dropdown>
			<ButtonDropdown
				color="primary"
				to={`categorias/ver-categoria/${idcategoria}`}
			>
				<FaEye /> Ver Categoría
			</ButtonDropdown>
			<ButtonDropdown color="secondary" onClick={handleUpdate}>
				<FaPen /> Editar Categoría
			</ButtonDropdown>
			<ButtonDropdown onClick={handleDelete} color={'danger'}>
				<FaTrash /> Eliminar Categoría
			</ButtonDropdown>
		</Dropdown>
	);
};

export default BotonesCategorias;
