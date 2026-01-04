import React, { useState, useContext} from 'react';
import { AuthContext } from '../Authentication/AuthProvider';


const AddFoodModal = ({ onClose, onSubmit }) => {
  const { user } = useContext(AuthContext);

  const [foodName, setFoodName] = useState('');
  const [amount, setAmount] = useState('');
  const [focused, setFocused] = useState(false);

  
  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      email: user.email,
      foodName,
      amount
    });

    setFoodName('');
    setAmount('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
      <div className="relative w-full max-w-10/11 rounded-2xl bg-zinc-900 border border-zinc-700 p-6 shadow-xl">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl text-zinc-400 hover:text-white"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold text-center mb-6">
          Add Food
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Food Name */}
          <div className="relative">
            <label className="block text-sm text-zinc-400 mb-1">
              Food name
            </label>
            <input
              type="text"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 120)}
              required
              placeholder="e.g. Egg, Rice, Chicken"
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

    
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm text-zinc-400 mb-1">
              Amount (grams)
            </label>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              placeholder="e.g. 100"
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-xl bg-blue-500 hover:bg-blue-600 transition py-2 font-semibold"
          >
            Add Food
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFoodModal;
