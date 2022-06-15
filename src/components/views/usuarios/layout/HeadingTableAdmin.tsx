import { HeadDataTable } from '../../../layout/common/tables/datatable/interfaces';

const HeadingTableAdmin: HeadDataTable[] = [
	{ name: 'ID', dataKey: 'iduser' },
	{ name: 'Foto Perfil', dataKey: 'fotoperfilHtml', center: true },
	{ name: 'Username', dataKey: 'username' },
	{ name: 'Nombre', dataKey: 'nombres' },
	{ name: 'Apellido', dataKey: 'apellidos' },
	{ name: 'Correo', dataKey: 'email_user' },
	{ name: 'Teléfono', dataKey: 'telefono' },
	{ name: 'Rol', dataKey: 'rol.nombrerol', center: true },
	{ name: 'Acciones', dataKey: 'options', center: true },
];

export default HeadingTableAdmin;
