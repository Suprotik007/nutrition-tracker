import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import { RouterProvider } from "react-router";

import AuthProvider from './Authentication/AuthProvider.jsx';
import FoodProvider from './Elements/FoodProvider.jsx';
import router from '../router.jsx';



 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
       <FoodProvider>
        <RouterProvider router={router} />
      </FoodProvider>
      </AuthProvider>
  </StrictMode>,
)
