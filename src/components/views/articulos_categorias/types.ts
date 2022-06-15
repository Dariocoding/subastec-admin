import { ProductoType } from '../articulos_productos/types';

export interface CategoriaType {
	idcategoria?: number;
	nombre?: string;
	ruta?: string;
	descripcion?: string;
	status?: number | string;
	portada?: string;
	totalproductos?: number;
	productos?: ProductoType[];
}

export interface CategoriaTypeTable extends CategoriaType {
	options?: React.ReactNode;
	totalproductosHtml?: React.ReactNode;
	portadaHtml?: React.ReactNode;
	statusHtml?: React.ReactNode;
}
