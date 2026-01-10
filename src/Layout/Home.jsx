import React, { useState } from 'react';
import Headline from '../Components/Headline';
import DailySummary from '../Components/DailySummary';

import MealSections from '../Components/MealSections';
import NutritionComparison from '../Components/NutritionComparison';

const Home = () => {
    const [refreshKey, setRefreshKey] = useState(0);
    const [dailySummary, setDailySummary] = useState({
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFat: 0,
    });

    const incrementRefreshKey = () => setRefreshKey(prev => prev + 1);

    return (
        <div className='w-11/12 mx-auto space-y-10'>

            <Headline />
            <DailySummary refreshKey={refreshKey} dailySummary={dailySummary} setDailySummary={setDailySummary} />
            {/* <Outlet  />  */}
            <MealSections incrementRefreshKey={incrementRefreshKey}></MealSections>
            <NutritionComparison dailySummary={dailySummary} />
        </div>
    );
};

export default Home;
