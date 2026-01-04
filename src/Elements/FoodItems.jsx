import React from 'react';

const FoodItems = ({ foodData, onSeeDetails }) => {
  return (
    <div className="w-full overflow-x-auto">
      {foodData.length === 0 ? (
        <p className="p-6 text-center text-gray-400 italic">
          No foods added yet. Click "Add Food" to get started.
        </p>
      ) : (
        <table className="min-w-full border-collapse shadow-lg rounded-xl overflow-hidden">
          <thead className="text-teal-600">
            <tr>
              <th className="py-3 px-4 text-left text-md md:text-base">Food</th>
              <th className="py-3 px-4 text-left text-md md:text-base">Amount</th>
              <th className="py-3 px-4 text-left text-md md:text-base">Nutrition</th>
            </tr>
          </thead>
          <tbody>
            {foodData.map((food, index) => (
              <tr
                key={food._id}
                className={`transition-colors duration-200 ${
                  index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900/20'
                } hover:bg-gray-700/50`}
              >
                <td className="py-3 px-4 flex items-center gap-3 font-semibold text-gray-300 md:text-lg">
                  {food.foodName}
                </td>
                <td className="py-3 px-4 text-gray-300 md:text-lg">{food.amount} g</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => onSeeDetails?.(food)}
                    className="px-3 py-1 rounded-lg border border-amber-600 text-amber-600 text-xs md:text-sm font-medium hover:text-white hover:bg-amber-600 transition"
                  >
                   Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FoodItems;
