import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import { RouterProvider } from "react-router";
import router from '../router.jsx';
import AuthProvider from './Authentication/AuthProvider.jsx';
import FoodProvider from './Elements/FoodProvider.jsx';


 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
       <FoodProvider>
        <RouterProvider router={router} />
      </FoodProvider>
      </AuthProvider>
  </StrictMode>,
)
