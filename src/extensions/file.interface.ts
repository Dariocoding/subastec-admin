export interface File extends Blob {
	key?: string | number;
	readonly name?: string;
	id?: string | number;
	preview?: string;
}
