import React, { useState } from 'react';
import AddFoodModal from './AddFoodModal';

const AddFoodButton = ({ setFoodData }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleAddFoodSubmit = async (newFood) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/addedFoods/addFood`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFood),
      });

      if (!response.ok) {
        throw new Error('Failed to add food');
      }

      const savedFood = await response.json();

      
      setFoodData(prevFoodData => [...prevFoodData, savedFood]);

      setIsOpenModal(false);
    } catch (error) {
      console.error('Error adding food:', error);
    }
  };

  return (
    <div>
      <button onClick={handleOpenModal} className="btn btn-outline text-gray-300">
        + Add Food
      </button>

      {isOpenModal && <AddFoodModal onClose={handleCloseModal} onSubmit={handleAddFoodSubmit} />}
    </div>
  );
};

export default AddFoodButton;
