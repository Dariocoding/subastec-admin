import { GrCloudUpload } from 'react-icons/gr';
import { toast } from 'react-toastify';
import { handleError, compressImages } from '../../../../utils';
import clienteAxios from '../../../../../config/axios';
import { Formik, Form } from 'formik';
import validarProducto from '../../validations/validarProducto';
// COMPONENTS
import { Input, Select, Textarea, Button, TinyMceEditor } from '../../../../layout/common/forms';
import dataInputsProducto from './dataInputsProducto';
import dataSelectProductos from './dataSelectsProducto.';

// HOOKS
import useDropzone from '../../../../../hooks/useDropzone';
import { useLoader } from '../../../../../context/loaderpage/LoaderPageState';
import { ProductoType } from '../../types';
import { CategoriaType } from '../../../articulos_categorias/types';
import { useModal } from '../../../../../context/modal/ModalState';

interface IFormularioCrearProductoProps {
	addProducto(value: ProductoType): void;
	categorias: CategoriaType[];
}

const FormularioCrearProducto: React.FunctionComponent<IFormularioCrearProductoProps> = props => {
	const { setShowModal } = useModal();
	const { setLoader } = useLoader();
	const { DropzoneContenedor, files } = useDropzone({
		accept: 'image/*',
		limit: 10,
	});

	const INITIAL_VALUES = {
		codigo: '',
		codigoTarjeta: '',
		nombre: '',
		marca: '',
		descripcion: '',
		precio: '',
		status: 1,
		categoriaid: '',
	};

	// @ts-ignore
	async function crearProducto(values) {
		try {
			setLoader(true, 'Subiendo producto...');
			const form = new FormData();
			for (const key in values) {
				if (Object.hasOwnProperty.call(values, key)) {
					form.append(key, values[key]);
				}
			}

			const images = await compressImages(files);
			images.map(img => form.append('files', img, img.name));

			const response = await clienteAxios.post('/productos', form, {
				headers: {
					'content-type': 'multipart/form-data', // do not forget this
				},
			});

			toast.success(response.data.msg);
			props.addProducto(response.data.producto);
			setShowModal(false);
		} catch (e) {
			handleError(e);
		} finally {
			setLoader(false);
		}
	}

	const dataSelects = dataSelectProductos(props.categorias);

	return (
		<Formik
			initialValues={INITIAL_VALUES}
			onSubmit={crearProducto}
			validate={validarProducto}
		>
			<Form>
				<div className="row">
					<div className="col-lg-6">
						{dataInputsProducto.map(input => (
							<Input key={input.name} {...input} />
						))}

						{dataSelects.map(select => (
							<Select {...select} key={select.name} />
						))}

						<TinyMceEditor name={'descripcion'} />
					</div>
					<div className="col-lg-6">
						<h4 className="text-center">
							Subir Imágenes del Producto{' '}
							<GrCloudUpload />
						</h4>
						<div className="mt-2">{DropzoneContenedor}</div>
					</div>
				</div>

				<Button text={'Crear Artículo'} />
			</Form>
		</Formik>
	);
};

export default FormularioCrearProducto;
