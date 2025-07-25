import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { store } from './redux/store/store.js'; // o './app/store' según tu estructura
import './index.css'
import './assets/fonts/fontawesome-free-6.1.2-web/css/all.min.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <GoogleOAuthProvider clientId="993503797766-ddl5h89ieug0bv0kkf0e60pjdah15mkc.apps.googleusercontent.com">
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </GoogleOAuthProvider>
    </Provider>
)
