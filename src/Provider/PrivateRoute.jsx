import React, { use } from 'react';

import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Authentication/AuthProvider';


const PrivateRoute = ({children}) => {
    const{user}= use(AuthContext)
  

    const location=useLocation()
    
  
    if(user && user.email ){
        return children;
    }
    return <Navigate state={location.pathname} to=''></Navigate>   
   
    
        
    
};

export default PrivateRoute;