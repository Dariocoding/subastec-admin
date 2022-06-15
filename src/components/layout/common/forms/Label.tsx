import { FormikTouched } from 'formik';

interface LabelInterface {
	name?: string;
	label?: string;
	required?: boolean;
	validateError?: boolean | FormikTouched<any> | FormikTouched<any>[];
}

const Label: React.FunctionComponent<LabelInterface> = props => {
	const { name, label, required, validateError } = props;

	if (!label) return null;
	return (
		<label htmlFor={name} className="control-label">
			{validateError ? <span className="required">{label}</span> : label}{' '}
			{required && (
				<span className={validateError ? 'required' : ''}>(requerido)</span>
			)}
		</label>
	);
};

export default Label;
