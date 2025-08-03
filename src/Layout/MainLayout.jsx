import React from 'react';

import { Outlet } from 'react-router';
import NavigationBar from '../Components/NavigationBar';

const MainLayout = () => {
    return (
    <div className='w-12/12 mx-auto'>
           <header className='mb-8 sticky top-0 z-50'>
             <NavigationBar></NavigationBar>
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