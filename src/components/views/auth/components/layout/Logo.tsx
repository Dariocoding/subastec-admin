import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import * as React from 'react';
const tiendapng = require('../../../../../Assets/images/tienda.png');
const Container = styled.div`
	margin-bottom: 20px;

	img {
		width: 60px;
	}
`;

const Logo = () => (
	<Container>
		<LazyLoadImage
			style={{ width: '150px' }}
			src={tiendapng}
			alt="Foto Tienda"
			effect="blur"
		/>
	</Container>
);

export default React.memo(Logo);
