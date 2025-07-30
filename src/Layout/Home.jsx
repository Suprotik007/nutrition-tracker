import React from 'react';
import NavigationBar from '../Components/NavigationBar';
import Headline from '../Components/Headline';
import DailySummary from '../Components/DailySummary';
import Morning from '../Components/Morning';
import Noon from '../Components/Noon';
import Night from '../Components/Night';
import MidNight from '../Components/MidNight';

const Home = () => {
    return (
        <div className='w-11/12 mx-auto space-y-10'>
       <NavigationBar></NavigationBar>
       <Headline></Headline>
       <DailySummary></DailySummary>
       <Morning></Morning>
       <Noon></Noon>
       <Night></Night>
       <MidNight></MidNight>
        </div>
    );
};

export default Home;