import React, { useState, useEffect } from 'react';
import { fetchNutritionData } from '../utilities/NutritionAPI'; 

const NutritionDetails = ({ food, onClose }) => {
  const [nutrition, setNutrition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 
  const queryText = `${food.amount}g ${food.foodName}`;


  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchNutritionData(queryText)
      .then(data => {
        console.log('Nutrition API response:', data);
        if (data.length === 0) {
          setError('No nutrition data found.');
        } else {
          setNutrition(data[0]);
        }
      })
      .catch(err => {
        setError('Nutrition data for this item is unavailable.');
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

        <h2 className="text-xl  font-medium mb-4 text-center" > <span className=''>{food.foodName} </span></h2>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {nutrition && (
          <div >
          {nutrition.photo?.highres && (
  <img 
    src={nutrition.photo.highres} 
    alt={food.foodName} 
    className="w-32  object-cover mx-auto mb-4 rounded-full  shadow-md"
  />
)}

          <table className="w-full text-left font-semibold text-white text-sm mt-4 border border-blue-500 rounded">
  <tbody>
    <tr>
      <td className="border-b border-blue-500  px-2">Serving Size</td>
      <td className="border-b border-blue-500   px-2">{nutrition.serving_qty} g</td>
    </tr>
    <tr>
      <td className="border-b border-blue-500  px-2">Calories</td>
      <td className="border-b border-blue-500   px-2">{nutrition.nf_calories} kcal</td>
    </tr>
    <tr>
      <td className="border-b border-blue-500  px-2">Protein</td>
      <td className="border-b border-blue-500  px-2">{nutrition.nf_protein} g</td>
    </tr>
    <tr>
      <td className="border-b border-blue-500 px-2">Carbohydrates</td>
      <td className="border-b border-blue-500  px-2">{nutrition.nf_total_carbohydrate} g</td>
    </tr>
    <tr>
      <td className="border-b border-blue-500 px-2">Total Fat</td>
      <td className="border-b border-blue-500 px-2">{nutrition.nf_total_fat} g</td>
    </tr>
    <tr>
      <td className="border-b border-blue-500 px-2">Saturated Fat</td>
      <td className="border-b border-blue-500 px-2">{nutrition.nf_saturated_fat} g</td>
    </tr>
    <tr>
      <td className="border-b border-blue-500 px-2">Fiber</td>
      <td className="border-b border-blue-500 px-2">{nutrition.nf_dietary_fiber} g</td>
    </tr>
    <tr>
      <td className="border-b border-blue-500 px-2">Sugar</td>
      <td className="border-b border-blue-500 px-2">{nutrition.nf_sugars} g</td>
    </tr>
    <tr>
      <td className="border-b border-blue-500 px-2">Sodium</td>
      <td className="border-b border-blue-500 px-2">{nutrition.nf_sodium} mg</td>
    </tr>
    <tr>
      <td className="border-b border-blue-500 px-2">Potassium</td>
      <td className="border-b border-blue-500 px-2">{nutrition.potassium_mg} mg</td>
    </tr>
    <tr>
      <td className="px-2">Cholesterol</td>
      <td className="px-2">{nutrition.nf_cholesterol} mg</td>
    </tr>
  </tbody>
</table>

          </div>
        )}
      </div>
    </div>
  );
};

export default NutritionDetails;



