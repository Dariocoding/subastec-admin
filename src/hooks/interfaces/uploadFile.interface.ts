import { File } from '../../extensions';
export interface UploadFileInterface {
	label: string;
	initialValue?: { img: string | ArrayBuffer; file: File | undefined };
}
