import React from 'react';
import * as ReactDOM from 'react-dom/client';
import './Assets/css/bootstrap.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'react-lazy-load-image-component/src/effects/blur.css';
import AuthState from './context/autenticacion/authState';
import ConfigState from './context/configuracion/ConfigState';
import ModalState from './context/modal/ModalState';
import 'react-toastify/dist/ReactToastify.css';
import './extensions';
import SocketState from './context/socket/SocketContext';
import LoaderPageState from './context/loaderpage/LoaderPageState';
import moment from 'moment-timezone';

export const momentTz = moment.tz.setDefault('America/Chicago');
console.log(momentTz().toDate());

const divRoot = document.getElementById('root');
const root = ReactDOM.createRoot(divRoot);

root.render(
	<AuthState>
		<LoaderPageState>
			<ConfigState>
				<ModalState>
					<SocketState>
						<App />
					</SocketState>
				</ModalState>
			</ConfigState>
		</LoaderPageState>
	</AuthState>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
