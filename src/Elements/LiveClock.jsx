import React, { useState, useEffect } from "react";

const LiveClock = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setDate(new Date());
    }, 1000);

    
    return () => clearInterval(timerID);
  }, []);

  return (
    <div>
      {date.toLocaleTimeString()}
    </div>
  );
};

export default LiveClock;
