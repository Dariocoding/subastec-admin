import { HeadDataTable } from '../../../../layout/common/tables/datatable/interfaces';

const HeadingProductosTable: HeadDataTable[] = [
	{ name: 'ID', dataKey: 'idproducto', center: true },
	{ name: 'Código', dataKey: 'codigo', center: true },
	{ name: 'Nombre', dataKey: 'nombre', center: true },
	{ name: 'Marca', dataKey: 'marca', center: true },
	{ name: 'Categoría', dataKey: 'categoria.nombre', center: true },
	{ name: 'Precio', dataKey: 'precioText', center: true },
	{ name: 'Acciones', dataKey: 'options', center: true },
];

export default HeadingProductosTable;
