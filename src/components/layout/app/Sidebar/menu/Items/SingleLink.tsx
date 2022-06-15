import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { IItemLinkProps } from '../ItemLink';
const SingleLink = ({ Item, sizeIcon }: IItemLinkProps) => {
	const { pathname } = useLocation();
	const isActive = Item.path === pathname ? ' active' : '';

	if (typeof Item.path !== 'string') return null;

	return (
		<li>
			<Link className={`app-menu__item${isActive}`} to={'/admin' + Item.path}>
				<Item.Icon className="app-menu__icon" size={sizeIcon} />
				<span className="app-menu__label">{Item.title}</span>
			</Link>
		</li>
	);
};

export default SingleLink;
