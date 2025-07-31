import React, { useState, useEffect } from 'react';
import { fetchNutritionData } from '../utilities/NutritionAPI'; 

const NutritionDetails = ({ food, onClose }) => {
  const [nutrition, setNutrition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 
  const queryText = `${food.amount} grams of ${food.foodName}`;


  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchNutritionData(queryText)
      .then(data => {
        if (data.length === 0) {
          setError('No nutrition data found.');
        } else {
          setNutrition(data[0]);
        }
      })
      .catch(err => {
        setError('Failed to fetch nutrition data.');
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [queryText]);

  return (
    <div className="fixed  w-10/12 mx-auto inset-1 flex items-center justify-center z-50">
      <div className="bg-black text- text- border-1 border-blue-500 rounded-lg p-6 max-w-md w-full relative">
        <button 
          onClick={onClose} 
          className="absolute top-2 text-2xl font-bold right-2 text-white"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-xl text-blue-400 font-medium mb-4">Nutrition Value : <span className=''>{food.foodName} ({food.amount}gm)</span></h2>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {nutrition && (
          <div >
          
            <ul className="list-disc text-lg  ml-5 mt-2">
              <li>Calories: {nutrition.calories} kcal</li>
              <li>Protein: {nutrition.protein_g} g</li>
               <li>Carbohydrates: {nutrition.carbohydrates_total_g} g</li>
              <li>Total Fat: {nutrition.fat_total_g} g</li>
              <li>Saturated Fat: {nutrition.fat_saturated_g} g</li>
              <li>Fiber: {nutrition.fiber_g} g</li>
              <li>Sugar: {nutrition.sugar_g} g</li>
              <li>Sodium: {nutrition.sodium_mg} mg</li>
              <li>Potassium: {nutrition.potassium_mg} mg</li>
              <li>Cholesterol: {nutrition.cholesterol_mg} mg</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NutritionDetails;
