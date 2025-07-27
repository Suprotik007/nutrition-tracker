import React from 'react';

const Morning = () => {
    return (
        <div className='border-2 rounded-xl p-5'>
          <header className='flex justify-between'>
               <div className='flex flex-row items-center gap-2'>
                <h2 className='font semibold text-xl text-pink-500 font-mono'>Morning</h2>
                <p className='text-sm text-gray-400'>(6.00 - 11.59) AM</p>
             </div>

            <button className='btn btn-outline btn-ghost text-gray-300'> + Add Food</button>
          </header>

{/* food list */}
         <p className='p-5 text-center text-gray-500'>No foods added yet. Click "Add Food" to get started.</p>
        </div>
    );
};

export default Morning;