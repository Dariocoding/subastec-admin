import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
export const handleError = (e: AxiosError): void => {
	//@ts-ignore
	if (e.response?.data?.error) {
		//@ts-ignore
		toast.error(e.response.data.message);
	} else alert('Ha ocurrido un error...');
	console.error('Hubo un error ', e.message);
};
