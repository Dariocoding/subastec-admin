import styled from 'styled-components';
import { createPortal } from 'react-dom';
const Container = styled.div`
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	position: absolute;
	text-align: center;
	.bar {
		width: 10px;
		height: 70px;
		background: transparent;
		display: inline-block;
		transform-origin: bottom center;
		border-top-right-radius: 20px;
		border-top-left-radius: 20px;
		animation: loader 1.2s linear infinite;
	}
	.bar0 {
		animation-delay: 0.1s;
	}
	.bar1 {
		animation-delay: 0.2s;
	}
	.bar2 {
		animation-delay: 0.3s;
	}
	.bar3 {
		animation-delay: 0.4s;
	}
	.bar4 {
		animation-delay: 0.5s;
	}
	.bar5 {
		animation-delay: 0.6s;
	}
	.bar6 {
		animation-delay: 0.7s;
	}
	.bar7 {
		animation-delay: 0.8s;
	}

	@keyframes loader {
		0% {
			transform: scaleY(0.1);
			background: #0090d0;
		}
		50% {
			transform: scaleY(1);
			background: #59b3e8;
		}
		100% {
			transform: scaleY(0.1);
			background: transparent;
		}
	}
`;

const Background = styled.div`
	width: 100%;
	height: 100%;
	background: #2b32b2;
	position: fixed;
	top: 0;
	display: flex;
	justify-content: center;
	z-index: 1300;
`;

const Texto = styled.p`
	color: #fff;
`;

const Loader = ({ show, texto }: { show: boolean; texto?: string }) => {
	if (!show) return;
	const bars = [...Array(8).keys()];
	return createPortal(
		<Background>
			<Container>
				{bars.map(b => (
					<div key={b} className={`bar bar${b}`}></div>
				))}
				<Texto>{texto}</Texto>
			</Container>
		</Background>,
		document.getElementById('loader-root')
	);
};

export default Loader;
