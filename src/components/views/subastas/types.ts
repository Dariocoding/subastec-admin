import React from 'react';
import { ProductoType } from '../articulos_productos/types';
import { PaqueteBidType } from '../settings_paquete_bids/types';
import { UserType } from '../usuarios/types';

export interface SubastaType {
	idsubasta?: number;
	titulo?: string;
	fotoSubasta?: string;
	producto?: ProductoType;
	productoid?: number | string;
	paqueteBid?: PaqueteBidType;
	paqueteBidId?: number | string;
	fechaInicio?: Date;
	fechaFinalizacion?: Date;
	costopuja?: number | string;
	preciominimo?: number | string;
	preciosubasta?: number;
	date_created?: Date;
	status?: number;
	favoritos?: FavoritoType[];
	pujas?: PujaType[];
}

export interface SubastaTableType extends SubastaType {
	options?: React.ReactNode;
	dateCreatedFormated?: string;
	fechaInicioFormated?: string;
	fechaFinalizacionFormated?: string;
	precioText?: string;
	precioSubastaFormated?: string;
}

export interface FavoritoType {
	idfavorito?: number;
	user?: UserType;
	userid: number;
	subasta?: SubastaType;
	subastaid?: number;
}

export type ModalidadPujaType = 'M' | 'A' | 'Manual' | 'Automático';

export interface PujaType {
	idpuja?: number;

	modalidad?: ModalidadPujaType;

	costopuja?: number;

	user?: UserType;

	userid?: number;

	subasta?: SubastaType;

	subastaid?: number;

	date_created?: Date;

	cantidadBids?: number;
}

export interface PujaTableType extends PujaType {
	modalidadFormated?: ModalidadPujaType;
	price?: string;
	dateCreatedFormated?: string;
	options?: React.ReactNode;
}
