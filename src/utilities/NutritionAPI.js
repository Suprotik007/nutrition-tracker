export const fetchNutritionData = async (query) => {
  const APP_ID = `${import.meta.env.VITE_NUTRITION_API_ID}`   
  const APP_KEY = `${import.meta.env.VITE_NUTRITION_API_KEY}`   

  const res = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-app-id': APP_ID,
      'x-app-key': APP_KEY,
    },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  const data = await res.json();
      return data.foods || [];

};
