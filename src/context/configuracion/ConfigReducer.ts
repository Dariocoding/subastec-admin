import { OBTENER_CONFIGURACION } from '../types';
import { ConfigInterfaceContext } from './ConfigContext';

const ConfigReducer = (state: ConfigInterfaceContext, action: { type: string; payload?: any }) => {
	switch (action.type) {
		case OBTENER_CONFIGURACION:
			return {
				...state,
				configuracion: action.payload,
			};

		default:
			return state;
	}
};
export default ConfigReducer;
