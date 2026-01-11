
import React, { useState, useEffect } from 'react';
import { FoodContext } from './FoodContext';

const FoodProvider = ({ children, user }) => {
  const [foodData, setFoodData] = useState([]);

 
  useEffect(() => {
    if (!user?.email) return;

    fetch(`${import.meta.env.VITE_API_URL}/addedFoods/addFood?email=${user.email}`)
      .then(res => res.json())
      .then(data => setFoodData(data))
      .catch(console.error);
  }, [user]);

 
  useEffect(() => {
    const checkAndResetDaily = () => {
      const today = new Date().toDateString();
      const lastReset = localStorage.getItem('lastFoodReset');

      if (lastReset !== today) {
        setFoodData([]);
        localStorage.setItem('lastFoodReset', today);
      }
    };

    checkAndResetDaily(); 

    const interval = setInterval(checkAndResetDaily, 60000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <FoodContext.Provider value={{ foodData, setFoodData }}>
      {children}
    </FoodContext.Provider>
  );
};
export default FoodProvider;