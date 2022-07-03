import moment from 'moment-timezone';
export const SMONEY = '$';
export const PF = process.env.REACT_APP_PUBLIC_URL;
export const fechaActual = () => moment().toDate();

export const RADMIN = 1;
export const RUSER = 2;
export const IDSUPERADMINISTRADOR = 1;
export const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	maximumFractionDigits: 2,
});
