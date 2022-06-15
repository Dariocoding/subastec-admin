import { DateTimePicker as DateTimePickerRainbow } from 'react-rainbow-components';
import { getIn, useFormikContext } from 'formik';

interface IDateTimePickerProps {
	name: string;
	label: string;
	required?: boolean;
	minDate?: Date;
}

const DateTimePicker: React.FunctionComponent<IDateTimePickerProps> = props => {
	const { name, label, required, minDate } = props;
	const { values, errors, setFieldValue, setFieldTouched, touched } = useFormikContext();
	const value = getIn(values, name);
	const validateError = getIn(touched, name) && getIn(errors, name);
	const labelDatePicker = label + (required ? ' (Obligatorio)' : '');

	return (
		<div className="form-group">
			<DateTimePickerRainbow
				formatStyle="small"
				value={value}
				label={labelDatePicker}
				onChange={value => setFieldValue(name, value)}
				onClick={() => setFieldTouched(name, true)}
				minDate={minDate}
			/>
			{validateError && <small className="required">{getIn(errors, name)}</small>}
		</div>
	);
};

export default DateTimePicker;
