import React, { useContext } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { CgLogIn } from "react-icons/cg";
import { AuthContext } from '../Authentication/AuthProvider';
import { auth } from './Firebase';

const Google = () => {
  const { setUser } = useContext(AuthContext);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

   const handleGoogleReg = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
      

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
     <button onClick={handleGoogleReg} className="btn btn-outline rounded-full btn-sm md:btn-lg  text-green-500  "><CgLogIn /> </button>
     
    </div>
  );
};

export default Google;
