

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Authentication/AuthProvider';

const FoodItems = ({ onSeeDetails }) => {
  const { user } = useContext(AuthContext);
  const [foodListData, setFoodListData] = useState([]);

useEffect(() => {
  if (!user?.email) return;

  fetch(`${import.meta.env.VITE_API_URL}/addedFoods/addFood?email=${user.email}`)
    .then(res => res.json())
    .then(data => setFoodListData(data))
    .catch(err => console.error(err));
}, [user?.email]);


  return (
    <div>
      {foodListData.length === 0 ? (
        <p className="p-5 text-center text-gray-500">
          No foods added yet. Click "Add Food" to get started.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="border-b-2 border-gray-500">
              <tr className="text-teal-500 ">
                <th>Food</th>
                <th>Amount</th>
                <th>Nutrition Value</th>
              </tr>
            </thead>
            <tbody>
              {foodListData.map(food => (
                <tr key={food._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold md:text-lg">{food.foodName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="md:text-lg">{food.amount} GM</td>
                  <td>
                    <button
                      onClick={() => onSeeDetails?.(food)}
                      className="btn btn-outline text-amber-300 btn-xs md:btn-md hover:text-black hover:bg-gray-200"
                    >
                      See Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FoodItems;

