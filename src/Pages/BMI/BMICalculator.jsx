import React, { useContext, useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Authentication/AuthProvider';
import { FoodContext } from '../../Elements/FoodContext';
import { calculateDailySummary } from '../../utilities/Nutritioncalculator';
import NutritionComparison from '../../Components/NutritionComparison';

const BMICalculator = () => {
  const { user } = useContext(AuthContext);
  const { foodData } = useContext(FoodContext);

  const [result, setResult] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  
  const dailySummary = useMemo(
    () => calculateDailySummary(foodData),
    [foodData]
  );


  useEffect(() => {
    const savedResult = localStorage.getItem('bmiResult');
    const savedProfile = localStorage.getItem('userProfile');

    if (savedResult && savedProfile) {
      setResult(JSON.parse(savedResult));
      setProfile(JSON.parse(savedProfile));
    }
  }, []);


  const onSubmit = async (data) => {
    const height = Number(data.height);
    const weight = Number(data.weight);

    if (height <= 0 || weight <= 0) return;

    const bmi = weight / ((height / 100) ** 2);
    const roundedBMI = Number(bmi.toFixed(1));

    let category, color;
    if (bmi < 18.5) {
      category = 'Underweight';
      color = 'text-blue-400';
    } else if (bmi < 25) {
      category = 'Normal';
      color = 'text-green-400';
    } else if (bmi < 30) {
      category = 'Overweight';
      color = 'text-yellow-400';
    } else {
      category = 'Obese';
      color = 'text-red-400';
    }

    const bmiResult = { bmi: roundedBMI, category, color };
    const userProfile = {
      weight,
      height,
      age: Number(data.age),
      gender: data.gender,
    };

    setResult(bmiResult);
    setProfile(userProfile);

    localStorage.setItem('bmiResult', JSON.stringify(bmiResult));
    localStorage.setItem('userProfile', JSON.stringify(userProfile));

    
    try {
      setLoading(true);
      await fetch(`${import.meta.env.VITE_API_URL}/BMIrecord/bmi`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user?.email,
          ...userProfile,
          bmi: roundedBMI,
          category,
          recordedAt: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error('BMI save failed', err);
    } finally {
      setLoading(false);
    }
  };


  const resetBMI = () => {
    localStorage.removeItem('bmiResult');
    localStorage.removeItem('userProfile');
    setResult(null);
    setProfile(null);
    reset();
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <div className={`flex flex-col md:flex-row justify-center items-start ${result ? 'gap-8' : ''}`}>

       
        {!result && (
          <div className="max-w-md w-full border border-zinc-700 rounded-2xl p-6">
            <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              BMI Calculator
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-gray-400"
              />

              <select
                {...register('gender', { required: true })}
                className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-gray-200"
              >
                <option value="" disabled>Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <input
                type="number"
                placeholder="Age"
                {...register('age', { required: true, min: 1 })}
                className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-gray-200"
              />

              <input
                type="number"
                placeholder="Height (cm)"
                {...register('height', { required: true, min: 1 })}
                className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-gray-200"
              />

              <input
                type="number"
                placeholder="Weight (kg)"
                {...register('weight', { required: true, min: 1 })}
                className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-gray-200"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-semibold bg-emerald-400 text-black"
              >
                {loading ? 'Saving...' : 'Calculate BMI'}
              </button>
            </form>
          </div>
        )}

        {result && profile && (
          <div className="max-w-lg w-full border border-zinc-700 rounded-2xl p-6">
            <div className="text-center mb-6">
              <p className="text-gray-400">Your BMI</p>
              <p className={`text-5xl font-bold ${result.color}`}>
                {result.bmi}
              </p>
              <p className={`text-lg font-semibold ${result.color}`}>
                {result.category}
              </p>

              <button
                onClick={resetBMI}
                className="mt-4 text-sm text-green-400 underline"
              >
                Recalculate BMI
              </button>
            </div>

            <NutritionComparison
              dailySummary={dailySummary}
              userProfile={profile}
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default BMICalculator;
