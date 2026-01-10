const KEY = 'user_bmi_profile';

export const saveBMIProfile = (profile) => {
  localStorage.setItem(KEY, JSON.stringify({
    ...profile,
    savedAt: new Date().toISOString(),
  }));
};

export const getBMIProfile = () => {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : null;
};

export const clearBMIProfile = () => {
  localStorage.removeItem(KEY);
};
