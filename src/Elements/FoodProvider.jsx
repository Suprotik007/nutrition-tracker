


import React, { useState, useEffect } from 'react';
import { FoodContext } from './FoodContext';

const FoodProvider = ({ children, user }) => {
  const [foodData, setFoodData] = useState([]);

  // Fetch all foods for the user
  useEffect(() => {
    if (!user?.email) return;

    fetch(`${import.meta.env.VITE_API_URL}/addedFoods/addFood?email=${user.email}`)
      .then(res => res.json())
      .then(data => setFoodData(data))
      .catch(console.error);
  }, [user]);

  return (
    <FoodContext.Provider value={{ foodData, setFoodData }}>
      {children}
    </FoodContext.Provider>
  );
};
export default FoodProvider;