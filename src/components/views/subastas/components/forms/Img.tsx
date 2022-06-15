import { useMemo } from 'react';
import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';
import { PF } from '../../../../utils';

const ImgContainer = styled.div`
	position: relative;
	img {
		cursor: pointer;
		width: 100%;
		user-select: none;
	}
`;

const CheckedImage = styled.div<{ imagenseleccionada: boolean }>`
	pointer-events: none;
	position: absolute;
	top: 15px;
	left: 30px;
	background: #05fc8f;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	display: ${props => (props.imagenseleccionada ? 'flex' : 'none')};
	align-items: center;
	justify-content: center;
`;

interface IImgProps {
	filename: string;
	setImagenSeleccionada(string: string): void;
	imagenSeleccionada: string;
}

const Img: React.FunctionComponent<IImgProps> = props => {
	const { filename, setImagenSeleccionada, imagenSeleccionada } = props;

	function handleClickImg() {
		setImagenSeleccionada(filename);
	}
	// eslint-disable-next-line
	const MemoImage = useMemo(() => <img src={PF + filename} alt={''} />, []);

	return (
		<ImgContainer className="col-xl-6 my-2" onClick={handleClickImg}>
			{MemoImage}
			<CheckedImage imagenseleccionada={imagenSeleccionada === filename}>
				<FaCheck size={10} />
			</CheckedImage>
		</ImgContainer>
	);
};

export default Img;
