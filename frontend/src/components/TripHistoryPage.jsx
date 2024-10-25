import React from 'react';
import TripHistoryTable from './TripHistoryTable';

const TripHistoryPage = () => {
  // Sample trip data (you can replace this with your actual data)
  const trips = [
    { id: 1, destination: 'Paris', startDate: '2024-01-10', endDate: '2024-01-20' },
    { id: 2, destination: 'New York', startDate: '2024-02-15', endDate: '2024-02-25' },
    { id: 3, destination: 'Tokyo', startDate: '2024-03-05', endDate: '2024-03-15' },
  ];

  return (
    <section className="relative w-full h-screen mx-auto pt-44">
    <div className='flex flex-col items-center w-full'>
        <h1 className='mb-10 text-center font-semibold text-4xl text-purple-800'>
            Trip History
        </h1>
        <div className='w-[70%]'>
            <TripHistoryTable trips={trips} />
        </div>
    </div>
</section>

  );
};

export default TripHistoryPage;
