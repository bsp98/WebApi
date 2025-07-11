import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { store } from './redux/store/store.js'; // o './app/store' según tu estructura
import './index.css'
import './assets/fonts/fontawesome-free-6.1.2-web/css/all.min.css'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)
