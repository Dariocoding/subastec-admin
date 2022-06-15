import { createContext } from 'react';

export interface loaderInterface {
	loadingLoader: boolean;
	setLoader(show: boolean, texto?: string): void;
}

const initialValues: loaderInterface = { setLoader() {}, loadingLoader: false };

const LoaderPageContext = createContext(initialValues);

export default LoaderPageContext;
