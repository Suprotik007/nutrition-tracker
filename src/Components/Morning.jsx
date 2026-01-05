import React, { useState, useEffect, useContext } from 'react';
import AddFoodButton from '../Elements/AddFoodbutton';
import { isTimeBetween } from '../utilities/TimeFiltering';
import FoodListWithDetails from '../Elements/FoodListWithDetails';
import { AuthContext } from '../Authentication/AuthProvider';
import { getActiveSection } from '../utilities/ActiveSection';

const Morning = ({ isActive }) => {
  const { user } = useContext(AuthContext);
  const [foodData, setFoodData] = useState([]);
  const section = getActiveSection();

  useEffect(() => {
    if (user?.email && section) {
      fetch(`${import.meta.env.VITE_API_URL}/addedFoods/addFood?email=${user.email}&section=${section}`)
        .then(res => res.json())
        .then(data => setFoodData(data))
        .catch(console.error);
    }
  }, [user, section, isActive]);

  const morningFoods = foodData.filter(food => {
    if (!food.createdAt) return false;
    const created = new Date(food.createdAt);
    return isTimeBetween(created, 6, 0, 11, 59);
  });

  return (
    <div
      className={`relative rounded-2xl p-5 border 
        ${isActive ? 'border-yellow-400 shadow-lg bg-yellow-50/10' : 'border-zinc-700 bg-zinc-900'}
        transition-all duration-300`}
    >
      {/* Header */}
      <header className="flex  md:flex-row justify-between items-start md:items-center">
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <h2 className="font-mono font-semibold text-xl md:text-2xl text-yellow-400">
            Morning
          </h2>
          <p className="text-gray-400 text-sm md:text-base">(6:00 - 11:59 AM)</p>

        </div> 

  
        {/* Active badge */}
       {isActive && (
      <span className="bg-yellow-400 text-zinc-900 text-xs font-semibold px-3 py-1 mx-3 md:mx-38 lg:mx-62 rounded-full animate-pulse">
        Active
      </span>
    )}

     <div>
         <AddFoodButton
          disabled={!isActive}
          setFoodData={setFoodData}
          activeSection={getActiveSection()}
          className="mt-3 md:mt-0"
        />

     </div>



      

      </header>


      {/* Food list */}
      <div className="mt-5">
        {morningFoods.length === 0 ? (
          <p className="text-gray-400 text-center py-6">
            No foods added yet for this meal.
          </p>
        ) : (
          <FoodListWithDetails foodData={morningFoods} />
        )}
      </div>

      
    </div>
  );
};

export default Morning;
