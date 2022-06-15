import { useState, useEffect } from 'react';
import { InputContainer } from '../Input';
import Option from './Option';
import OptionContainer from './OptionsContainer';
import { SeleccionadoInterface } from '../interfaces';

interface OptionsInterface {
	abierto: boolean;
	toggleSelect(): void;
	busquedaInput: boolean;
	values: Array<SeleccionadoInterface>;
	seleccionado: SeleccionadoInterface;
	name: string;
	setValue(newValue: string): void;
	onChange(e: string | number): void;
}

const Options = ({
	abierto,
	toggleSelect,
	busquedaInput,
	seleccionado,
	values,
	setValue,
	onChange,
}: OptionsInterface) => {
	const [busqueda, setBusqueda] = useState('');
	const [currentItems, setCurrentItems] = useState(values);

	useEffect(() => {
		const newData = search(values);
		setCurrentItems(newData);
		// eslint-disable-next-line
	}, [values, busqueda]);

	function search(arrData: Array<SeleccionadoInterface>) {
		return arrData.filter(
			row =>
				row.label
					?.toString()
					?.toLowerCase()
					?.indexOf(busqueda.toLowerCase().trim()) > -1
		);
	}

	return (
		<OptionContainer className={abierto ? 'active' : ''}>
			{busquedaInput && (
				<InputContainer>
					<input
						type={'text'}
						placeholder={'Buscar...'}
						onChange={e => setBusqueda(e.target.value)}
						value={busqueda}
						autoFocus
					/>
					<div className="line"></div>
				</InputContainer>
			)}

			{currentItems.map(d => (
				<Option
					key={d.label}
					{...d}
					toggleSelect={toggleSelect}
					seleccionado={seleccionado}
					setValue={setValue}
					setBusqueda={setBusqueda}
					onChange={onChange}
				/>
			))}
		</OptionContainer>
	);
};

export default Options;
