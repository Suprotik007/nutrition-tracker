import React, { useState, useEffect, useContext } from 'react';
import AddFoodButton from '../Elements/AddFoodbutton';
import { isTimeBetween } from '../utilities/TimeFiltering';
import FoodListWithDetails from '../Elements/FoodListWithDetails';
import { AuthContext } from '../Authentication/AuthProvider';
import { getActiveSection } from '../utilities/ActiveSection';

const Noon = ({ isActive }) => {
  const { user } = useContext(AuthContext);
  const [foodData, setFoodData] = useState([]);
  const section = getActiveSection();

  
  const noonFoods = foodData.filter(food => {
    if (!food.createdAt) return false;
    return isTimeBetween(new Date(food.createdAt), 12, 0, 17, 59);
  });

  useEffect(() => {
    if (user?.email && section) {
      fetch(`${import.meta.env.VITE_API_URL}/addedFoods/addFood?email=${user.email}&section=${section}`)
        .then(res => res.json())
        .then(data => setFoodData(data))
        .catch(console.error);
    }
  }, [user, section, isActive]);

  return (
    <div
      className={`relative rounded-2xl p-5 border 
        ${isActive ? 'border-orange-400 shadow-lg bg-orange-50/10' : 'border-zinc-700 bg-zinc-900'}
        transition-all duration-300`}
    >
      {/* Header */}
      <header className="flex  md:flex-row justify-between items-start md:items-center">
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <h2 className="font-mono font-semibold text-xl md:text-2xl text-orange-400">
            Noon
          </h2>
          <p className="text-gray-400 text-sm md:text-base">(12:00 - 5:59 PM)</p>
        </div>

        <AddFoodButton
          disabled={!isActive}
          setFoodData={setFoodData}
          activeSection={getActiveSection()}
          className="mt-3 md:mt-0"
        />
      </header>

      {/* Food list */}
      <div className="mt-5">
        {noonFoods.length === 0 ? (
          <p className="text-gray-400 text-center py-6">
            No foods added yet for this meal.
          </p>
        ) : (
          <FoodListWithDetails foodData={noonFoods} />
        )}
      </div>

      {/* Active badge */}
      {isActive && (
        <span className="absolute top-3 right-3 bg-orange-400 text-zinc-900 text-xs font-medium px-2 py-1 rounded-full">
          Active
        </span>
      )}
    </div>
  );
};

export default Noon;
