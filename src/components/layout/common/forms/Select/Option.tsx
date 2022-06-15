import styled from 'styled-components';
import { SeleccionadoInterface } from '../interfaces';

const Contenedor = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	transition: 0.2s ease all;
	padding: 15px 30px;
	cursor: pointer;
	user-select: none;

	&:hover,
	&.active {
		background: #213f8f;
		color: #fff;
	}
`;

interface OptionInterface {
	label: string;
	value: string | number;
	toggleSelect(): void;
	seleccionado: SeleccionadoInterface;
	setBusqueda(value: string): void;
	setValue(value: string | number): void;
	onChange(e: string | number): void;
}

const Option = ({
	label,
	value,
	toggleSelect,
	seleccionado,
	setBusqueda,
	setValue,
	onChange,
}: OptionInterface) => {
	function handleClick() {
		setValue(value);
		toggleSelect();
		setBusqueda('');
		if (onChange) {
			onChange(value);
		}
	}

	const isActive = seleccionado?.value === value;

	return (
		<Contenedor
			className={`contenido-opcion ${isActive ? 'active' : ''}`}
			onClick={handleClick}
		>
			<div className="textos">
				<h5 className="titulo">{label}</h5>
			</div>
		</Contenedor>
	);
};

export default Option;
