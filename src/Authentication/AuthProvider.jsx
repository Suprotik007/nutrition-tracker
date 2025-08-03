import React, { useEffect, useState, createContext } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { app } from '../Authentication/Firebase';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

 

  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(currentUser) => {
      setUser(currentUser);
      setLoading(false);

     
    });

    return () => unsubscribe();
  }, []);

  const authData = {
    user,
    setUser,
    logOut,
    loading,
    setLoading,
    updateUser,
    
  };

  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
