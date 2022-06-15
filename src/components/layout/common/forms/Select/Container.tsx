import styled from 'styled-components';
const Container = styled.div`
	background: #fff;
	width: 100%;
	box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.16);
	border: 1px solid #ccc;
	border-radius: 10px;
	cursor: pointer;
	display: flex;
	justify-content: space-between;
	align-items: center;
	transition: 0.2s ease all;
	padding: 10px 20px 0px 20px;
	position: relative;

	&.active,
	&:hover {
		box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.16);
		border: 2px solid #213f8f;
	}

	svg {
		margin-bottom: 10px;
		color: #000;
		font-weight: 600;
		font-size: 20px;
	}

	&.active:before {
		content: '';
		display: block;
		height: 0;
		width: 0;
		border-top: 15px solid #213f8f;
		border-right: 15px solid transparent;
		border-bottom: 15px solid transparent;
		border-left: 15px solid transparent;
		position: absolute;
		bottom: -30px;
		left: calc(50% - 15px);
	}

	.titulo,
	.descripcion {
		user-select: none;
	}

	.titulo {
		margin-bottom: 10px;
		color: #000;
		font-weight: 600;
		font-size: 18px;
		text-align: start;
	}

	.descripcion {
		font-size: 16px;
		color: #434343;
	}
`;

export default Container;
