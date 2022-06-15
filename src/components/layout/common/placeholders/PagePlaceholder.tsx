import ContentLoader from 'react-content-loader';
import Tile from '../Tile';

const PagePlaceholder = () => (
	<div className="app-content">
		<div className="app-title">
			<ContentLoader
				speed={2}
				backgroundColor="#91d7e4"
				foregroundColor="#ecebeb"
				width={'100%'}
				height={50}
			>
				<circle cx="31" cy="31" r="15" />
				<rect x="58" y="18" rx="2" width="100%" height="10" />
				<rect x="58" y="34" rx="2" width="100%" height="10" />
			</ContentLoader>
		</div>
		<Tile>
			<ContentLoader
				speed={2}
				backgroundColor="#91d7e4"
				foregroundColor="#ecebeb"
				width={'100%'}
			>
				<rect x="0" rx="2" ry="2" width="100%" height="300" />
			</ContentLoader>
		</Tile>
	</div>
);

export default PagePlaceholder;
