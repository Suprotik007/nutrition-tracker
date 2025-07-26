import React from 'react';
import { ImClock } from "react-icons/im";
import LiveClock from '../Elements/LiveClock';
const Headline = () => {
    return (
        <div className='gap-3 flex flex-col items-center
        '>
            <h1 className='text-center font-semibold font-mono text-2xl'>Calculate Your Every Bite</h1>

            <p className='flex flex-row items-center gap-3 font-mono'><ImClock /> <LiveClock></LiveClock></p>
        </div>
    );
};

export default Headline;