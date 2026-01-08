import React, { useState } from 'react';
import FoodItems from '../Elements/FoodItems';
import NutritionDetails from '../Components/NutritionDetails';


const FoodListWithDetails = ({ foodData, setFoodData, incrementRefreshKey }) => {
  const [selectedFood, setSelectedFood] = useState(null);


  return (
    <>
      <FoodItems
        foodData={foodData}
        setFoodData={setFoodData}
        onSeeDetails={food => setSelectedFood(food)}
        incrementRefreshKey={incrementRefreshKey}
      />

      {selectedFood && (
        <NutritionDetails 
          food={selectedFood} 
          onClose={() => setSelectedFood(null)} 
        />
      )}
    </>
  );
};

export default FoodListWithDetails;
