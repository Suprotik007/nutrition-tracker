import React, { useState } from 'react';
import FoodItems from '../Elements/FoodItems';
import NutritionDetails from '../Components/NutritionDetails';


const FoodListWithDetails = ({ foodData }) => {
  const [selectedFood, setSelectedFood, handleDeleteFood] = useState(null); 


  
  return (
    <>
      <FoodItems 
        foodData={foodData} 
        onSeeDetails={food => setSelectedFood(food)} 
         onDelete={handleDeleteFood}
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
