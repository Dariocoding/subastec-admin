import { Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { FunctionComponent } from 'react';

export interface IAppTitleProps {
	btnBackUrl?: string;
	btnBackText?: string;
	descripcion?: string;
	titulo?: string;
	Icon?: IconType;
}

const AppTitle: FunctionComponent<IAppTitleProps> = props => {
	const { btnBackUrl, btnBackText, titulo, descripcion, Icon } = props;
	return (
		<div>
			<h1>
				{btnBackUrl && (
					<Link
						to={'/admin' + btnBackUrl}
						className="btn btn-dark shadow-0"
					>
						<FaChevronLeft size={10} /> {btnBackText}
					</Link>
				)}
				<Icon
					className="mx-2"
					color="#1f439a"
					style={{ verticalAlign: 'middle' }}
				/>
				{titulo}
			</h1>
			{descripcion && <p className="mt-2">{descripcion}</p>}
		</div>
	);
};

export default AppTitle;
