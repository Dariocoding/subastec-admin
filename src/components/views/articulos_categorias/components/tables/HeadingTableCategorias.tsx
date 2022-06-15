import { HeadDataTable } from '../../../../layout/common/tables/datatable/interfaces';

const HeadingTableCategorias: HeadDataTable[] = [
	{ name: 'ID', dataKey: 'idcategoria', center: true },
	{ name: 'Nombre', dataKey: 'nombre', center: true },
	{ name: 'Portada', dataKey: 'portadaHtml', center: true },
	{ name: 'Total Productos', dataKey: 'totalproductosHtml', center: true },
	{ name: 'Estado', dataKey: 'statusHtml', center: true },
	{ name: 'Acciones', dataKey: 'options', center: true },
];

export default HeadingTableCategorias;
