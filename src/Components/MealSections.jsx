import React, { useState, useEffect } from 'react';
import { getActiveSection } from '../utilities/ActiveSection';
import Morning from '../Components/Morning';
import Noon from '../Components/Noon';
import Night from '../Components/Night';
import MidNight from '../Components/MidNight';

export const MealSections = () => {
  const [activeSection, setActiveSection] = useState(getActiveSection());

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection(getActiveSection());
    }, 60000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
    
      <Morning isActive={activeSection == 'morning'} />
      <Noon isActive={activeSection == 'noon'} />
      <Night isActive={activeSection == 'night'} />
      <MidNight isActive={activeSection == "midnight"}/>
    </div>
  );
};
