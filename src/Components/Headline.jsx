import React from 'react';
import { ImClock } from "react-icons/im";
import LiveClock from '../Elements/LiveClock';
const Headline = () => {
    return (
        <div className='gap-3 flex flex-col items-center'>
            <h1 className='text-center font-semibold font-moo text-3xl text-yellow-300'>Calculate Your Every Bite</h1>

            <p className='flex flex-row items-center gap-3 font-mono text-lg text-fuchsia-500 '><ImClock /> <LiveClock></LiveClock></p>
        </div>
    );
};

export default Headline;