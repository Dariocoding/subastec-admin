import { useMemo, Fragment } from 'react';
import styled from 'styled-components';
import BackgroundAuth from './backgroundAuth';
import { ToastContainer } from 'react-toastify';
import LoginBox from './LoginBox';
import 'react-toastify/dist/ReactToastify.css';
import { IconType } from 'react-icons';

interface IAuthComponentProps {
	children?: React.ReactNode;
	titulo?: string;
	Icon?: IconType;
}

const AuthComponent: React.FunctionComponent<IAuthComponentProps> = props => {
	const { children, titulo, Icon } = props;
	const Background = useMemo(
		() => (
			<Fragment>
				<ToastContainer theme="colored" position="top-center" />
				<MaterialHalf>
					<BackgroundAuth />
				</MaterialHalf>
			</Fragment>
		),
		[]
	);

	return (
		<Fragment>
			{Background}
			<LoginBox titulo={titulo} Icon={Icon} children={children} />
		</Fragment>
	);
};
export default AuthComponent;

const MaterialHalf = styled.div`
	height: 100vh;
	width: 100vw;
	position: fixed;
	z-index: -1;
	background: var(--secondary-color);
`;
