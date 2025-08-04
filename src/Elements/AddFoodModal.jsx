
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Authentication/AuthProvider';

const AddFoodModal = ({ onClose, onSubmit }) => {
  const [foodName, setFoodName] = useState('');
  const [amount, setAmount] = useState('');
const [suggestions, setSuggestions] = useState([]);
const [focused, setFocused] = useState(false);
const {user}=useContext(AuthContext)


 const APP_ID = `${import.meta.env.VITE_NUTRITION_API_ID}`   
  const APP_KEY = `${import.meta.env.VITE_NUTRITION_API_KEY}` 

  useEffect(() => {
    const fetchSuggestions = async () => {
      
      
      if (!foodName.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await axios.get(
          `https://trackapi.nutritionix.com/v2/search/instant?query=${foodName}`,
          {
            headers: {
              'x-app-id': APP_ID,
              'x-app-key': APP_KEY,
            },
          }
        );
        const common = res.data.common.map((item) => item.food_name);
        setSuggestions(common.slice(0, 8)); 
      } catch (err) {
        console.error('Suggestion fetch failed', err);
        setSuggestions([]);
      }
    };

    const delayDebounce = setTimeout(fetchSuggestions, 100); 

    return () => clearTimeout(delayDebounce);
  }, [foodName]);

  const handleSubmit = (e) => {
     e.preventDefault();
    const email=user.email
    const date=new Date()
   
    onSubmit({email,date ,foodName, amount });
    setFoodName('');
    setAmount('');
    onClose();
  };

  const handleSuggestionClick = (suggestedName) => {
    setFoodName(suggestedName);
    setSuggestions([]);
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-100">
      <div className="bg-black z-100 border-2 border-yellow-300 rounded-lg p-6 w-80 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 font-bold"
          aria-label="Close modal"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Add Food</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col relative">
            <span className="mb-1 font-medium">Food Name</span>
           <input
  type="text"
  value={foodName}
  onChange={(e) => setFoodName(e.target.value)}
  onFocus={() => setFocused(true)}
  onBlur={() => setTimeout(() => setFocused(false), 100)} 
  required
  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2"
  placeholder="Enter food name"
/>

           {focused && suggestions.length > 0 && (
  <ul className="absolute bg-black top-20 text-lack border border-teal-300 rounded mt-1 z-50 max-h-32 overflow-y-auto w-full shadow-lg">
    {suggestions.map((suggestion, idx) => (
      <li
        key={idx}
        onClick={() => handleSuggestionClick(suggestion)}
        className="px-3 py-1 hover:text-teal-500 cursor-pointer"
      >
        {suggestion}
      </li>
    ))}
  </ul>
)}

          </label>

          <label className="flex flex-col">
            <span className="mb-1 font-medium">Amount (gm)</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="1"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2"
              placeholder="Enter amount in grams"
            />
          </label>

          <button
            type="submit"
            className="btn btn-warning btn-outline rounded py-2 font-semibold transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFoodModal;
