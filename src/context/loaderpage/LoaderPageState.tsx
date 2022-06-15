import { useContext, useState } from 'react';
import LoaderPageContext, { loaderInterface } from './LoaderPageContext';
import Loader from './Loader';

export type SetLoaderType = (show: boolean, texto?: string) => void;

interface ILoaderPageState {
	children?: React.ReactNode;
}

const LoaderPageState: React.FunctionComponent<ILoaderPageState> = props => {
	const [showLoader, setShowLoader] = useState(false);
	const [textoLoader, setTextoLoader] = useState('');
	// Retorna el usuario autenticado
	const setLoader = (show: boolean, texto?: string) => {
		setShowLoader(show);
		setTextoLoader(texto);
	};

	const valuesProvider: loaderInterface = { setLoader, loadingLoader: showLoader };

	return (
		<LoaderPageContext.Provider value={valuesProvider}>
			<>
				<Loader show={showLoader} texto={textoLoader} />
				{props.children}
			</>
		</LoaderPageContext.Provider>
	);
};
export default LoaderPageState;

export const useLoader = () => useContext(LoaderPageContext);
