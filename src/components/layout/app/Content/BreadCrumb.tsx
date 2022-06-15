import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { FunctionComponent } from 'react';

export interface IBreadCrumbProps {
	breadCrumb?: Array<{ link?: string; titulo: string }>;
}

const BreadCrumb: FunctionComponent<IBreadCrumbProps> = props => {
	const { breadCrumb = [] } = props;

	if (!breadCrumb.length) return null;
	return (
		<ul className="app-breadcrumb breadcrumb">
			<li className="breadcrumb-item">
				<Link to={'/home'} className="breadcrumb-item">
					<FaHome />
				</Link>
			</li>
			{breadCrumb.map(({ link, titulo }) => (
				<li key={titulo} className="breadcrumb-item">
					{link ? <Link to={link}>{titulo}</Link> : titulo}
				</li>
			))}
		</ul>
	);
};

export default BreadCrumb;
