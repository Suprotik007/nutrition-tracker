import React, { useState, useEffect } from "react";

const LiveDate = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timerID);
  }, []);

  return (
    <div>
      {date.toLocaleDateString()}
    </div>
  );
};

export default LiveDate;
