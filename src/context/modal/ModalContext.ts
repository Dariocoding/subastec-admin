import { createContext } from 'react';
import { IModalProps } from '../../components/layout/common/Modal/interfaces/modal.interface';
interface ContextModalInterface {
	setModal?(props: IModalProps): void;
	setTitulo?(titulo: string): void;
	cerrarModal?(): void;
	openModal?(): void;
	setBgHeaderModal?(value: 'primary' | 'secondary' | 'danger'): void;
	setShowModal?(value: boolean): void;
}

const initialValues: ContextModalInterface = {};

const ModalContext = createContext(initialValues);

export default ModalContext;
