import React from 'react';

const DailySummary = () => {
    return (
        <div className='border-2 rounded-xl p-5 '>
            <h2 className='font semibold text-xl text-pink-500 font-mono'>Daily Summary</h2>

            <section className='grid grid-cols-2 md:grid-cols-4'>

                {/* calories */}
                <div className='flex flex-col items-center mt-5'>
                      <p className=' text-3xl font-bold text-yellow-400'>0 </p>
                      <p className='text-gray-400'>Calories</p>
                </div>

                {/* protein */}
                <div className='flex flex-col items-center mt-5'>
                      <p className=' text-3xl font-bold text-green-400'>0g </p>
                      <p className='text-gray-400'>Protein</p>
                </div>

                {/* carbs */}
                <div className='flex flex-col items-center mt-5'>
                      <p className=' text-3xl font-bold text-red-500'>0g </p>
                      <p className='text-gray-400'>Carbs</p>
                </div>

                {/* fats */}
                <div className='flex flex-col items-center mt-5'>
                      <p className=' text-3xl font-bold text-blue-500'>0g </p>
                      <p className='text-gray-400'>Fats</p>
                </div>
            </section>
        </div>
    );
};

export default DailySummary;