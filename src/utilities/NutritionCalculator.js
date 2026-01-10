export const calculateBMI = (weight, heightCm) => {
  const heightM = heightCm / 100;
  return weight / (heightM * heightM);
};

export const bmiCategory = (bmi) => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

export const calculateSuggestedIntake = ({
  weight,
  height,
  age,
  gender,
}) => {
  const BMR =
    gender === 'male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

  const calories = BMR * 1.4;

  const protein = weight * 1.6;
  const fat = (calories * 0.25) / 9;
  const carbs = (calories - protein * 4 - fat * 9) / 4;

  return {
    calories,
    protein,
    carbs,
    fat,
  };
};
