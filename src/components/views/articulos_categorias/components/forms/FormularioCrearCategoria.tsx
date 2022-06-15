import { toast } from 'react-toastify';
import { handleError, compressImages } from '../../../../utils';
import validarCategoria from '../../validations/validarCategoria';
import clienteAxios from '../../../../../config/axios';
import { Input, Select, Textarea, Button } from '../../../../layout/common/forms';
import { Formik, Form, FormikHelpers } from 'formik';

// HOOKS
import useUploadFile from '../../../../../hooks/useUploadFile';
import { useLoader } from '../../../../../context/loaderpage/LoaderPageState';
import { CategoriaType } from '../../types';
import { useModal } from '../../../../../context/modal/ModalState';

interface IFormularioCrearCategoriaProps {
	addCategoria(categoria: CategoriaType): void;
}

const FormularioCrearCategoria: React.FunctionComponent<IFormularioCrearCategoriaProps> = props => {
	const { setShowModal } = useModal();
	const { file, setFile, containerUpload } = useUploadFile({
		label: 'Sube una imágen relacionada con la categoría',
	});

	const { setLoader } = useLoader();

	const INITIAL_VALUES = {
		nombre: '',
		status: 1,
		descripcion: '',
	};

	async function crearCategoria(values: CategoriaType, actions: FormikHelpers<any>) {
		try {
			setLoader(true, 'Subiendo categoria...');
			const form = new FormData();

			for (const key in values) {
				if (Object.hasOwnProperty.call(values, key)) {
					// @ts-ignore
					form.append(key, values[key]);
				}
			}

			if (file?.file) {
				const compressImage = await compressImages([file.file]);
				const [compressedImage] = compressImage;
				form.append('file', compressedImage, compressedImage.name);
			}

			const response = await clienteAxios.post('/categorias', form, {
				headers: {
					'content-type': 'multipart/form-data',
				},
			});

			actions.resetForm();
			setFile(null);
			toast.success(response.data.msg);
			props.addCategoria(response.data.categoria);
			setShowModal(false);
		} catch (e) {
			handleError(e);
		} finally {
			setLoader(false);
		}
	}

	return (
		<Formik
			onSubmit={crearCategoria}
			validate={validarCategoria}
			initialValues={INITIAL_VALUES}
		>
			<Form style={{ width: '100%' }}>
				<div className="form-row">
					<div className="col-lg-6">
						<Input
							label="Nombre Categoría"
							name="nombre"
							placeholder="Ingresa el nombre de la categoría"
							required
						/>

						<Textarea
							label={'Descripción Categoría'}
							placeholder={
								'Ingrese la descripción de la categoría'
							}
							name="descripcion"
							max={150}
						/>

						<Select
							label={'Estado'}
							name="status"
							values={[
								{
									label: 'Activo',
									value: 1,
								},
								{
									label: 'Inactivo',
									value: 2,
								},
							]}
							required
							placeholder={
								'Escoja un estado para su categoría'
							}
						/>
					</div>
					<div className="col-lg-6 mb-5">{containerUpload}</div>
				</div>
				<Button text="Crear categoria" />
			</Form>
		</Formik>
	);
};

export default FormularioCrearCategoria;
