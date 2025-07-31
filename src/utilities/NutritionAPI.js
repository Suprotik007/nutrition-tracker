const API_KEY =`${import.meta.env.VITE_NUTRITION_API_KEY}`; 

export async function fetchNutritionData(queryText) {
  const encodedQuery = encodeURIComponent(queryText); 
  
  const url = `https://api.api-ninjas.com/v1/nutrition?query=${encodedQuery}`;
  
  const response = await fetch(url, {
    headers: { 'X-Api-Key': API_KEY },
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json(); 
  return data;
}
