import React, { useContext, useState } from 'react';
import AddFoodModal from './AddFoodModal';
import { AuthContext } from '../Authentication/AuthProvider';

const AddFoodButton = ({ disabled, setFoodData, activeSection }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { user } = useContext(AuthContext);

  const handleOpenModal = () => {
    if (!disabled) setIsOpenModal(true);
  };

  const handleCloseModal = () => setIsOpenModal(false);

  const handleAddFoodSubmit = async (newFood) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/addedFoods/addFood`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newFood,
          email: user.email,
          section: activeSection,
        }),
      });

      if (!response.ok) throw new Error('Failed to add food');

      const savedFood = await response.json();
      setFoodData(prev => [...prev, savedFood]);
      setIsOpenModal(false);
    } catch (error) {
      console.error('Error adding food:', error);
    }
  };

  return (
    <div>
      <button
        onClick={handleOpenModal}
        disabled={disabled}
        className={`
          px-3 py-1 border-white border rounded-4xl font-semibold text-white
          transition-transform duration-200 ease-in-out
          ${disabled 
            ? 'bg-gray-500 cursor-not-allowed opacity-60' 
            : 'bg-gradient-to-r from-green-00 to-green-900 hover:scale-105 shadow-lg'}
        `}
      >
        + Add Food
      </button>

      {isOpenModal && (
        <AddFoodModal 
          onClose={handleCloseModal} 
          onSubmit={(newFood) => handleAddFoodSubmit(newFood)} 
        />
      )}
    </div>
  );
};

export default AddFoodButton;
