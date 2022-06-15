import { CategoriaType } from '../../../articulos_categorias/types';

const dataSelectProductos = (categorias: CategoriaType[]) => [
	{
		label: 'Categoria Artículo',
		name: 'categoriaid',
		required: true,
		placeholder: 'Elija una categoria',
		values: categorias.map(c => ({ label: c.nombre, value: c.idcategoria })),
		busquedaInput: true,
	},
];

export default dataSelectProductos;
