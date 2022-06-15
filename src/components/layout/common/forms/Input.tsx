import styled from 'styled-components';
import Label from './Label';
import { Field, FormikValues, useFormikContext } from 'formik';
import { ChangeEvent, FunctionComponent } from 'react';

export interface IInputProps {
	label?: string;
	type?: string;
	placeholder?: string;
	name: string;
	autoFocus?: boolean;
	required?: boolean;
	background?: boolean;
	onChange?(e: ChangeEvent<HTMLInputElement>, handleChange: any): void;
}

const Input: FunctionComponent<IInputProps> = props => {
	const { errors, touched, handleChange } = useFormikContext<FormikValues>();
	const {
		label,
		type = 'text',
		placeholder,
		name,
		autoFocus,
		required,
		onChange,
		background = true,
	} = props;
	const validateError = errors[name] && touched[name];

	return (
		<div className="form-group">
			<InputContainer background={background}>
				<Label
					label={label}
					required={required}
					name={name}
					validateError={validateError}
				/>
				<Field
					type={type}
					placeholder={placeholder}
					name={name}
					id={name}
					autoFocus={autoFocus}
					onChange={(e: ChangeEvent<HTMLInputElement>) => {
						if (onChange) {
							return onChange(e, handleChange);
						}
						handleChange(e);
					}}
				/>
				<div className="line"></div>
			</InputContainer>
			{validateError && (
				<small className="required">{errors[name].toString()}</small>
			)}
		</div>
	);
};

export const InputContainer = styled.div<{ background?: boolean }>`
	position: relative;
	input {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: ${props => (props.background ? '20px' : '0px')};
		background-color: ${props => (props.background ? 'var(--app-input-bg)' : '#fff')};
		color: #000;
		height: calc(1.5em + 0.75rem + 2px);
		padding: 0.375rem 0.75rem;
		border: none;
		border-bottom: 2px solid darkgrey;

		&:focus {
			outline: none;
			border-bottom: none;
			background-color: #fff;
		}

		&:focus + .line {
			width: 100%;
			background-color: #02add7;
		}
	}

	.line {
		height: 3px;
		width: 0px;
		position: absolute;
		background-color: darkgrey;
		display: inline-block;
		transition: 0.3s width ease-in-out;
		bottom: 0;
		left: 0;
	}

	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	input[type='number'] {
		-moz-appearance: textfield;
	}
`;

export default Input;
