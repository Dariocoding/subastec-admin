import styled from 'styled-components';

const Border = styled.div<{ width: number; height: number }>`
	position: relative;
	border: 1px solid #000;
	border-radius: 4px;
	margin-right: 6px;
	width: ${props => props.width + 'px'};
	height: ${props => props.height + 'px'};
`;

export default Border;
