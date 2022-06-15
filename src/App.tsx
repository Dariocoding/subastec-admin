import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import tokenAuth from './config/token';
import RouteFallback from './routes/RoutesFallback';
import AppRouter from './routes/AppRouter';
import Layout from './components/layout/app/Layout';
// Revisar si tenemos un token
const token = localStorage.getItem('at');
if (token) tokenAuth(token);

function App() {
	return (
		<BrowserRouter>
			<Layout />
			<Suspense fallback={<RouteFallback />}>
				<AppRouter />
			</Suspense>
		</BrowserRouter>
	);
}

export default App;
