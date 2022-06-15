import { FaChevronDown, FaChevronUp, FaCircleNotch, FaTachometerAlt } from 'react-icons/fa';
import { RiSettingsFill } from 'react-icons/ri';
import { AiFillAppstore } from 'react-icons/ai';
import { TiUser } from 'react-icons/ti';
import { SiHomeassistantcommunitystore } from 'react-icons/si';
import { MdOutlinePayments } from 'react-icons/md';
import { IconType } from 'react-icons';
import { RADMIN } from '../../../../utils';

export interface SidebarMenuInterface {
	title: string;
	path?: string | Array<string>;
	Icon: IconType;
	permisos: Array<number> | '*';
	subNav?: Array<{ title: string; path: string }>;
}

const SidebarData: SidebarMenuInterface[] = [
	{
		title: 'Inicio',
		path: '/home',
		Icon: FaTachometerAlt,
		permisos: '*',
	},

	{
		title: 'Usuarios',
		Icon: TiUser,
		permisos: [RADMIN],
		path: ['/usuarios/administradores', '/usuarios'],

		subNav: [
			{
				title: 'Administradores',
				path: '/usuarios/administradores',
			},
			{
				title: 'Usuarios',
				path: '/usuarios',
			},
		],
	},
	{
		title: 'Artículos',
		Icon: AiFillAppstore,
		permisos: [RADMIN],
		path: ['/articulos', '/categorias'],

		subNav: [
			{
				title: 'Artículos',
				path: '/articulos',
			},
			{
				title: 'Categorias',
				path: '/categorias',
			},
		],
	},

	{
		title: 'Subastas',
		path: '/subastas',
		Icon: SiHomeassistantcommunitystore,
		permisos: [RADMIN],
	},

	{
		title: 'Pagos',
		path: '/pagos',
		Icon: MdOutlinePayments,
		permisos: [RADMIN],
	},

	{
		title: 'Configuración',
		path: '/settings',
		Icon: RiSettingsFill,
		permisos: [RADMIN],
	},
];

export default SidebarData;
