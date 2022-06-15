import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaCircleNotch, FaChevronDown, FaChevronLeft } from 'react-icons/fa';
import { FunctionComponent } from 'react';
import { IItemLinkProps } from '../ItemLink';
const TreeViewLink: FunctionComponent<IItemLinkProps> = props => {
	const { Item, setSubnav, sizeIcon, subnav } = props;
	const { pathname } = useLocation();
	function handleChangePage() {
		Item.title === subnav ? setSubnav('') : setSubnav(Item.title);
	}

	const isActive = Item.path.includes(pathname);
	const isOpen = Item.title === subnav;

	return (
		<li className={`treeview  ${isOpen ? 'is-expanded' : ''}`}>
			<span
				onClick={handleChangePage}
				className={`app-menu__item ${isActive ? 'active' : ''}`}
			>
				<Item.Icon className="app-menu__icon" size={sizeIcon} />
				<span className="app-menu__label">{Item.title}</span>
				{Item.title === subnav ? (
					<FaChevronLeft className="treeview-indicator" />
				) : (
					<FaChevronDown className="treeview-indicator" />
				)}
			</span>
			<ul className="treeview-menu">
				{Item.subNav.map(subMenuItem => (
					<li key={subMenuItem.title}>
						<Link
							className="treeview-item"
							to={'/admin' + subMenuItem.path}
						>
							<FaCircleNotch className="app-menu__icon" />
							{subMenuItem.title}
						</Link>
					</li>
				))}
			</ul>
		</li>
	);
};

export default TreeViewLink;
