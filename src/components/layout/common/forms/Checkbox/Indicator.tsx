import styled from 'styled-components';

const Indicator = styled.div<{ isChecked: boolean; width: number; height: number }>`
	position: relative;
	z-index: 1;
	background: #0091ca;
	width: ${props => props.width + 'px'};
	height: ${props => props.height + 'px'};
	top: -0.5px;
	left: -0.5px;
	border-radius: 4px;
	transform: ${props => (props.isChecked ? 'scale(1)' : 'scale(0)')};
	transition: transform 100ms;
	svg {
		font-weight: bold;
		stroke: black;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;

export default Indicator;
