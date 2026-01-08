import React, { useState, useEffect } from 'react';
import { getActiveSection } from '../utilities/ActiveSection';

import Noon from '../Components/Noon'
import Night from './Night'
import MidNight from './MidNight'
import Morning from './Morning';

 const MealSections = ({ incrementRefreshKey }) => {
  const [activeSection, setActiveSection] = useState(getActiveSection());

  useEffect(() => {
    const interval = setInterval(() => {
        const current = getActiveSection();
      setActiveSection(current);
    }, 60000); 

    return () => clearInterval(interval);
  }, []);



  return (
    <div className='space-y-10'>

      <Morning  isActive={activeSection === 'morning'} incrementRefreshKey={incrementRefreshKey} />
      <Noon isActive={activeSection === 'noon'} incrementRefreshKey={incrementRefreshKey} />
      <Night isActive={activeSection === 'night'} incrementRefreshKey={incrementRefreshKey} />
      <MidNight isActive={activeSection === "midnight"} incrementRefreshKey={incrementRefreshKey}/>
    </div>
  );
};
export default MealSections