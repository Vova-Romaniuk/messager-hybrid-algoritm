import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GoogleOAuthProvider } from '@react-oauth/google';

import ConnectionContainer from './components/ConnectionContainer';
import routes from './pages';

const router = createBrowserRouter(routes);
// eslint-disable-next-line no-undef
const googleClientId = process.env.REACT_APP_GOOGLE_API_KEY;

const App = () => {
	useEffect(() => {
		document.body.style.height = `${window.innerHeight}px`;
	}, []);
	return (
		<GoogleOAuthProvider clientId={googleClientId}>
			<ConnectionContainer>
				<RouterProvider router={router} />
				<ToastContainer autoClose={3000} theme='colored' />
			</ConnectionContainer>
		</GoogleOAuthProvider>
	);
};

export default App;
