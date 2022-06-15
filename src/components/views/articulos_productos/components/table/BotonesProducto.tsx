import { FaPen, FaTrash, FaEye } from 'react-icons/fa';
import Dropdown, { ButtonDropdown } from '../../../../layout/common/tables/Dropdown';
import { ProductoType } from '../../types';

interface IBotonesProductosProps {
	element: ProductoType;
	eliminarProducto(id: number): void;
	editarProducto?(id: number): void;
}

const BotoneProductos: React.FunctionComponent<IBotonesProductosProps> = props => {
	const { element, eliminarProducto, editarProducto } = props;
	const { idproducto } = element;

	const handleUpdate = () => editarProducto(idproducto);
	const handleDelete = () => eliminarProducto(idproducto);
	return (
		<Dropdown>
			<ButtonDropdown
				color={'primary'}
				to={`/admin/articulos/ver-articulo/${idproducto}`}
			>
				<FaEye /> Ver Artículo
			</ButtonDropdown>
			<ButtonDropdown color="secondary" onClick={handleUpdate}>
				<FaPen /> Editar Artículo
			</ButtonDropdown>
			{eliminarProducto ? (
				<ButtonDropdown color={'danger'} onClick={handleDelete}>
					<FaTrash /> Eliminar Artículo
				</ButtonDropdown>
			) : null}
		</Dropdown>
	);
};

export default BotoneProductos;
