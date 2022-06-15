import { useReducer, useContext } from 'react';
import ConfigContext from './ConfigContext';
import ConfigReducer from './ConfigReducer';

import clienteAxios from '../../config/axios';
import { OBTENER_CONFIGURACION } from '../types';
import { initialValuesStateConfig, ConfigInterfaceContext } from './ConfigContext';

const ConfigState = (props: { children: JSX.Element }) => {
	const [state, dispatch] = useReducer(ConfigReducer, initialValuesStateConfig);

	// Retorna el usuario autenticado
	const obtenerConfiguracion = async () => {
		try {
			const { data } = await clienteAxios.get('/settings');
			dispatch({
				type: OBTENER_CONFIGURACION,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: OBTENER_CONFIGURACION,
				payload: {},
			});
		}
	};

	const valuesProvider: ConfigInterfaceContext = {
		configuracion: state.configuracion,
		obtenerConfiguracion,
	};

	return (
		<ConfigContext.Provider value={valuesProvider}>
			{props.children}
		</ConfigContext.Provider>
	);
};
export default ConfigState;

export const useConfigContext = () => useContext(ConfigContext);
