import * as React from 'react';
import { RefObject } from 'react';
import InformacionUser from './InformacionUser';
import Menu from './menu/Menu';
const Sidebar = ({ refSidebar }: { refSidebar: RefObject<HTMLDivElement> }) => (
	<aside className="app-sidebar" ref={refSidebar}>
		<InformacionUser />
		<Menu />
	</aside>
);

export default React.memo(Sidebar);
