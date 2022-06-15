import { useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { IModalProps } from './interfaces/modal.interface';
import Background from './Background';
import ModalWrapper from './ModalWrapper';
import ModalTitulo from './ModalTitulo';
import ModalContainer from './ModalContainer';

const ModalContent = styled.div`
	padding: 20px 10px 20px 10px;
	line-height: 1.8;
	overflow: hidden;
`;

const CloseModalButton = styled(MdClose)`
	cursor: pointer;
	position: absolute;
	top: 15px;
	right: 10px;
	width: 25px;
	height: 25px;
	padding: 0;
	z-index: 10;
`;

const Modal: React.FunctionComponent<IModalProps> = props => {
	const {
		position,
		showModal,
		setShowModal,
		bgHeader,
		titulo,
		size,
		children,
		zIndex = 1050,
	} = props;

	const modalRef = useRef();

	const animation = useSpring({
		config: { duration: 250 },
		opacity: showModal ? 1 : 0,
	});

	const handleKeyPress = useCallback(
		() => (e: KeyboardEvent) => {
			if (e.key === 'Escape' && showModal) {
				setShowModal(false);
			}
		},
		[showModal, setShowModal]
	);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyPress);
		return () => document.removeEventListener('keydown', handleKeyPress);
	}, [handleKeyPress]);

	if (!showModal) return null;

	const textBgHeader = bgHeader ? 'text-light' : 'text-dark';
	return createPortal(
		<Background
			onClick={e => (modalRef.current === e.target ? setShowModal(false) : null)}
			ref={modalRef}
			position={position}
			zIndex={zIndex}
		>
			<animated.div style={animation}>
				<ModalWrapper className={size} position={position}>
					{titulo && (
						<ModalTitulo
							className={`bg-${bgHeader} ${textBgHeader}`}
						>
							{titulo}
						</ModalTitulo>
					)}
					<CloseModalButton
						aria-label="Close modal"
						className={textBgHeader}
						onClick={() => setShowModal(false)}
					/>
					<ModalContainer>
						<ModalContent>{children}</ModalContent>
					</ModalContainer>
				</ModalWrapper>
			</animated.div>
		</Background>,
		document.getElementById('modal-root')
	);
};

export default Modal;
