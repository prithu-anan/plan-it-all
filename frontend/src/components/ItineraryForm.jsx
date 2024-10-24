import React, { useEffect, useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

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

    const formattedStartDate = format(startDate, 'dd/MM/yyyy');
    const formattedEndDate = format(endDate, 'dd/MM/yyyy');

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
    setIsFlipped(true);
  };

  const handleFlipBack = () => {
    setIsFlipped(false);
  };

  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" }
  });

  // Function to handle success of geolocation
  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  // Function to handle error of geolocation
  const onError = (error) => {
    setLocation({
      loaded: true,
      error,
    });
  };

  // UseEffect to request the user's location
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);

    console.log(location);
  }, []);

  return (
    <section className="relative w-full h-screen mx-auto pt-25">

    <div className="text-center">
      <h1 className="text-4xl font-bold text-[#915eff]">
        Trip Planner
      </h1>
    </div>

      <div className="absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row gap-10 mt-10">
        
        {/* Left Column: Card */}
        <div className="w-1/2">
          
          
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
              <div className="max-w-lg mx-auto bg-tertiary p-8 rounded-lg shadow-md items-center">
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
        
        {/* Right Column: Map */}
        <div className="w-1/2">
        {location.loaded ? (
        location.error ? (
          <div>Error: {location.error.message}</div>
        ) : (
          <div>
            <MapContainer
              center={[location.coordinates.lat, location.coordinates.lng]}
              zoom={13}
              style={{ height: '500px', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[location.coordinates.lat, location.coordinates.lng]}>
                <Popup>
                  You are here!
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        )
      ) : (
        <div>Loading...</div>
      )}
        </div>
        
      </div>
    </section>
  );
}

export default ItineraryForm;
