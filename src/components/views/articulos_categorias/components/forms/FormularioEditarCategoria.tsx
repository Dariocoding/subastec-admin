import { toast } from 'react-toastify';
import { handleError, compressImages } from '../../../../utils';
import validarCategoria from '../../validations/validarCategoria';
import clienteAxios from '../../../../../config/axios';
import { Formik, Form } from 'formik';
// COMPONENTS
import { Input, Textarea, Select, Button } from '../../../../layout/common/forms';

// HOOKS
import useUploadFile from '../../../../../hooks/useUploadFile';
import { useLoader } from '../../../../../context/loaderpage/LoaderPageState';
import { PF } from '../../../../utils';
import { CategoriaType } from '../../types';
import { useModal } from '../../../../../context/modal/ModalState';

interface IFormularioEditarCategoriaProps {
	categoria: CategoriaType;
	updateCategoria(categoria: CategoriaType): void;
}

const FormularioEditarCategoria: React.FunctionComponent<
	IFormularioEditarCategoriaProps
> = props => {
	const { setShowModal } = useModal();
	const { categoria, updateCategoria } = props;
	const { setLoader } = useLoader();
	const conditionPortada = categoria.portada ? true : false;

	const { file, haveDeleted, containerUpload } = useUploadFile({
		label: 'Actualiza la portada de tu categoria',
		initialValue: !conditionPortada
			? null
			: { img: PF + categoria.portada, file: null },
	});

	const INITIAL_VALUES = {
		nombre: categoria.nombre,
		status: categoria.status,
		descripcion: categoria.descripcion,
	};

	async function EditarCategoria(values: CategoriaType) {
		try {
			setLoader(true, 'Editando categoria...');
			const form = new FormData();
			for (const key in values) {
				if (Object.hasOwnProperty.call(values, key)) {
					// @ts-ignore
					form.append(key, values[key]);
				}
			}

			form.append('borrarImagen', haveDeleted ? 'true' : 'false');

			if (file?.file) {
				const [compressedImage] = await compressImages([file.file]);
				form.append('file', compressedImage, compressedImage.name);
			}

			const url = '/categorias/' + categoria.idcategoria;
			const response = await clienteAxios.put(url, form, {
				headers: {
					'content-type': 'multipart/form-data',
				},
			});

			toast.success(response.data.msg);
			updateCategoria(response.data.categoria);
			setShowModal(false);
		} catch (e) {
			handleError(e);
		} finally {
			setLoader(false);
		}
	}

	return (
		<Formik
			onSubmit={EditarCategoria}
			initialValues={INITIAL_VALUES}
			validate={validarCategoria}
		>
			<Form style={{ width: '100%' }}>
				<div className="form-row">
					<div className="col-lg-6">
						<Input
							label="Nombre Categor??a"
							name="nombre"
							placeholder="Ingresa el nombre de la categor??a"
							required
						/>

						<Textarea
							label={'Descripci??n Categor??a'}
							placeholder={
								'Ingrese la descripci??n de la categor??a'
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
						/>
					</div>
					<div className="col-lg-6 mb-5 mb-lg-0">
						{containerUpload}
					</div>
				</div>
				<Button text={'Editar Categor??a'} />
			</Form>
		</Formik>
	);
};

export default FormularioEditarCategoria;
