import React from 'react';
import Headline from '../Components/Headline';
import DailySummary from '../Components/DailySummary';

import MealSections from '../Components/MealSections';

const Home = () => {
    return (
        <div className='w-11/12 mx-auto space-y-10'>
           
            <Headline />
            <DailySummary />
            {/* <Outlet  />  */}
            <MealSections></MealSections>
        </div>
    );
};

export default Home;
