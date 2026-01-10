import React, { useMemo } from 'react';

import {
  calculateBMI,
  bmiCategory,
  calculateSuggestedIntake,
} from '../utilities/Nutritioncalculator';


const NutritionComparison = ({ dailySummary, userProfile }) => {
  const { weight, height, age, gender } = userProfile || {};

  const bmi = userProfile ? calculateBMI(weight, height) : null;
  const category = bmi ? bmiCategory(bmi) : null;

  const suggested = userProfile ? calculateSuggestedIntake({
    weight,
    height,
    age,
    gender,
  }) : null;

 
  const comparison = useMemo(() => {
    if (!dailySummary || !suggested) return null;

    return {
      calories: suggested.calories - dailySummary.totalCalories,
      protein: suggested.protein - dailySummary.totalProtein,
      carbs: suggested.carbs - dailySummary.totalCarbs,
      fat: suggested.fat - dailySummary.totalFat,
    };
  }, [dailySummary, suggested]);

  const renderResult = (label, value, unit) => {
    if (value > 0) {
      return (
        <span className="text-yellow-400">
          {value.toFixed(1)} {unit} more needed
        </span>
      );
    }
    if (value < 0) {
      return (
        <span className="text-red-400">
          {Math.abs(value).toFixed(1)} {unit} exceeded
        </span>
      );
    }
    return <span className="text-green-400">On target</span>;
  };

  if (!comparison) return null;

  return (
    <div className="mt-10 p-6 rounded-2xl bg-zinc-900 border border-zinc-700 max-w-4xl mx-auto">
      <h2 className="font-mono text-sm md:text-3xl font-bold text-center mb-6 bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
        Nutrition Comparison based on your BMI 
      </h2>

      <div className="grid grid-cols-2  gap-6">
        <div className="p-4 rounded-xl bg-zinc-800 border border-zinc-700">
          <p className="text-gray-400 mb-1">Calories</p>
          {renderResult('Calories', comparison.calories, 'kcal')}
        </div>

        <div className="p-4 rounded-xl bg-zinc-800 border border-zinc-700">
          <p className="text-gray-400 mb-1">Protein</p>
          {renderResult('Protein', comparison.protein, 'g')}
        </div>

        <div className="p-4 rounded-xl bg-zinc-800 border border-zinc-700">
          <p className="text-gray-400 mb-1">Carbs</p>
          {renderResult('Carbs', comparison.carbs, 'g')}
        </div>

        <div className="p-4 rounded-xl bg-zinc-800 border border-zinc-700">
          <p className="text-gray-400 mb-1">Fats</p>
          {renderResult('Fat', comparison.fat, 'g')}
        </div>
      </div>

     
    </div>
  );
};

export default NutritionComparison;
