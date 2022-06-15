import styled from 'styled-components';

interface IBackgroundProps {
	position: 'start' | 'center' | 'end';
	zIndex: number;
}

const Background = styled.div<IBackgroundProps>`
	width: 100%;
	height: 100%;
	background: rgba(32, 39, 49, 0.6);
	position: fixed;
	top: 0;
	display: flex;
	justify-content: center;
	align-items: ${props => props.position};
	z-index: ${props => props.zIndex};
`;

export default Background;
