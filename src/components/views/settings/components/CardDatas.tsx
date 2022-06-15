import { FaPaperPlane, FaStar } from 'react-icons/fa';
import { BiPackage } from 'react-icons/bi';
import { ICardProps } from './Card';
const CardDatas: ICardProps[] = [
	{
		Icon: FaPaperPlane,
		title: 'Contactos',
		url: '/settings/contactos',
		descripcion: '¡Mira los mensajes desde aqui!',
		className: 'bg-primary',
		btnLinkText: 'Ver contactos',
	},
	{
		Icon: BiPackage,
		title: 'Paquete Bids',
		url: '/settings/paquete-bids',
		descripcion: '¡Administra los paquete de Bids!',
		className: 'bg-danger',
		btnLinkText: 'Ver Paquete Bids',
	},
	{
		Icon: FaStar,
		title: 'Subastas Destacadas',
		url: '/settings/subastas-destacadas',
		descripcion: '¡Empieza destacando las subastas que prefieras!',
		className: 'bg-success',
		btnLinkText: 'Destacar subastas',
	},
];

export default CardDatas;
