import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Authentication/AuthProvider';

const DailySummary = () => {
  const { user } = useContext(AuthContext);
  const [summary, setSummary] = useState({
    totalCalories: 0,
    totalProtein: 0,
    totalCarbs: 0,
    totalFat: 0
  });

  useEffect(() => {
    if (user?.email) {
      fetch(`${import.meta.env.VITE_API_URL}/addedFoods/daily-summary?email=${user.email}`)
        .then(res => res.json())
        .then(data => {
          setSummary({
            totalCalories: data.totalCalories || 0,
            totalProtein: data.totalProtein || 0,
            totalCarbs: data.totalCarbs || 0,
            totalFat: data.totalFat || 0
          });
        })
        .catch(err => console.error("Failed to fetch summary", err));
    }
  }, [user]);

  return (
    <div className='border-2 rounded-xl p-5'>
      <h2 className='font-semibold text-xl text-pink-500 font-mono'>Daily Summary</h2>

      <section className='grid grid-cols-2 md:grid-cols-4'>
        
        {/* Calories */}
        <div className='flex flex-col items-center mt-5'>
          <p className='text-3xl font-bold text-yellow-400'>{summary.totalCalories}</p>
          <p className='text-gray-400'>Calories</p>
        </div>

        {/* Protein */}
        <div className='flex flex-col items-center mt-5'>
          <p className='text-3xl font-bold text-green-400'>{summary.totalProtein}g</p>
          <p className='text-gray-400'>Protein</p>
        </div>

        {/* Carbs */}
        <div className='flex flex-col items-center mt-5'>
          <p className='text-3xl font-bold text-red-500'>{summary.totalCarbs}g</p>
          <p className='text-gray-400'>Carbs</p>
        </div>

        {/* Fats */}
        <div className='flex flex-col items-center mt-5'>
          <p className='text-3xl font-bold text-blue-500'>{summary.totalFat}g</p>
          <p className='text-gray-400'>Fats</p>
        </div>
      </section>
    </div>
  );
};

export default DailySummary;
