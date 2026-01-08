import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Authentication/AuthProvider';

const DailySummary = ({ refreshKey }) => {
  const { user } = useContext(AuthContext);

  const [summary, setSummary] = useState({
    totalCalories: 0,
    totalProtein: 0,
    totalCarbs: 0,
    totalFat: 0,
  });

  useEffect(() => {
    if (!user?.email) return;

    fetch(
      `${import.meta.env.VITE_API_URL}/addedFoods/daily-summary?email=${user.email}`
    )
      .then(res => res.json())
      .then(data => {
        setSummary({
          totalCalories: data.totalCalories || 0,
          totalProtein: data.totalProtein || 0,
          totalCarbs: data.totalCarbs || 0,
          totalFat: data.totalFat || 0,
        });
      })
      .catch(err => console.error('Failed to fetch daily summary', err));
  }, [user, refreshKey]); 

  const format = num => Number(num).toFixed(2);

  const nutrients = [
    { label: 'Calories', value: format(summary.totalCalories), color: 'yellow' },
    { label: 'Protein', value: format(summary.totalProtein) + 'g', color: 'green' },
    { label: 'Carbs', value: format(summary.totalCarbs) + 'g', color: 'red' },
    { label: 'Fats', value: format(summary.totalFat) + 'g', color: 'blue' },
  ];

  const colorMap = {
    yellow: 'text-yellow-400',
    green: 'text-green-400',
    red: 'text-red-400',
    blue: 'text-blue-400',
  };

  return (
    <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-700 shadow-xl max-w-4xl mx-auto">
      <h2 className="font-mono text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-pink-500 to-pink-700 bg-clip-text text-transparent">
        Daily Summary
      </h2>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {nutrients.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-5 rounded-xl bg-zinc-800 border border-zinc-700 hover:scale-105 transition-transform shadow-md"
          >
            <p
              className={`font-bold text-2xl md:text-3xl lg:text-4xl ${colorMap[item.color]}`}
            >
              {item.value}
            </p>
            <p className="text-gray-400 text-sm md:text-base mt-2">
              {item.label}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default DailySummary;
