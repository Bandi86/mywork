import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Galery from './components/Galery';
import Shop from './components/Shop';
import Contact from './components/Contact';
import About from './components/About';
import Login from './components/Login';
import Layout from './Layout';
import Cart from './components/Cart'; 

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [{
      path: '/', element: <App />
    },   
    {
      path: '/galery', element: <Galery />
    },
    {
      path: '/shop', element: <Shop />
    },
    {
      path: '/about', element: <About />      
    },
    {
      path: '/contact', element: <Contact />
    },    
    {
      path: '/login', element: <Login />
    },
    { path: '/cart', element: <Cart />
    },
  ]} 
]) 


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  
    <RouterProvider router={router} />
 
);


