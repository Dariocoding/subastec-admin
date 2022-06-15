import styled from 'styled-components';
import { Field, FormikValues, getIn, useFormikContext } from 'formik';
import Label from './Label';

interface ISelectDefaultProps {
	label: string;
	placeholder?: string;
	name: string;
	required?: boolean;
	onChange?(e: any, handleChange: (string: string | number) => void): void;
	children?: React.ReactNode | React.ReactNode[];
}

const SelectDefault: React.FunctionComponent<ISelectDefaultProps> = props => {
	const { label = '', placeholder = '', name = '', required, onChange, children } = props;
	const { errors, touched, handleChange } = useFormikContext<any>();
	const validateError = getIn(errors, name) && getIn(touched, name);
	return (
		<div className="form-group">
			<SelectContainer>
				<Label
					label={label}
					required={required}
					name={name}
					validateError={validateError}
				/>
				<Field
					as={'select'}
					placeholder={placeholder}
					name={name}
					id={name}
					onChange={(e: any) => {
						if (onChange) {
							return onChange(e, handleChange);
						}
						handleChange(e);
					}}
				>
					{children}
				</Field>
			</SelectContainer>
			{validateError && <small className="required">{getIn(errors, name)}</small>}
		</div>
	);
};

export default SelectDefault;

export const SelectContainer = styled.div`
	position: relative;
	select {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 5px;
		background-color: var(--app-input-bg);
		color: #000;
		height: calc(1.5em + 0.75rem + 2px);
		padding: 0.375rem 0.75rem;
		border: 1px solid #08c0ff;

		&:focus {
			outline: none;
			border: 1px solid #097fff;
			background-color: #fff;
		}
	}
`;
