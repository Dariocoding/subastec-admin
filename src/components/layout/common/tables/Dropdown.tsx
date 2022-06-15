import { useState, useEffect, useRef, ReactNode, FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaCog } from 'react-icons/fa';

const Container = styled.div`
	position: relative;
	display: inline-block;

	.dropdown-menu {
		animation-name: scaleZ;
		animation-duration: 0.2s;
		animation-iteration-count: normal;

		button,
		a {
			user-select: none;
			transition: all 0.15s ease !important;
		}
	}
`;

interface IDropdownProps {
	children?: ReactNode;
}

const Dropdown: FunctionComponent<IDropdownProps> = props => {
	const { children } = props;

	const [open, setOpen] = useState(false);
	const refButton = useRef();
	const toggleDropdown = () => setOpen(!open);

	function handleCloseDropdow(e: MouseEvent) {
		if (e.target !== refButton.current) {
			toggleDropdown();
		}
	}

	useEffect(() => {
		if (open) document.addEventListener('click', handleCloseDropdow);

		return () => {
			document.removeEventListener('click', handleCloseDropdow);
		};
	});

	return (
		<Container>
			<div className="dropdown dropleft">
				<button
					ref={refButton}
					className="btn btn-secondary"
					onClick={toggleDropdown}
					type="button"
				>
					<FaCog style={{ pointerEvents: 'none' }} />
				</button>
				{open && <div className="dropdown-menu">{children}</div>}
			</div>
		</Container>
	);
};

interface IButtonDropdownProps {
	color: 'primary' | 'info' | 'danger' | 'warning' | 'secondary';
	to?: string;
	onClick?(): void;
	children?: ReactNode;
}

export const ButtonDropdown: FunctionComponent<IButtonDropdownProps> = props => {
	const { color, to, onClick, children } = props;
	return to ? (
		<Link className={`dropdown-item btn-outline-${color}`} to={to}>
			{children}
		</Link>
	) : (
		<button className="dropdown-item btn-outline-secondary" onClick={onClick}>
			{children}
		</button>
	);
};

export default Dropdown;
