import React, { useContext, useState } from 'react';
import AddFoodModal from './AddFoodModal';
import { getActiveSection } from '../utilities/ActiveSection';
import { AuthContext } from '../Authentication/AuthProvider';

const AddFoodButton = ({ disabled,setFoodData,activeSection }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
const {user}=useContext(AuthContext)
  const handleOpenModal = () => {
   if (!disabled)  setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleAddFoodSubmit = async (newFood,) => {
    try {
    
      const response = await fetch(`${import.meta.env.VITE_API_URL}/addedFoods/addFood`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        ...newFood,
        email: user.email,
        section: activeSection  // pass section
      }),
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
      <button onClick={handleOpenModal}    disabled={disabled} className={`btn btn-outline text-green-600 ${disabled ? 'opacity-50 text-red-400 cursor-not-allowed' : ''}`}>
        + Add Food
      </button>

    {isOpenModal && <AddFoodModal onClose={handleCloseModal} onSubmit={(newFood) => handleAddFoodSubmit(newFood, getActiveSection())} />}

    </div>
  );
};

export default AddFoodButton;
