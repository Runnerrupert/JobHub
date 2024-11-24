import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Customer from './pages/Customer';
import Employee from './pages/Employee';
import Jobs from './pages/Jobs';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import './styles/index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <LandingPage />
      }, 
      {
        path: '/login',
        element: <Login />
      }, 
      {
        path: '/create-account',
        element: <CreateAccount />
      }, 
      {
        path: '/home',
        element: <Home />
      }, 
      {
        path: '/customers',
        element: <Customer />
      }, 
      {
        path: '/employees',
        element: <Employee/>
      },
      {
        path: '/jobs',
        element: <Jobs/>
      },
    ],
  },
]);

const rootElement = document.getElementById('root');

if(rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <RouterProvider router={router} />
  );
}

