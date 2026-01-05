import React from 'react';

import { Outlet } from 'react-router';
import NavigationBar from '../Components/NavigationBar';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
    return (
    <div className='w-12/12 mx-auto'>
           <header className='mb-8 sticky top-0 z-50'>
             <NavigationBar></NavigationBar>
             <Toaster
  position="top-center"
  reverseOrder={false}
  toastOptions={{
    style: {
      background: '#1f2933',
      color: '#f9fafb',
      borderRadius: '12px',
      border: '1px solid #334155'
    },
  }}
/>

           </header>
           <main>
             <Outlet></Outlet>
           </main>
           {/* <footer className='mt-8'>
<Footer></Footer>
           </footer> */}
            
        </div>
    );
};

export default MainLayout;