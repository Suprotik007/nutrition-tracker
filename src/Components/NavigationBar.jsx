import React, { useContext } from 'react';
import { Link } from 'react-router';
import Google from '../Authentication/Google';
import { CgLogOut } from "react-icons/cg";
import { AuthContext } from '../Authentication/AuthProvider';

const NavigationBar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => console.log('Logged out'))
      .catch(err => console.error('Logout error:', err));
  };

  return (
    <nav className="w-full sticky top-0 z-20 bg-black/90 backdrop-blur-md border-b border-gray-700 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3 md:py-4">
        
        {/* Logo & Mobile Menu */}
        <div className="flex items-center gap-3">
          {/* Mobile Hamburger */}
          <div className="lg:hidden dropdown">
            <label tabIndex={0} className="btn btn-ghost p-2 rounded-md hover:bg-gray-800 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="dropdown-content menu bg-black rounded-lg mt-2 shadow-lg w-40 p-2 text-white">


               <li>
                <Link to="/bmi-calculator" className="hover:text-yellow-400 text-yellow-400 transition">BMI Calculator</Link>
              </li>

              <li>
                <Link to="/dashboard" className="hover:text-yellow-400 text-yellow-400 transition">Dashboard</Link>
              </li>

             
            </ul>
          </div>

          {/* Logo */}
          <Link to="/" className="text-center font-bold font-s text-2xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-600 drop-shadow-lg">
            CalcBite
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-6 items-center">
          
           <Link to="/bmi-calculator" className="text-yellow-400 font-medium hover:text-yellow-400 transition">
            BMI Calculator
          </Link>

          <Link to="/dashboard" className="text-yellow-400 font-medium hover:text-yellow-400 transition">
            Dashboard
          </Link>

          

        </div>

        {/* User Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <img 
                src={user.photoURL} 
                alt={user.displayName} 
                className="w-10 h-10 rounded-full shadow-md border border-yellow-400 object-cover"
              />
              <button 
                onClick={handleLogOut} 
                className="btn btn-sm btn-outline btn-error rounded-full hover:bg-red-600 hover:text-white transition"
              >
                <CgLogOut className="text-xl" />
              </button>
            </>
          ) : (
            <Google />
          )}
        </div>

      </div>
    </nav>
  );
};

export default NavigationBar;
