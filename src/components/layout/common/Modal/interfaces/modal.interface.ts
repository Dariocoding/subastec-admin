import { ReactNode } from 'react';

export interface IModalProps {
	showModal?: boolean;
	setShowModal?(showModal: boolean): void;
	titulo?: string;
	bgHeader?: 'primary' | 'secondary' | 'danger' | 'info' | null;
	size?: 'md' | 'sm' | 'xl';
	position?: 'start' | 'center' | 'end';
	zIndex?: number;
	children?: ReactNode;
	content?: ReactNode;
}
