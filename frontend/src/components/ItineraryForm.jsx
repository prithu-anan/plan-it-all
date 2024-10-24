import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const ItineraryForm = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [budget, setBudget] = useState('');
  const [preferences, setPreferences] = useState('');
  const [itinerary, setItinerary] = useState(null);

  const [transportation, setTransportation] = useState('');


  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Formatting the dates to DD/MM/YYYY
    const formattedStartDate = format(startDate, 'dd/MM/yyyy');
    const formattedEndDate = format(endDate, 'dd/MM/yyyy');

    // Simulate itinerary generation
    const generatedItinerary = {
      destination,
      tripStartDate: formattedStartDate,
      tripEndDate: formattedEndDate,
      budget,
      preferences,
      transportation: "Bus/Ferry",
      meals: "Local Seafood",
      accommodation: "Mid-range hotel",
      totalCost: 500,
    };

    setItinerary(generatedItinerary);

    // Flip the card to show the itinerary
    setIsFlipped(true);
  };

  const handleFlipBack = () => {
    setIsFlipped(false); // To reset the form if needed
  };

  return (
    <section className='relative w-full h-screen mx-auto'>
      <div className="absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-col items-center gap-5">
        <h1 className="text-4xl font-bold text-center mt-8 mb-12 text-[#915eff]">
          Trip Planner
        </h1>

        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
          
          {/* Front side - Form */}
          <form 
            onSubmit={handleFormSubmit} 
            className="max-w-lg mx-auto bg-tertiary p-8 rounded-lg shadow-md items-center"
          >
            <label className="block mb-4">
              <span className="text-[#915eff] font-medium">Destination:</span>
              <input 
                type="text" 
                value={destination} 
                onChange={(e) => setDestination(e.target.value)} 
                required 
                className="mt-1 block w-full px-3 py-2 bg-blue-100 border border-gray-400 rounded-md shadow-sm text-blue-800 placeholder-gray-500 focus:outline-none focus:border-blue-600 focus:ring-blue-600"
                placeholder="Enter your destination"
              />
            </label>

            <label className="block mb-4">
            <span className="block text-[#915eff] font-medium mb-2">Trip Start Date:</span>
            <DatePicker 
              selected={startDate} 
              onChange={(date) => setStartDate(date)} 
              dateFormat="dd/MM/yyyy"
              className="block w-full px-3 py-2 bg-blue-100 border border-gray-400 rounded-md shadow-sm text-blue-800"
            />
          </label>


            <label className="block mb-4">
              <span className="block text-[#915eff] font-medium">Trip End Date:</span>
              <DatePicker 
                selected={endDate} 
                onChange={(date) => setEndDate(date)} 
                dateFormat="dd/MM/yyyy"
                className="mt-1 block w-full px-3 py-2 bg-blue-100 border border-gray-400 rounded-md shadow-sm text-blue-800"
              />
            </label>

            <label className="block mb-4">
              <span className="text-[#915eff] font-medium">Budget (in $):</span>
              <input 
                type="number" 
                value={budget} 
                onChange={(e) => setBudget(e.target.value)} 
                required 
                className="mt-1 block w-full px-3 py-2 bg-blue-100 text-blue-800 border border-gray-400 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:border-purple-600 focus:ring-purple-600"
                placeholder="Enter your budget"
              />
            </label>

            <label className="block mb-6">
              <span className="text-[#915eff] font-medium">Preferences (e.g., budget, luxury):</span>
              <select 
                value={preferences} 
                onChange={(e) => setPreferences(e.target.value)} 
                required 
                className="mt-1 block w-full px-3 py-2 bg-blue-100 text-blue-800 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:border-purple-600 focus:ring-purple-600"
              >
                <option value="" disabled className="text-gray-500">Select your preference</option>
                <option value="Budget">Budget</option>
                <option value="Mid-range">Mid-range</option>
                <option value="Luxury">Luxury</option>
              </select>
            </label>

            <button 
              type="submit" 
              className="mx-auto block py-2 px-4 bg-purple-800 text-white font-semibold rounded-md shadow-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none shadow-primary"
            >
              Generate Itinerary
            </button>
          </form>

          {/* Back side - Itinerary */}
          {itinerary && (
            <div className="max-w-2xl w-full mx-auto bg-tertiary p-8 rounded-lg shadow-md items-center">
              <h2 className="text-2xl font-bold text-center mb-4 text-purple-800">Your Itinerary</h2>
              <p className="mb-4"><strong class="text-[#915eff]">Destination:</strong> {itinerary.destination}</p>
              <p className="mb-4"><strong class="text-[#915eff]">Trip Dates:</strong> {itinerary.tripStartDate} - {itinerary.tripEndDate}</p>
              <p className="mb-4"><strong class="text-[#915eff]">Budget:</strong> ${itinerary.budget}</p>
              <p className="mb-4"><strong class="text-[#915eff]">Preferences:</strong> {itinerary.preferences}</p>
              <label className="block mb-4">
                <span className="text-[#915eff] font-medium">Transportation:</span>
                <select 
                  value={transportation} 
                  onChange={(e) => setTransportation(e.target.value)} 
                  required 
                  className="mt-1 block w-full px-3 py-2 bg-blue-100 text-blue-800 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:border-purple-600 focus:ring-purple-600"
                >
                  <option value="" disabled>Select transportation</option>
                  <option value="Bus">Bus</option>
                  <option value="Ferry">Ferry</option>
                  <option value="Flight">Flight</option>
                  <option value="Train">Train</option>
                </select>
              </label>

              <p className="mb-4"><strong class="text-[#915eff]">Meals:</strong> {itinerary.meals}</p>
              <p className="mb-4"><strong class="text-[#915eff]">Accommodation:</strong> {itinerary.accommodation}</p>
              <p className="mb-4"><strong class="text-[#915eff]">Total Estimated Cost:</strong> ${itinerary.totalCost}</p>
              <button 
                onClick={handleFlipBack} 
                className="mx-auto block py-2 px-4 bg-purple-800 text-white font-semibold rounded-md shadow-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none shadow-primary"
              >
                Back to Form
              </button>
            </div>
          )}


        </ReactCardFlip>
      </div>
    </section>
  );
}

export default ItineraryForm;
