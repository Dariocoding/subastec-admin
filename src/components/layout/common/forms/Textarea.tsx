import styled from 'styled-components';
import Label from './Label';
import { useFormikContext, Field, FormikValues, FieldAttributes } from 'formik';
import { ChangeEvent } from 'react';

export interface ITextAreaProps {
	label?: string;
	required?: boolean;
	name: string;
	cols?: number;
	rows?: number;
	placeholder?: string;
	max?: number;
}

const Textarea: React.FunctionComponent<ITextAreaProps> = props => {
	const { label, required, name = '', cols = 10, rows = 5, placeholder = '', max } = props;
	const { errors, touched, values } = useFormikContext<FormikValues>();
	const validateError = errors[name] && touched[name];

	function handleChange(
		e: ChangeEvent<HTMLTextAreaElement>,
		onChange: (e: ChangeEvent<HTMLTextAreaElement>) => {}
	) {
		if (max) {
			if (e.target.value.length > max) {
				return e.preventDefault();
			}
		}
		onChange(e);
	}

	return (
		<div className="form-group">
			<Label required={required} label={label} name={name} />
			<Field name={name}>
				{({ field }: { field: FieldAttributes<any> }) => (
					<TextareaInput
						cols={cols}
						id={name}
						rows={rows}
						placeholder={placeholder}
						maxLength={max}
						value={field.value}
						onChange={e => handleChange(e, field.onChange)}
					/>
				)}
			</Field>

			{max && (
				<small className="d-flex justify-content-between text-muted d-block mt-1">
					{validateError && (
						<span className="required">
							{errors[name].toString()}
						</span>
					)}
					<span>
						Caractéres: {values[name].length} max: {max}
					</span>
				</small>
			)}
			{!max && validateError && (
				<small className="required">{errors[name].toString()}</small>
			)}
		</div>
	);
};

export default Textarea;

const TextareaInput = styled.textarea`
	display: block;
	width: 100%;
	padding: 0.375rem 0.75rem;
	font-size: 1rem;
	font-weight: 400;
	line-height: 1.5;
	color: #495057;
	background-clip: padding-box;
	border: 1px solid #a9b1b7;
	border-radius: 0.25rem;
	transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
	height: auto;
	background-color: var(--app-input-bg);

	&:focus {
		color: #495057;
		background-color: #fff;
		border-color: #80bdff;
		outline: 0;
		box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
	}
`;
