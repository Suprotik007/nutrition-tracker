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

  const formatNumber = (num) => Number(num).toFixed(2);

  const nutrients = [
    { label: 'Calories', value: formatNumber(summary.totalCalories), color: 'yellow-400' },
    { label: 'Protein', value: formatNumber(summary.totalProtein) + 'g', color: 'green-400' },
    { label: 'Carbs', value: formatNumber(summary.totalCarbs) + 'g', color: 'red-500' },
    { label: 'Fats', value: formatNumber(summary.totalFat) + 'g', color: 'blue-500' },
  ];

  return (
    <div className='p-5 rounded-2xl bg-zinc-900 border border-zinc-700 shadow-lg max-w-4xl mx-auto'>
      <h2 className='font-mono text-2xl md:text-3xl lg:text-4xl font-bold text-pink-500 text-center mb-6'>
        Daily Summary
      </h2>

      <section className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {nutrients.map((nutrient, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-center p-4 rounded-xl bg-zinc-800 border border-zinc-700 hover:scale-105 transition-transform shadow-md`}
          >
            <p className={`font-bold text-2xl md:text-3xl lg:text-4xl text-${nutrient.color}`}>
              {nutrient.value}
            </p>
            <p className='text-gray-400 text-sm md:text-base mt-1'>{nutrient.label}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default DailySummary;
