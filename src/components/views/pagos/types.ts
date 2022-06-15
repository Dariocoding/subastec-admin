import { PaqueteBidType } from '../settings_paquete_bids/types';
import { UserType } from '../usuarios/types';

export interface PagoType {
	idpago?: number;
	user?: UserType;
	userid?: number;
	paqueteBid?: PaqueteBidType;
	paqueteBidId?: number;
	amount?: number;
	reference?: string;
	date_created?: Date;
	cantidadBidsTotal?: number;
	transactionStatus?: string;
	transactionId?: string;
}

export interface PagoTypeTable extends PagoType {
	options?: React.ReactNode;
	metodopago?: string;
	datecreatedFormated?: string;
	montoFormated?: string;
}
