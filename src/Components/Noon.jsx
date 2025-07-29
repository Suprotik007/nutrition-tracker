import React, { useState, useEffect } from 'react';
import FoodItems from '../Elements/FoodItems';
import AddFoodButton from '../Elements/AddFoodbutton';

const Noon = () => {
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/addedFoods/addFood`)
      .then(res => res.json())
      .then(setFoodData)
      .catch(console.error);
  }, []);

  return (
    <div className="border-2 rounded-xl p-5">
      <header className="flex justify-between">
        <div className="flex flex-row items-center gap-2">
          <h2 className="font semibold text-xl text-pink-500 font-mono">Noon</h2>
          <p className="text-sm text-gray-400">(12.00 - 5.59) PM</p>
        </div>
       
        <AddFoodButton setFoodData={setFoodData} />
      </header>
  
     <div className='mt-5'>
       <FoodItems foodData={foodData} />
     </div>
    </div>
  );
};

export default Noon;
