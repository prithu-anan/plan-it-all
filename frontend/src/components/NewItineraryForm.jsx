import React, { useState } from 'react';
import { login, signup } from '../api-helpers';
import { useNavigate } from 'react-router-dom';

const NewItineraryForm = () => {
  const [tripInfo, setTripInfo] = useState({ destination: '', startDate: '', endDate: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // login({
    //     email: loginInfo.email,
    //     password: loginInfo.password
    // }).then((res) => {
    //     if(res?.success) {
    //         localStorage.setItem('token', res.token);
    //         navigate('/itinerary');
    //     }  
    // })
    navigate('/routes')
  };

  return (
    <section className="relative w-full h-screen mx-auto pt-56">
        <div className="max-w-lg mx-auto bg-tertiary p-8 rounded-lg shadow-md items-center">
            <h2 className="text-2xl font-bold text-center mb-4 text-purple-800">Plan a Trip</h2>
            <form onSubmit={handleSubmit}>
                <label className="block mb-4">
                    <span className="text-[#915eff] font-medium">Destination:</span>
                    <input
                        type="text"
                        value={tripInfo.destination}
                        onChange={(e) => setTripInfo({ ...tripInfo, destination: e.target.value })}
                        required
                        className="mt-1 block w-full px-3 py-2 bg-blue-100 border border-gray-400 rounded-md shadow-sm text-blue-800 placeholder-gray-500 focus:outline-none focus:border-blue-600 focus:ring-blue-600"
                        placeholder="Enter destination"
                    />
                </label>

                <label className="block mb-4">
                    <span className="text-[#915eff] font-medium">Start Date:</span>
                    <input
                        type="date"
                        value={tripInfo.startDate}
                        onChange={(e) => setTripInfo({ ...tripInfo, startDate: e.target.value })}
                        required
                        className="mt-1 block w-full px-3 py-2 bg-blue-100 border border-gray-400 rounded-md shadow-sm text-blue-800 placeholder-gray-500 focus:outline-none focus:border-blue-600 focus:ring-blue-600"
                        placeholder="Enter Start Date"
                    />
                </label>

                <label className="block mb-4">
                    <span className="text-[#915eff] font-medium">End Date:</span>
                    <input
                        type="date"
                        value={tripInfo.endDate}
                        onChange={(e) => setTripInfo({ ...tripInfo, endDate: e.target.value })}
                        required
                        className="mt-1 block w-full px-3 py-2 bg-blue-100 border border-gray-400 rounded-md shadow-sm text-blue-800 placeholder-gray-500 focus:outline-none focus:border-blue-600 focus:ring-blue-600"
                        placeholder="Enter End Date"
                    />
                </label>

                <button
                    type="submit"
                    className="mx-auto block py-2 px-4 bg-purple-800 text-white font-semibold rounded-md shadow-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none shadow-primary"
                >
                    Show Routes
                </button>
            </form>
        </div>

        
    </section>
  );
};

export default NewItineraryForm;