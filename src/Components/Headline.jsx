import React from 'react';
import { ImClock } from "react-icons/im";
import { FaCalendarAlt } from "react-icons/fa";
import LiveClock from '../Elements/LiveClock';
import LiveDate from '../Elements/Livedate';

const Headline = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-3">
     
      <h1 className="text-center font-bold font-s text-2xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-600 drop-shadow-lg">
        Calculate Your Every Bite
      </h1>

    <div className='flex flex-row'>

        {/* Date */}
     <div className="flex items-center gap-3 font-mono px-4 py-2 rounded-full shadow-md backdrop-blur-sm">
        <FaCalendarAlt  className="text-yellow-600  text-lg sm:text-xl" />
        <LiveDate className="text-cyan-400 text-lg sm:text-xl" />
      </div>

      {/* Clock  */}
      <div className="flex items-center gap-3 bg-fuchsia- font-mono  px-4 py-2 rounded-full shadow-md backdrop-blur-sm">
        <ImClock className="text-yellow-600 text-lg sm:text-xl" />
        <LiveClock className="text-cyan-400 text-lg sm:text-xl" />
      </div>
    </div>
    </div>
  );
};

export default Headline;
