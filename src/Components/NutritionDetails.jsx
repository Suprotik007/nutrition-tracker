import React, { useState, useEffect } from 'react';
import { fetchNutritionData } from '../utilities/NutritionAPI';

const NutritionDetails = ({ food, onClose }) => {
  const [nutrition, setNutrition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const queryText = `${food.amount}g ${food.foodName}`;

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchNutritionData(queryText)
      .then(data => {
        if (!data || data.length === 0) {
          setError('No nutrition data found.');
        } else {
          setNutrition(data[0]);
        }
      })
      .catch(() => {
        setError(`Nutrition data for "${food.foodName}" is unavailable.`);
      })
      .finally(() => setLoading(false));
  }, [queryText]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-md ">
      <div className="relative w-full max-w-10/11 rounded-2xl bg-zinc-900 text-white shadow-xl border border-zinc-700 overflow-hidden">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-2xl text-zinc-400 hover:text-white z-10"
        >
          &times;
        </button>

       

        <div className="p-6">

          {/* Header */}
          <div className="text-center mb-5">
            <h2 className="text-2xl font-semibold capitalize">
              {food.foodName}
            </h2>
            <p className="text-sm text-zinc-400">
              {food.amount} g serving
            </p>
          </div>

          {loading && (
            <p className="text-center text-zinc-400 py-6">
              Fetching nutrition data…
            </p>
          )}

          {error && (
            <p className="text-center text-red-400">{error}</p>
          )}

          {nutrition && (
            <>
              
              <div className="flex justify-center gap-3 text-xs text-zinc-400 mb-4">
                <Legend color="bg-yellow-400" label="Calories" />
                <Legend color="bg-green-400" label="Protein" />
                <Legend color="bg-red-400" label="Carbs" />
                <Legend color="bg-blue-400" label="Fat" />
              </div>

              {/* Main Nutrition Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <NutritionCard
                  label="Calories"
                  value={nutrition.calories}
                  unit="kcal"
                  color="yellow"
                />
                <NutritionCard
                  label="Protein"
                  value={nutrition.protein_g}
                  unit="g"
                  color="green"
                />
                <NutritionCard
                  label="Carbs"
                  value={nutrition.carbohydrates_total_g}
                  unit="g"
                  color="red"
                />
                <NutritionCard
                  label="Fat"
                  value={nutrition.fat_total_g}
                  unit="g"
                  color="blue"
                />
              </div>

              {/* micro Nutrients */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <Micro label="Fiber" value={nutrition.fiber_g} unit="g" />
                <Micro label="Sugar" value={nutrition.sugar_g} unit="g" />
                <Micro label="Sodium" value={nutrition.sodium_mg} unit="mg" />
                <Micro label="Potassium" value={nutrition.potassium_mg} unit="mg" />
                <Micro label="Cholesterol" value={nutrition.cholesterol_mg} unit="mg" />
                <Micro label="Sat. Fat" value={nutrition.fat_saturated_g} unit="g" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};



const NutritionCard = ({ label, value, unit, color }) => {
  const colors = {
    yellow: 'border-yellow-400/40 bg-yellow-400/10 text-yellow-300',
    green: 'border-green-400/40 bg-green-400/10 text-green-300',
    red: 'border-red-400/40 bg-red-400/10 text-red-300',
    blue: 'border-blue-400/40 bg-blue-400/10 text-blue-300',
  };

  return (
    <div className={`rounded-xl border p-4 text-center ${colors[color]}`}>
      <p className="text-xs uppercase tracking-wide opacity-80">{label}</p>
      <p className="text-2xl font-bold">
        {value ?? 0}
        <span className="text-sm font-medium opacity-80"> {unit}</span>
      </p>
    </div>
  );
};

const Micro = ({ label, value, unit }) => (
  <div className="flex justify-between rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2">
    <span className="text-zinc-400">{label}</span>
    <span className="font-medium">
      {value ?? 0} {unit}
    </span>
  </div>
);

const Legend = ({ color, label }) => (
  <div className="flex items-center gap-1">
    <span className={`w-2 h-2 rounded-full ${color}`} />
    <span>{label}</span>
  </div>
);

export default NutritionDetails;
