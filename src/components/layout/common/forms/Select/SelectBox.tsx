import { FormikErrors } from 'formik';
import { FaAngleDoubleDown, FaAngleDoubleUp } from 'react-icons/fa';
import Container from './Container';
import { SeleccionadoInterface } from '../interfaces';
interface SelectBoxInterface {
	abierto: boolean;
	toggleSelect(): void;
	seleccionado: SeleccionadoInterface;
	error: string | string[] | FormikErrors<any> | FormikErrors<any>[];
	label: string;
	required: boolean;
	description: string;
}

const SelectBox = ({
	abierto,
	toggleSelect,
	seleccionado,
	error,
	label,
	required,
	description,
}: SelectBoxInterface) => (
	<Container onClick={toggleSelect} className={abierto ? 'active' : ''}>
		<div>
			{!seleccionado && (
				<>
					<h5 className="titulo">
						{error ? (
							<span className="required">{label}</span>
						) : (
							label
						)}{' '}
						{required && <span className={'required'}>*</span>}
					</h5>

					{description && (
						<p className="descripcion">{description}</p>
					)}
				</>
			)}

			{seleccionado && <h5 className="titulo">{seleccionado.label}</h5>}
		</div>
		{abierto ? (
			<FaAngleDoubleUp style={{ pointerEvents: 'none' }} />
		) : (
			<FaAngleDoubleDown style={{ pointerEvents: 'none' }} />
		)}
	</Container>
);

export default SelectBox;
