

export const fetchNutritionData = async (query) => {
  const API_KEY = import.meta.env.VITE_NUTRITION_API_KEY;

  const res = await fetch(
    `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`,
    {
      method: 'GET',
      headers: {
        'X-Api-Key': API_KEY
      }
    }
  );

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  const data = await res.json();
  return data.items || [];
};
