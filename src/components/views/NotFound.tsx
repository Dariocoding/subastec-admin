import { Link } from 'react-router-dom';
import { FaExclamationCircle } from 'react-icons/fa';

const NotFound: React.FunctionComponent = () => (
	<div className="app-content">
		<div className="page-error tile">
			<h1>
				<FaExclamationCircle /> Error 404: Page not found
			</h1>
			<p>La página que has solicitado no ha podido ser encontrada.</p>
			<p>
				<Link className="btn btn-primary" to={'/admin/home'}>
					Ir atrás
				</Link>
			</p>
		</div>
	</div>
);

export default NotFound;
