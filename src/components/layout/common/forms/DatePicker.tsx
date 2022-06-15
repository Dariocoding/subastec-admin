import { DatePicker as DatePickerRainbow } from 'react-rainbow-components';
import { FormikValues, useFormikContext, getIn } from 'formik';
interface IDatePickerProps {
	label: string;
	name: string;
	required?: boolean;
}

const DatePicker: React.FunctionComponent<IDatePickerProps> = props => {
	const { name, label, required } = props;
	const { values, errors, setFieldValue, setFieldTouched, touched } =
		useFormikContext<FormikValues>();
	const value = getIn(values, name);
	const validateError = getIn(touched, name) && getIn(touched, name);

	const labelDatePicker = label + (required ? ' (Obligatorio)' : '');

	return (
		<div className="form-group">
			<DatePickerRainbow
				formatStyle="small"
				value={value}
				label={labelDatePicker}
				onChange={value => setFieldValue(name, value)}
				onClick={() => setFieldTouched(name, true)}
			/>
			{validateError && <small className="required">{getIn(errors, name)}</small>}
		</div>
	);
};

export default DatePicker;
