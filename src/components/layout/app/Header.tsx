import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import { FaBars } from 'react-icons/fa';
import useComponentVisible from '../../../hooks/useComponentVisible';
import Nav from './Nav/Nav';

import { useConfigContext } from '../../../context/configuracion/ConfigState';

const Header = () => {
	const { configuracion } = useConfigContext();
	const [sidebarCerrado, setSidebarCerrado] = useState(
		localStorage.getItem('sidebar') ? (window.innerWidth < 770 ? false : true) : false
	);
	const [actualWidth, setActualWidth] = useState(window.innerWidth);
	const { ref, isComponentVisible, eventTarget } = useComponentVisible();

	useEffect(() => {
		if (sidebarCerrado) {
			if (!document.body.classList.contains('sidenav-toggled')) {
				document.body.classList.add('sidenav-toggled');
			}
		} else {
			if (document.body.classList.contains('sidenav-toggled')) {
				document.body.classList.remove('sidenav-toggled');
			}
		}
	}, [sidebarCerrado]);

	window.addEventListener('resize', () => setActualWidth(window.innerWidth));

	useEffect(() => {
		if (ref && actualWidth < 770 && isComponentVisible && sidebarCerrado) {
			if (!eventTarget?.classList.contains('app-sidebar__toggle')) {
				setSidebarCerrado(false);
			}
		}
	}, [ref, isComponentVisible, actualWidth, sidebarCerrado, eventTarget?.classList]);

	const handleAppSidebarToggle = () => {
		setSidebarCerrado(!sidebarCerrado);
		if (actualWidth > 770) {
			if (!sidebarCerrado) {
				localStorage.setItem('sidebar', '1');
			} else {
				localStorage.removeItem('sidebar');
			}
		}
	};

	return (
		<>
			<header className="app-header">
				<Link className="app-header__logo" to={'/admin/home'}>
					{configuracion?.nombre}
				</Link>
				<button
					type="button"
					className="app-sidebar__toggle btn shadow-0"
					onClick={handleAppSidebarToggle}
				>
					<FaBars
						style={{ fontSize: '18px', pointerEvents: 'none' }}
					/>
				</button>

				<Nav />
			</header>

			<div className="app-sidebar__overlay"></div>
			<Sidebar refSidebar={ref} />
		</>
	);
};

export default Header;
