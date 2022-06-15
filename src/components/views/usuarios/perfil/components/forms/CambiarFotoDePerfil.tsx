import { useEffect } from 'react';
import useDropzone from '../../../../../../hooks/useDropzone';
import clienteAxios from '../../../../../../config/axios';
import { toast } from 'react-toastify';
import Compressor from 'compressorjs';
import { useLoader } from '../../../../../../context/loaderpage/LoaderPageState';
import { handleError, PF } from '../../../../../utils';
import { useAuthContext } from '../../../../../../context/autenticacion/authState';
import { UserType } from '../../../types';
import { File } from '../../../../../../extensions';
const CambiarFotoDePerfil = () => {
	const { usuario, usuarioAutenticado } = useAuthContext();
	const { setLoader } = useLoader();
	const { DropzoneContenedor, setFiles } = useDropzone({
		action: 'single',
		labelText: 'Arrastra y suelta o haz click para cambiar tu foto de perfil',
		onUpload: handleUpload,
		onDeleteFile: handleDeleteFile,
	});

	useEffect(() => {
		function getFiles() {
			if (usuario.image_profile) {
				// @ts-ignore
				setFiles([{ preview: PF + usuario.image_profile, id: 1 }]);
			}
		}

		getFiles();
		// eslint-disable-next-line
	}, []);

	async function handleDeleteFile() {
		try {
			setLoader(true, 'Eliminando foto de perfil...');
			const response = await clienteAxios.delete('/perfil/BorrarFotoPerfil');
			toast.success(response.data.msg);
			const localStoragePersona = JSON.parse(localStorage.getItem('persona'));
			const personaRecordar = localStoragePersona as UserType;
			if (personaRecordar) {
				try {
					const newData = {
						...personaRecordar,
						image_profile: '',
					} as UserType;
					localStorage.setItem('persona', JSON.stringify(newData));
				} catch (error) {}
			}
			usuarioAutenticado();
		} catch (error) {
			handleError(error);
		} finally {
			setLoader(false);
		}
	}

	function handleUpload(file: File) {
		new Compressor(file, {
			quality: 0.8,
			maxWidth: 500,
			async success(file: File) {
				try {
					setLoader(true, 'Subiendo foto de Perfil');
					let formData = new FormData();
					formData.append('file', file, file.name);
					const url = '/perfil/changeFotoPerfil';
					const response = await clienteAxios.put(url, formData, {
						headers: {
							'content-type': 'multipart/form-data', // do not forget this
						},
					});
					const localStoragePersona = JSON.parse(
						localStorage.getItem('persona')
					);
					const personaRecordar = localStoragePersona as UserType;
					if (personaRecordar) {
						const newData = {
							...personaRecordar,
							image_profile: response.data.image_profile,
						} as UserType;

						localStorage.setItem(
							'persona',
							JSON.stringify(newData)
						);
					}
					file.id = 1;
					file.preview = PF + response.data.image_profile;

					setFiles([file]);
					toast.success(response.data.msg);
					usuarioAutenticado();
				} catch (error) {
					handleError(error);
				} finally {
					setLoader(false);
				}
			},
			error(error) {
				console.log(error);
			},
		});
	}
	return <div className="form-group mt-3">{DropzoneContenedor}</div>;
};

export default CambiarFotoDePerfil;
