import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';

export interface ICardProps {
	Icon: IconType;
	title: string;
	descripcion?: string;
	url?: string;
	className?: string;
	btnLinkText: string;
}

const Card: React.FunctionComponent<ICardProps> = props => (
	<div className="card shadow text-center animate__animated animate__fadeInUp">
		<div className={`overflow-img-top ${props.className}`}>
			<props.Icon className="text-light" size={70} />
		</div>
		<div className="card-body text-light p-4">
			<h2 className="card-title text-dark">{props.title}</h2>
			<p className="text-dark">{props.descripcion}</p>
			<Link
				to={'/admin' + props.url}
				className="btn btn-outline-secondary border-0"
			>
				{props.btnLinkText}
			</Link>
		</div>
	</div>
);

export default Card;
