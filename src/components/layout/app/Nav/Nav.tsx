import { memo } from 'react';
import styled from 'styled-components';
import { FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NavItem = styled(Link)`
	display: block;
	padding: 15px;
	line-height: 20px;
	color: #fff;
	transition: background-color 0.3s ease;
	background: rgba(0, 0, 0, 0.1);
	color: #f6f6f6;
`;

const Nav = () => (
	<ul className="app-nav">
		<li>
			<NavItem to={'/admin/usuarios/perfil'}>
				<FaUserAlt />
			</NavItem>
		</li>
	</ul>
);

export default memo(Nav);
