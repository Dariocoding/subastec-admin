import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Options from './Options';
import SelectBox from './SelectBox';
import { SeleccionadoInterface } from '../interfaces';
import { FormikValues, useFormikContext, getIn } from 'formik';
import { SelectInterface } from '../interfaces';
import useOnOutsideClick from '../../../../../hooks/useOnOutsideClick';

const SelectContainer = styled.div`
	width: 100%;
	margin: auto;
	position: relative;
`;

const Select: React.FunctionComponent<SelectInterface> = props => {
	const { label, required, values, name, placeholder, busquedaInput, onChange } = props;
	const formikContext = useFormikContext<FormikValues>();
	const [abierto, setAbierto] = useState(false);
	const [seleccionado, setSeleccionado] = useState<SeleccionadoInterface>(null);
	const toggleSelect = () => setAbierto(!abierto);
	const { innerBorderRef } = useOnOutsideClick(() => setAbierto(false));

	//@ts-ignore

	const value = getIn(formikContext.values, name);

	const error = formikContext.errors[name];
	const touched = formikContext.touched[name];
	const setValue = (value: string) => formikContext.setFieldValue(name, value);

	useEffect(() => {
		setSeleccionado(values.find(s => s.value === value));
		// eslint-disable-next-line
	}, [value, values]);

	return (
		<div className="form-group">
			<SelectContainer ref={innerBorderRef}>
				<SelectBox
					abierto={abierto}
					seleccionado={seleccionado}
					required={required}
					label={label}
					error={error}
					toggleSelect={toggleSelect}
					description={placeholder}
				/>

				<Options
					abierto={abierto}
					toggleSelect={toggleSelect}
					busquedaInput={busquedaInput}
					seleccionado={seleccionado}
					values={values}
					name={name}
					setValue={setValue}
					onChange={onChange}
				/>
			</SelectContainer>
			{error && touched && <small className="required">{error.toString()}</small>}
		</div>
	);
};

export default Select;
