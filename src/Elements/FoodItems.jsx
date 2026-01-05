import React from 'react';
import toast from 'react-hot-toast';
import { RiDeleteBin2Fill } from "react-icons/ri";
import Swal from 'sweetalert2';
import { TiTick } from "react-icons/ti";
const FoodItems = ({ foodData, onSeeDetails}) => {


  const handleDelete = async (food) => {
  const result = await Swal.fire({
    title: 'Delete this food?',
    text: `${food.foodName} will be permanently removed.`,
    icon: 'warning',
    background: '#0f172a',
    color: '#e5e7eb',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#334155',
    reverseButtons: true,
  });

  if (!result.isConfirmed) return;

  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/addedFoods/${food._id}`,
      { method: 'DELETE' }
    );

    if (!res.ok) throw new Error('Delete failed');

    // setFoodData(prev => prev.filter(f => f._id !== food._id));

    toast.success(`${food.foodName} deleted`, {
      icon: <p className='text-green-500'><TiTick /></p> ,
    });
  } catch (err) {
    console.error(err);
    toast.error('Failed to delete food');
  }
};

  return (
    <div className="w-full overflow-x-auto">
      {foodData.length === 0 ? (
        <p className="p-6 text-center text-gray-400 italic">
          No foods added yet. Click "Add Food" to get started.
        </p>
      ) : (
        <table className="min-w-full border-collapse shadow-lg rounded-xl overflow-hidden">
          <thead className="text-teal-500 bg-gray-900">
            <tr>
              <th className="py-3 px-4 text-left">Food</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Nutrition</th>
              <th className="py-3 px-4 text-center">Delete</th>
            </tr>
          </thead>

          <tbody>
            {foodData.map((food, index) => (
              <tr
                key={food._id}
                className={`${
                  index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900/40'
                } hover:bg-gray-700/60 transition`}
              >
                <td className="py-3 px-4 text-gray-200 font-medium">
                  {food.foodName}
                </td>

                <td className="py-3 px-4 text-gray-300">
                  {food.amount} g
                </td>

                <td className="py-3 px-4">
                  <button
                    onClick={() => onSeeDetails?.(food)}
                    className="px-3 py-1 rounded-lg border border-yellow-500 text-yellow-400 text-xs hover:bg-yellow-500 hover:text-black transition"
                  >
                    Details
                  </button>
                </td>

                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => handleDelete(food)}
                    className="p-2 rounded-lg border border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition"
                  >
                    <RiDeleteBin2Fill />
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
