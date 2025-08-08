import React, { useState, useEffect } from 'react';
import AddFoodButton from '../Elements/AddFoodbutton';
import { isTimeBetween } from '../utilities/TimeFiltering';
import FoodListWithDetails from '../Elements/FoodListWithDetails';
import { useContext } from 'react';
import { AuthContext } from '../Authentication/AuthProvider';
import { getActiveSection } from '../utilities/ActiveSection';

const Noon = ({isActive}) => {
   const { user } = useContext(AuthContext);
  const [foodData, setFoodData] = useState([]);
 const section = getActiveSection();

  const noonFoods = foodData.filter(food => {
    if (!food.createdAt) return false;
    return isTimeBetween(new Date(food.createdAt), 12, 0, 17, 59);

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
          <h2 className="font semibold text-xl text-pink-500 font-mono">Noon</h2>
          <p className="text-sm text-gray-400">(12.00 - 5.59) PM</p>
        </div>

         
       
        <AddFoodButton disabled={!isActive}  setFoodData={setFoodData} activeSection={getActiveSection()}/>
      </header>
  
     <div className='mt-5'>
       <FoodListWithDetails foodData={noonFoods} />
     </div>
    </div>
  );
};

export default Noon;
