import { StrictMode, useState, useEffect } from 'react';
import { Provider } from './components/ui/provider';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import Loading from './Loading.jsx';
const AppWrapper = () => {
	const [loading, setLoading] = useState(true);
  
	useEffect(() => {
	  // Simulate some async operation (e.g., fetching data from the backend)
	  setTimeout(() => {
		setLoading(false);
	  }, 2000);
	}, []);
  
	return loading ? <Loading /> : <App />;
  };
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <AppWrapper />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

