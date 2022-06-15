import React from 'react';
import { CategoriaType } from '../articulos_categorias/types';
import { SubastaType } from '../subastas/types';

export interface ImagenesType {
	id?: number;
	filename?: string;
	producto?: ProductoType;
	productoid?: number;
}

export interface ProductoType {
	idproducto?: number;
	nombre?: string;
	descripcion?: string;
	precio?: number | string;
	marca?: string;
	ruta?: string;
	codigo?: string;
	codigoTarjeta?: string;
	categoriaid?: number | string;
	categoria?: CategoriaType;
	status?: number;
	date_created?: Date;
	imagenes?: ImagenesType[];
	subastas?: SubastaType[];
}

export interface ProductoTableType extends ProductoType {
	statusHtml?: React.ReactNode;
	precioText?: string;
	options?: React.ReactNode;
}
