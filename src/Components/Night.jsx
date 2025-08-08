import React, { useState, useEffect, useContext } from 'react';
import AddFoodButton from '../Elements/AddFoodbutton';
import { isTimeBetween } from '../utilities/TimeFiltering';
import FoodListWithDetails from '../Elements/FoodListWithDetails'
import { AuthContext } from '../Authentication/AuthProvider';
import { getActiveSection } from '../utilities/ActiveSection';

const Night = ({isActive}) => {
  
    const { user } = useContext(AuthContext);
  const [foodData, setFoodData] = useState([]);
  const section = getActiveSection();
  
  const nightFoods = foodData.filter(food => {
    if (!food.createdAt) return false;
    return isTimeBetween(new Date(food.createdAt), 18, 0, 23, 59);

  })

  useEffect(() => {
    if (user?.email && section) {
      fetch(`${import.meta.env.VITE_API_URL}/addedFoods/addFood?email=${user.email}&section=${section}`)
        .then(res => res.json())
        .then(data => setFoodData(data))
        .catch(console.error);
    }
  }, [user, section, isActive]);


  return (
    <div className="border-2 rounded-xl p-5">
      <header className="flex justify-between">
        <div className="flex flex-row items-center gap-2">
          <h2 className="font semibold text-xl text-pink-500 font-mono">Night</h2>
          <p className="text-sm text-gray-400">(6.00 - 11.59) PM</p>
        </div>
      
          
        <AddFoodButton disabled={!isActive} activeSection={getActiveSection()}  setFoodData={setFoodData} />
      </header>
  
     <div className='mt-5'>
   
       <FoodListWithDetails foodData={nightFoods} />

     </div>
    </div>
  );
};

export default Night;
