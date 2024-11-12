import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configStore from './redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={configStore}>
    <BrowserRouter>
      <React.StrictMode>
      <ToastContainer />
        <App />
      </React.StrictMode>,
    </BrowserRouter>
  </Provider>
)
