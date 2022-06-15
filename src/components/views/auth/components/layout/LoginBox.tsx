import { IconType } from 'react-icons';
import styled from 'styled-components';
import Logo from './Logo';

interface ILoginBoxProps {
	children?: React.ReactNode;
	titulo?: string;
	Icon?: IconType;
}
const LoginBox: React.FunctionComponent<ILoginBoxProps> = props => (
	<LoginContent>
		<Logo />
		<LoginBoxContainer>
			{props.titulo && (
				<LoginHead>
					{props.titulo} <props.Icon />
				</LoginHead>
			)}

			{props.children}
		</LoginBoxContainer>
	</LoginContent>
);

export default LoginBox;

const LoginContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;

	label,
	.btn-link {
		font-weight: 700;
		box-shadow: none !important;
		padding: 0px;
		font-size: 12px;
	}
`;

const LoginBoxContainer = styled.div`
	position: relative;
	min-width: 350px;
	min-height: auto;
	padding: 20px 30px;
	background-color: #fff;
	perspective: 800px;
	transition: all 0.5s ease-in-out;
	border-radius: 10px;
	box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;

	.user-image {
		border: 3px solid #fff;
		width: 60px;
		height: 60px;
		object-fit: cover;
		display: block;
		margin: 0px auto 10px auto;
	}

	button.btn.btn-primary,
	input {
		border-radius: 50px;
	}

	.control-label {
		font-size: 12px;
	}

	input {
		font-size: 13px;
	}
`;

const LoginHead = styled.div`
	font-size: 22px;
	margin-top: 10px;
	margin-bottom: 5px;
	padding-bottom: 10px;
	border-bottom: 1px solid #ddd;
	text-align: center;
	font-weight: 600 !important;
	user-select: none;
`;
