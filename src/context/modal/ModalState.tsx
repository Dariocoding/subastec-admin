import { ReactNode, useContext, useState } from 'react';
import Modal from '../../components/layout/common/Modal';
import ModalContext from './ModalContext';
import { IModalProps } from '../../components/layout/common/Modal/interfaces/modal.interface';

const ModalState = (props: { children: ReactNode }) => {
	const [size, setSizeModal] = useState<'sm' | 'md' | 'xl'>('md');

	const [showModal, setShowModal] = useState(false);
	const [content, setContent] = useState(null);
	const [titulo, setTitulo] = useState(null);
	const [bgHeader, setBgHeaderModal] = useState(null);
	const [position, setPosition] = useState<'center' | 'start' | 'end'>('center');

	const setModal = ({
		size = 'md',
		content,
		titulo,
		bgHeader,
		position = 'center',
	}: IModalProps) => {
		setSizeModal(size);
		setContent(content);
		setTitulo(titulo);
		setBgHeaderModal(bgHeader);
		setPosition(position);
		setShowModal(true);
	};

	const cerrarModal = () => setShowModal(false);
	const openModal = () => setShowModal(true);

	const valuesProvider = {
		setModal,
		setTitulo,
		cerrarModal,
		openModal,
		setBgHeaderModal,
		setShowModal,
	};

	return (
		<ModalContext.Provider value={valuesProvider}>
			<>
				<Modal
					size={size}
					position={position}
					showModal={showModal}
					setShowModal={setShowModal}
					bgHeader={bgHeader}
					titulo={titulo}
				>
					{content}
				</Modal>
				{props.children}
			</>
		</ModalContext.Provider>
	);
};
export default ModalState;

export const useModal = () => useContext(ModalContext);
