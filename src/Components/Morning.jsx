import React, { useState } from 'react';
import AddFoodModal from '../Elements/AddFoodModal';

const Morning = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [foodData, setFoodData] = useState([]);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };


  const handleAddFoodSubmit = async (newFood) => {
    console.log('Food added:', newFood);

    try {
      const response = await fetch('http://localhost:3000/addedFoods', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFood),
      });

      if (!response.ok) {
        throw new Error('Failed to add food');
      }

      const savedFood = await response.json();
      setFoodData((prevFoodData) => [...prevFoodData, savedFood]);

      setIsOpenModal(false);
    } catch (error) {
      console.error('Error adding food:', error);

    }
  };

  return (
    <div className="border-2 rounded-xl p-5">
      <header className="flex justify-between">
        <div className="flex flex-row items-center gap-2">
          <h2 className="font semibold text-xl text-pink-500 font-mono">Morning</h2>
          <p className="text-sm text-gray-400">(6.00 - 11.59) AM</p>
        </div>

        <button onClick={handleOpenModal} className="btn btn-outline text-gray-300">
          + Add Food
        </button>
      </header>

      {/* food list */}
      {foodData.length === 0 ? (
        <p className="p-5 text-center text-gray-500">No foods added yet. Click "Add Food" to get started.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {foodData.map((food) => (
            <li key={food._id} className="px-4 py-2 border rounded">
              <strong>{food.foodName}</strong>: {food.amount}
            </li>
          ))}
        </ul>
      )}

      {/* modal */}
      {isOpenModal && <AddFoodModal onClose={handleCloseModal} onSubmit={handleAddFoodSubmit} />}
    </div>
  );
};

export default Morning;
