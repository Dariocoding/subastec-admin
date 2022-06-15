import { useState, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import { UploadFileInterface } from './interfaces';

const useUploadFile = ({ label, initialValue }: UploadFileInterface) => {
	const [file, setFile] = useState(initialValue);
	const [haveDeleted, setHaveDeleted] = useState(false);

	function onChangePhoto(e: ChangeEvent) {
		const target = e.target as HTMLInputElement;

		if (!target.files.length) return handleErrorFile('No has seleccionado una imágen');

		const file = target.files[0];
		const arrValidacion = ['image/jpeg', 'image/png', 'image/jpg'];

		if (!arrValidacion.includes(file.type))
			return handleErrorFile('Sólo se permiten imágenes');

		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onloadend = function (e) {
			const { result } = reader;

			setFile({ img: result, file });
		};
	}

	function handleErrorFile(mensaje: string) {
		toast.error('No has seleccionado una imágen');
		setFile(null);
		setHaveDeleted(true);
	}

	return {
		file,
		setFile,
		haveDeleted,
		containerUpload: (
			<div className="photo " style={{ height: file ? 'auto' : '87.5%' }}>
				<label htmlFor="foto">{label}</label>
				<div className="prevPhoto">
					<span
						onClick={() => {
							toast.success(
								'Imagen eliminada correctamente.'
							);
							setFile(null);
							setHaveDeleted(true);
						}}
						className={`delPhoto ${file ? '' : 'd-none'}`}
					>
						X
					</span>
					<label htmlFor="foto"></label>
					{file?.img && (
						<img
							src={
								typeof file.img === 'string'
									? file.img
									: ''
							}
							alt="Portada categoria"
						/>
					)}
				</div>
				<div className="upimg">
					<input
						type="file"
						className="d-none"
						name="foto"
						accept="image/x-png,image/gif,image/jpeg"
						onChange={onChangePhoto}
						id="foto"
					/>
				</div>
			</div>
		),
	};
};

export default useUploadFile;
