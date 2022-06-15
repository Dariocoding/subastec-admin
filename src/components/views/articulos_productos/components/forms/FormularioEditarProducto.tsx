import { toast } from 'react-toastify';
import { handleError, controlDecimal } from '../../../../utils';
import { Formik, Form } from 'formik';
import clienteAxios from '../../../../../config/axios';
import { Input, Select, Button, TinyMceEditor } from '../../../../layout/common/forms';
import dataInputsProducto from './dataInputsProducto';
import dataSelectProductos from './dataSelectsProducto.';
import validarProducto from '../../validations/validarProducto';
import { ProductoType } from '../../types';
import { CategoriaType } from '../../../articulos_categorias/types';
import { useModal } from '../../../../../context/modal/ModalState';

interface IFormularioEditarProductoProps {
	producto: ProductoType;
	updateProducto(value: ProductoType): void;
	categorias: CategoriaType[];
}

const FormularioEditarProducto: React.FunctionComponent<IFormularioEditarProductoProps> = props => {
	const { setShowModal } = useModal();
	const { producto, updateProducto } = props;
	const STATE_INICIAL: ProductoType = {
		idproducto: producto.idproducto,
		codigo: producto.codigo,
		codigoTarjeta: producto.codigoTarjeta,
		nombre: producto.nombre,
		marca: producto.marca,
		descripcion: producto.descripcion,
		// @ts-ignore
		precio: controlDecimal(producto.precio.toFixed(2)),
		status: producto.status,
		categoriaid: producto.categoriaid,
	};

	// @ts-ignore
	async function actualizarProducto(values) {
		try {
			const response = await clienteAxios.put('/productos', values);
			toast.success(response.data.msg);
			updateProducto(response.data.producto);
			setShowModal(false);
		} catch (e) {
			handleError(e);
		}
	}

	const dataSelects = dataSelectProductos(props.categorias);

	return (
		<Formik
			initialValues={STATE_INICIAL}
			validate={validarProducto}
			onSubmit={actualizarProducto}
		>
			<Form>
				{dataInputsProducto.map(input => (
					<Input key={input.name} {...input} />
				))}

				{dataSelects.map(select => (
					<Select {...select} key={select.name} />
				))}

				<TinyMceEditor name="descripcion" />

				<Button text={'Actualizar Producto'} />
			</Form>
		</Formik>
	);
};

export default FormularioEditarProducto;
