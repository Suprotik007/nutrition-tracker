// src/Context/FoodContext.jsx
import React, { createContext, useState } from 'react';

export const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const [foodData, setFoodData] = useState([]);

  return (
    <FoodContext.Provider value={{ foodData, setFoodData }}>
      {children}
    </FoodContext.Provider>
  );
};
