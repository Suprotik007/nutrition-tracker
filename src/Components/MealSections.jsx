import React, { useState, useEffect } from 'react';
import { getActiveSection } from '../utilities/ActiveSection';

import Noon from '../Components/Noon'
import Night from './Night'
import MidNight from './MidNight'
import Morning from './Morning';

 const MealSections = () => {
  const [activeSection, setActiveSection] = useState(getActiveSection());

  useEffect(() => {
    const interval = setInterval(() => {
        const current = getActiveSection();
      console.log('Active section:', current); 
      setActiveSection(current);
    }, 60000); 

    return () => clearInterval(interval);
  }, []);



  return (
    <div className='space-y-10'>
    
      <Morning  isActive={activeSection === 'morning'} />
      <Noon isActive={activeSection === 'noon'} />
      <Night isActive={activeSection === 'night'} />
      <MidNight isActive={activeSection === "midnight"}/>
    </div>
  );
};
export default MealSections