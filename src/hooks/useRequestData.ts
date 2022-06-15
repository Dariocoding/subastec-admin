import { useState, useEffect } from 'react';
import clienteAxios from '../config/axios';
import { useRequestInterface } from './interfaces';

type ReturnUseRequestData<T> = [
	T,
	boolean,
	() => void,
	(newValues: T) => void,
	(cargando: boolean) => void
];

const useRequestData = <T>(
	STATE_INICIAL: T,
	{ url, onCompleteData, recieveDataFromCompleteData }: useRequestInterface<T>
): ReturnUseRequestData<T> => {
	const [data, setData] = useState<T>(STATE_INICIAL);
	const [cargando, setCargando] = useState(true);

	useEffect(() => {
		obtenerDatos();
		// eslint-disable-next-line
	}, []);

	async function obtenerDatos() {
		try {
			const request = await clienteAxios(url);
			if (onCompleteData) {
				if (recieveDataFromCompleteData) {
					setData(
						onCompleteData(request.data)
							? request.data
							: onCompleteData(request.data)
					);
				}
				onCompleteData(request.data);
			}
			setData(request.data);
		} catch (error) {
			console.log(error);
		} finally {
			setCargando(false);
		}
	}

	return [data, cargando, obtenerDatos, setData, setCargando];
};

export default useRequestData;
