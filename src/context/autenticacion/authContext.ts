import { createContext } from 'react';
import { initialValueStateAuth } from './interfaces';

const authContext = createContext(initialValueStateAuth);

export default authContext;
