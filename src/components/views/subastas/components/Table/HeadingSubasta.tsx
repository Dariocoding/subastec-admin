import { HeadDataTable } from '../../../../layout/common/tables/datatable/interfaces';

const HeadingSubasta: HeadDataTable[] = [
	{ name: 'ID', dataKey: 'idsubasta' },
	{ name: 'Titulo', dataKey: 'titulo', center: true },
	{ name: 'Fecha Creación', dataKey: 'dateCreatedFormated', center: true },
	{ name: 'Fecha Inicio', dataKey: 'fechaInicioFormated', center: true },
	{ name: 'Fecha Finalización', dataKey: 'fechaFinalizacionFormated', center: true },
	{ name: 'Costo Puja', dataKey: 'costopuja', center: true },
	{ name: 'Precio minimo', dataKey: 'precioText', center: true },
	{ name: 'Precio Subasta', dataKey: 'precioSubastaFormated', center: true },
	{ name: 'Acciones', dataKey: 'options', center: true },
];

export default HeadingSubasta;
