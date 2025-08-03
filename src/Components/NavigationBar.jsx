import React, { useContext } from 'react';
import { Link } from 'react-router'; // Fixed: was incorrectly using 'react-router'
import Google from '../Authentication/Google';
import { CgLogOut } from "react-icons/cg";
import { AuthContext } from '../Authentication/AuthProvider';

const NavigationBar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log('Logged out');
      })
      .catch((err) => {
        console.error('Logout error:', err);
      });
  };

  return (
    <div className="navbar bg-black border-b-2 border-gray-400 sticky top-0 z-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">CalcBite</Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className='gap-2 flex items-center'>
          <img src={user.photoURL} alt={user.displayNAme} className='rounded-full w-10 h-10  ' />
            <button onClick={handleLogOut} className="btn btn-outline btn-error btn-sm rounded-full">
            <CgLogOut />
            </button>
          </div>
        ) : (
          <Google />
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
