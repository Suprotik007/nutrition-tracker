import React, { useState, useEffect } from 'react';
import FoodItems from '../Elements/FoodItems';
import AddFoodButton from '../Elements/AddFoodbutton';
import { isTimeBetween } from '../utilities/TimeFiltering';
import FoodListWithDetails from '../Elements/FoodListWithDetails'
const Night = ({isActive}) => {
  const [foodData, setFoodData] = useState([]);

  const nightFoods = foodData.filter(food => {
    if (!food.createdAt) return false;
    return isTimeBetween(new Date(food.createdAt), 18, 0, 23, 59);

  })
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
          <h2 className="font semibold text-xl text-pink-500 font-mono">Night</h2>
          <p className="text-sm text-gray-400">(6.00 - 11.59) PM</p>
        </div>
      
          
        <AddFoodButton disabled={!isActive}  setFoodData={setFoodData} />
      </header>
  
     <div className='mt-5'>
       {/* <FoodItems foodData={nightFoods}  /> */}
       <FoodListWithDetails foodData={nightFoods} />

     </div>
    </div>
  );
};

export default Night;
