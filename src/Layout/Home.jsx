import React from 'react';
import NavigationBar from '../Components/NavigationBar';
import Headline from '../Components/Headline';
import DailySummary from '../Components/DailySummary';
import { Outlet } from 'react-router'; // 

const Home = () => {
    return (
        <div className='w-11/12 mx-auto space-y-10'>
            <NavigationBar />
            <Headline />
            <DailySummary />
            <Outlet  /> 
        </div>
    );
};

export default Home;
