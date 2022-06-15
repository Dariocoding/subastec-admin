import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { InputContainer } from '../../forms/Input';
import { FunctionComponent, ReactNode } from 'react';

const InputContainerBusqueda = styled(InputContainer)`
	margin-right: 20px;
	.icon {
		position: absolute;
		right: -25px;
		bottom: 5px;
		color: var(--app-table-icon-search-color);
	}
`;

interface IHeaderProps {
	buttonHeader?: ReactNode;
	setQ(value: string): void;
	q: string;
	canSearch?: boolean;
}

const Header: FunctionComponent<IHeaderProps> = ({ buttonHeader, setQ, q, canSearch = true }) => (
	<div className="d-flex justify-content-md-between justify-content-center flex-column flex-md-row text-center">
		<div className="mb-3">{buttonHeader}</div>

		{canSearch ? (
			<InputContainerBusqueda className="form-group">
				<span className="icon">
					<FaSearch />
				</span>
				<input
					type="text"
					value={q}
					placeholder="Buscar..."
					onChange={e => setQ(e.target.value)}
				/>
				<div className="line" style={{ bottom: 'auto' }}></div>
			</InputContainerBusqueda>
		) : null}
	</div>
);

export default Header;
