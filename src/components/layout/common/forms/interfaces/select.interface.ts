export interface SelectInterface {
	label: string;
	required?: boolean;
	values: Array<SeleccionadoInterface>;
	name: string;
	placeholder?: string;
	busquedaInput?: boolean;
	onChange?(e: string | number): void;
}

export interface SeleccionadoInterface {
	label: string;
	value: string | number;
}
