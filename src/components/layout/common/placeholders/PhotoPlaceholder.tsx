import ContentLoader from 'react-content-loader';

const MyLoader = () => (
	<ContentLoader speed={2} width={'100%'} backgroundColor="#f3f3f3" foregroundColor="#91d7e4">
		<rect x="0" y="60" rx="2" ry="2" width="100%" height="400" />
	</ContentLoader>
);

export default MyLoader;
