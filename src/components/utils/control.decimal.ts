export const controlDecimal = (string: string): string =>
	string
		.replace(/\D/g, '')
		.replace(/([0-9])([0-9]{2})$/, '$1.$2')
		.replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ',');
