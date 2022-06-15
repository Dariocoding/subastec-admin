import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
interface deleteInfoInterface {
	title: string;
	text: string;
	urlDelete?: string;
	textOnDelete?: string;
	callback(): void;
}

export const DeleteInfo = (props: deleteInfoInterface): void => {
	const { text, title, urlDelete, callback, textOnDelete } = props;
	Swal.fire({
		title,
		text,
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Si, eliminalo!',
		showLoaderOnConfirm: true,
		backdrop: true,
		preConfirm,
		reverseButtons: true,
		allowOutsideClick: () => !Swal.isLoading(),
	}).then(result => {
		if (result.isConfirmed) {
			Swal.fire({
				title: `${result?.value?.data?.msg || textOnDelete}`,
				icon: 'success',
			});

			callback();
		}
	});

	async function preConfirm() {
		try {
			let request;
			if (urlDelete) {
				request = await clienteAxios.delete(urlDelete);
			}
			return request;
		} catch (error) {
			if (error?.response?.data?.message) {
				Swal.showValidationMessage(error.response.data.message);
			} else {
				Swal.showValidationMessage(`Request failed: ${error}`);
			}
			Swal.hideLoading();
		}
	}
};
