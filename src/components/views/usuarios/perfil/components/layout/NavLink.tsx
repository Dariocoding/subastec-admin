interface INavLinkProps {
	handleClick(): void;
	itemActual: string;
	title: string;
}

const NavLink: React.FunctionComponent<INavLinkProps> = props => (
	<li
		onClick={props.handleClick}
		style={{ cursor: 'pointer' }}
		className={`nav-link${props.itemActual === props.title ? ' active' : ''}`}
	>
		<span className="nav-link">{props.title}</span>
	</li>
);
export default NavLink;
