import { FaUserTag, FaBoxes, FaTags } from 'react-icons/fa';
import { MdOutlinePayments } from 'react-icons/md';

interface DataWidgetsAdminProps {
	totalProductos: number;
	totalUsuarios: number;
	totalPagos: number;
	totalSubastas: number;
}

//@ts-ignore
const DataWidgetsAdmin = (data: DataWidgetsAdminProps) => [
	{
		title: 'Artículos',
		path: '/articulos',
		Icon: FaBoxes,
		colouredIcon: 'info',
		valor: data.totalProductos,
	},
	{
		title: 'Subastas',
		path: '/categorias',
		Icon: FaTags,
		colouredIcon: 'warning',
		valor: data.totalSubastas,
	},
	{
		title: 'Usuarios',
		path: '/usuarios',
		Icon: FaUserTag,
		colouredIcon: 'danger',
		valor: data.totalUsuarios,
	},

	{
		title: 'Pagos',
		path: '/pedidos',
		Icon: MdOutlinePayments,
		colouredIcon: 'primary',
		valor: data.totalPagos,
	},
];

export default DataWidgetsAdmin;
