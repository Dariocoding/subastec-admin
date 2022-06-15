import { File } from '../../extensions';

export async function toBase64(file: File) {
	const ab = await file.arrayBuffer();
	const ui8a = new Uint8Array(ab);
	const preview = `data:image/png;base64,${ui8a}`;
	//arr = new Uint8Array(arr) if it's an ArrayBuffer
	return (
		'data:image/png;base64,' +
		btoa(ui8a.reduce((data, byte) => data + String.fromCharCode(byte), ''))
	);
}
