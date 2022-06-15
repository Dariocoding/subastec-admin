import { Link } from 'react-router-dom';
//@ts-ignore
const ItemWidget = ({ path, Icon, colouredIcon, title, valor }) => (
	<div className="col-xl-3 col-lg-4 col-md-6">
		<Link to={'/admin' + path}>
			<div className={`widget-small ${colouredIcon} coloured-icon`}>
				<Icon className="icon" />

				<div className="info">
					<h4 className="text-center">
						{title}
						<br />
						<b>{valor}</b>
					</h4>
				</div>
			</div>
		</Link>
	</div>
);
export default ItemWidget;
