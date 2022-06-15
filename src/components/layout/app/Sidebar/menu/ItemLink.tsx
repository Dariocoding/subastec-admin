import * as React from 'react';
import TreeViewLink from './Items/TreeViewLink';
import SingleLink from './Items/SingleLink';
import { useAuthContext } from '../../../../../context/autenticacion/authState';
import { SidebarMenuInterface } from './SidebarData';
const sizeIcon = 18;

export interface IItemLinkProps {
	Item: SidebarMenuInterface;
	sizeIcon?: number;
	subnav?: string;
	setSubnav?(stateSubNav: string): void;
}
const ItemLink: React.FunctionComponent<IItemLinkProps> = props => {
	const { Item, subnav, setSubnav } = props;
	const { usuario } = useAuthContext();
	const validacion = Item.permisos === '*' || Item.permisos.includes(usuario?.rol?.idrol);

	if (!validacion) return null;

	return !Item.subNav ? (
		<SingleLink Item={Item} sizeIcon={sizeIcon} />
	) : (
		<TreeViewLink
			Item={Item}
			sizeIcon={sizeIcon}
			setSubnav={setSubnav}
			subnav={subnav}
		/>
	);
};
export default React.memo(ItemLink);
