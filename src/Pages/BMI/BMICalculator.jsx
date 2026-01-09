import React, { useContext, useState } from 'react';
import { AuthContext } from '../Authentication/AuthProvider';

const BMICalculator = () => {
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    gender: '',
    age: '',
    height: '',
    weight: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="max-w-xl mx-10/12 px-4 sm:px-0">
      {/* card */}
      <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-700 shadow-xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
          BMI Calculator
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Email
            </label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-gray-400 cursor-not-allowed"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-gray-200 focus:outline-none focus:border-emerald-400"
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Age (years)
            </label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-gray-200 focus:outline-none focus:border-emerald-400"
            />
          </div>

          {/* Height (shorter) */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Height (cm)
            </label>
            <input
              type="number"
              name="height"
              value={form.height}
              onChange={handleChange}
              required
              className="w-full px-3 py-1.5 text-sm rounded-lg bg-zinc-800 border border-zinc-700 text-gray-200 focus:outline-none focus:border-emerald-400"
            />
          </div>

          {/* Weight */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Weight (kg)
            </label>
            <input
              type="number"
              name="weight"
              value={form.weight}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-gray-200 focus:outline-none focus:border-emerald-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold bg-emerald-400 text-zinc-900 hover:bg-emerald-300 transition"
          >
            Calculate BMI
          </button>
        </form>

        <div className="mt-6 text-center text-gray-400 text-sm italic">
          BMI result and daily intake suggestions will appear here.
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;
