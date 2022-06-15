import styled from 'styled-components';

const OptionsContainer = styled.div`
	background: #fff;
	border-radius: 10px;
	box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.16);
	max-height: 235px;
	overflow: auto;
	z-index: 100;
	width: 100%;
	display: none;
	margin-top: 20px;
	border: 1px solid #ccc;
	&.active {
		display: block;
		animation: fadeIn 0.3s forwards;
	}

	::-webkit-scrollbar {
		width: 10px;
	}

	::-webkit-scrollbar-thumb {
		background: #202731;
		border-radius: 4px;
	}

	::-webkit-scrollbar-thumb:active {
		background-color: #202731;
	}

	::-webkit-scrollbar-thumb:hover {
		background: #202731;
		box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
	}

	::-webkit-scrollbar-track {
		background: #e1e1e1;
		border-radius: 4px;
	}

	::-webkit-scrollbar-track:hover,
	::-webkit-scrollbar-track:active {
		background: #d4d4d4;
	}
`;

export default OptionsContainer;
