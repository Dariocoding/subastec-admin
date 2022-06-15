import { useEffect } from 'react';
import { GrCloudUpload } from 'react-icons/gr';
import clienteAxios from '../../../../../config/axios';
import useDropzone from '../../../../../hooks/useDropzone';
import { toast } from 'react-toastify';
import { compressImages, PF } from '../../../../utils';
import { useLoader } from '../../../../../context/loaderpage/LoaderPageState';
import { ImagenesType, ProductoType } from '../../types';
import { File } from '../../../../../extensions';

interface IEditarImagenesProductoProps {
	producto: ProductoType;
}
const EditarImagenesProducto: React.FunctionComponent<IEditarImagenesProductoProps> = props => {
	const { producto } = props;
	const { idproducto, imagenes } = producto;
	const { setLoader } = useLoader();
	const { DropzoneContenedor, setFiles, files } = useDropzone({
		labelText: 'Arrastra y suelte o haz click para subir fotos de su producto',
		onUpload: async files => {},
		onDeleteFile: handleDeleteFile,
		limit: 10,
	});

	useEffect(() => {
		function getFiles() {
			let files: File[] = [];
			imagenes.forEach(imagen => {
				files = [
					// @ts-ignore
					...files,
					// @ts-ignore
					{
						key: imagen.id,
						preview: PF + imagen.filename,
						id: imagen.id,
					},
				];
			});
			setFiles(files);
		}

		getFiles();
		// eslint-disable-next-line
	}, []);

	async function handleDeleteFile(file: File) {
		try {
			setLoader(true, 'Eliminando imágen...');
			const response = await clienteAxios.delete(
				`/productos/deleteImagen/${file.id}`
			);
			toast.success(response.data.msg);
		} catch (error) {
			console.log(error);
		} finally {
			setLoader(false);
		}
	}

	async function handleUpload(newFiles: File[]) {
		try {
			setLoader(true, 'Subiendo imágenes...');
			let formData = new FormData();

			const images = await compressImages(newFiles);

			images.forEach(file => formData.append(`files`, file, file.name));

			const url = `productos/uploadImages/${idproducto}`;
			const response = await clienteAxios.put(url, formData, {
				headers: {
					'content-type': 'multipart/form-data',
				},
			});

			const imgs = response.data.imgs as ImagenesType[];

			newFiles = newFiles.map((n, index) => {
				n.id = imgs[index].id;
				n.preview = PF + imgs[index].filename;
				return n;
			});

			const newArray = [...files, ...newFiles];
			setFiles(newArray);
			toast.success(response.data.msg);
		} catch (error) {
			console.log(error);
		} finally {
			setLoader(false);
		}
	}

	return (
		<div className="form-group mt-3">
			<h4 className="text-center">
				Editar Imágenes del Producto <GrCloudUpload />
			</h4>
			{DropzoneContenedor}
		</div>
	);
};

export default EditarImagenesProducto;
