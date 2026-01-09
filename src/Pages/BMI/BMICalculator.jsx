import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Authentication/AuthProvider';

const BMICalculator = () => {
  const { user } = useContext(AuthContext);
  const [result, setResult] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const heightInMeters = Number(data.height) / 100;
    const weight = Number(data.weight);

    if (!heightInMeters || !weight || heightInMeters <= 0 || weight <= 0) {
      alert('Please enter valid height and weight values.');
      return;
    }

    const bmi = weight / (heightInMeters * heightInMeters);
    const roundedBMI = bmi.toFixed(1);

    let category = '';
    let color = '';

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

    setResult({ bmi: roundedBMI, category, color });
  };
 
  return (
    <div className="min-h-screen bg-black  flex items-center justify-center p-4">
      <div className="max-w-md w-full  border border-zinc-700 rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
          BMI Calculator
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-gray-400 cursor-not-allowed"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Gender</label>
            <select
              {...register('gender', { required: 'Gender is required' })}
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <option value="" disabled>Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && <p className="text-red-400 text-sm">{errors.gender.message}</p>}
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Age (years)</label>
            <input
              type="number"
              placeholder="Enter your age"
              {...register('age', { required: 'Age is required', min: { value: 1, message: 'Age must be positive' } })}
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            {errors.age && <p className="text-red-400 text-sm">{errors.age.message}</p>}
          </div>

          {/* Height */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Height (cm)</label>
            <input
              type="number"
              placeholder="Enter your height in cm"
              {...register('height', { required: 'Height is required', min: { value: 1, message: 'Height must be positive' } })}
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            {errors.height && <p className="text-red-400 text-sm">{errors.height.message}</p>}
          </div>

          {/* Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Weight (kg)</label>
            <input
              type="number"
              placeholder="Enter your weight in kg"
              {...register('weight', { required: 'Weight is required', min: { value: 1, message: 'Weight must be positive' } })}
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            {errors.weight && <p className="text-red-400 text-sm">{errors.weight.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold bg-emerald-400 text-zinc-900 hover:bg-emerald-300 transition duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            Calculate BMI
          </button>
        </form>

        <div className="mt-6 text-center text-gray-400 text-sm italic">
          BMI result and daily intake suggestions will appear here.
        </div>

        {/* Result */}
        {result && (
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">Your BMI</p>
            <p className={`text-4xl md:text-5xl font-bold ${result.color}`}>
              {result.bmi}
            </p>
            <p className={`mt-2 text-lg font-semibold ${result.color}`}>
              {result.category}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMICalculator;



