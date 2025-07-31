import React, { useState } from 'react';
import { fetchNutritionData } from '../utilities/NutritionAPI';

const NutritionDetails = () => {
  const [inputText, setInputText] = useState('');
  const [nutritionInfo, setNutritionInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetchNutrition = async () => {
    setLoading(true);
    setError(null);
    setNutritionInfo(null);

    try {
      const data = await fetchNutritionData(inputText);
      if (data.length === 0) {
        setError('No nutrition data found for this input.');
      } else {
        setNutritionInfo(data[0]); 
      }
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter food and amount (e.g. banana 120g)"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        style={{ width: '300px', marginRight: '10px' }}
      />
      <button onClick={handleFetchNutrition} disabled={loading || !inputText.trim()}>
        {loading ? 'Loading...' : 'See Details'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {nutritionInfo && (
        <div style={{ marginTop: '20px' }}>
          <h3>Nutrition Facts for {nutritionInfo.name}</h3>
          <p>Serving size: {nutritionInfo.serving_size_g} grams</p>
          <ul>
            <li>Calories: {nutritionInfo.calories} kcal</li>
            <li>Protein: {nutritionInfo.protein_g} g</li>
             <li>Carbohydrates: {nutritionInfo.carbohydrates_total_g} g</li>
            <li>Total Fat: {nutritionInfo.fat_total_g} g</li>
            <li>Saturated Fat: {nutritionInfo.fat_saturated_g} g</li>
        
            <li>Fiber: {nutritionInfo.fiber_g} g</li>
            <li>Sugar: {nutritionInfo.sugar_g} g</li>
            <li>Sodium: {nutritionInfo.sodium_mg} mg</li>
            <li>Potassium: {nutritionInfo.potassium_mg} mg</li>
            <li>Cholesterol: {nutritionInfo.cholesterol_mg} mg</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NutritionDetails;
