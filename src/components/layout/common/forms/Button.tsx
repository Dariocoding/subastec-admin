import { FaSpinner, FaCheckCircle } from 'react-icons/fa';
import { useFormikContext } from 'formik';
import { IconType } from 'react-icons';
import { FunctionComponent } from 'react';

interface IButtonProps {
	text: string;
	color?: 'primary' | 'secondary' | 'danger' | 'info';
	Icon?: IconType;
	cargando?: boolean;
	className?: string;
}

const Button: FunctionComponent<IButtonProps> = props => {
	const { color = 'primary', text, cargando, Icon, className } = props;
	const { isSubmitting } = useFormikContext();
	const isDisabled = isSubmitting || cargando;
	return (
		<button
			type="submit"
			disabled={isDisabled}
			className={`btn btn-${color} btn-block ${className ? className : ''}`}
		>
			{!isSubmitting && !cargando && text}{' '}
			{isDisabled ? (
				<FaSpinner className="spin" />
			) : Icon ? (
				<Icon />
			) : (
				<FaCheckCircle />
			)}
		</button>
	);
};
export default Button;
