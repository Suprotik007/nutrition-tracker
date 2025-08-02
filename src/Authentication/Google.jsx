import React, { useContext } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router';

import { AuthContext } from './AuthProvider';
import { auth } from './Firebase';

const Google = () => {
  const { setUser } = useContext(AuthContext);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const handleGoogleReg = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

  const userInfo = {
  name: user.displayName,
  email: user.email,
  photoURL: user.photoURL
};


    const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    });

      setUser(user);
   
      navigate('/');

    } catch (error) {
      console.error('Google sign-in error:', error);
   
    }
  };

  return (
    <div>
      <button onClick={handleGoogleReg} className="btn bg-black text-white w-full max-w-sm">
      Sign In with Google
      </button>
      <ToastContainer />
    </div>
  );
};

export default Google;
