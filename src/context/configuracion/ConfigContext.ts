import { createContext } from 'react';
import { SettingsType } from '../../components/views/settings/types';

export interface ConfigInterfaceContext {
	configuracion?: SettingsType;
	obtenerConfiguracion?(): void;
}

export const initialValuesStateConfig: ConfigInterfaceContext = {};

const ConfigContext = createContext(initialValuesStateConfig);

export default ConfigContext;
