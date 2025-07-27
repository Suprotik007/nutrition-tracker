import React, { useState } from 'react';

const AddFoodModal = ({ onClose, onSubmit }) => {
  const [foodName, setFoodName] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ foodName, amount });
    setFoodName('');
    setAmount('');
    onClose();
  };

  return (
    <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-100">
      <div className="bg-black  z-100 border-2 border-yellow-300 rounded-lg p-6 w-80 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2   font-bold"
          aria-label="Close modal"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Add Food</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col">
            <span className="mb-1 font-medium">Food Name</span>
            <input
              type="text"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              required
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 "
              placeholder="Enter food name"
            />
          </label>

          <label className="flex flex-col">
            <span className="mb-1 font-medium">Amount</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="1"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 "
              placeholder="Enter amount"
            />
          </label>

          <button
            type="submit"
            className="btn btn-warning btn-outline rounded py-2 font-semibold  transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFoodModal;
