import React, { useState } from 'react';
import Headline from '../Components/Headline';
import DailySummary from '../Components/DailySummary';

import MealSections from '../Components/MealSections';

const Home = () => {
    const [refreshKey, setRefreshKey] = useState(0);

    const incrementRefreshKey = () => setRefreshKey(prev => prev + 1);

    return (
        <div className='w-11/12 mx-auto space-y-10'>

            <Headline />
            <DailySummary refreshKey={refreshKey} />
            {/* <Outlet  />  */}
            <MealSections incrementRefreshKey={incrementRefreshKey}></MealSections>
        </div>
    );
};

export default Home;
