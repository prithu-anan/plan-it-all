import React, { useState } from 'react'
import { styles } from '../styles'
// import '../stylesheets/ItineraryForm.css'

const ItineraryForm = () => {
const [destination, setDestination] = useState('');
  const [tripDates, setTripDates] = useState('');
  const [budget, setBudget] = useState('');
  const [preferences, setPreferences] = useState('');
  const [itinerary, setItinerary] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Simulated itinerary generation based on form input
    const generatedItinerary = {
      destination,
      tripDates,
      budget,
      preferences,
      transportation: "Bus/Ferry",
      meals: "Local Seafood",
      accommodation: "Mid-range hotel",
      totalCost: 500,
    };
    
    setItinerary(generatedItinerary);
  };

  return (
    <section className='relative w-full h-screen mx-auto'>
      <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}>
        <h1>Trip Planner</h1>
        <form onSubmit={handleFormSubmit}>
          <label>
            Destination:
            <input 
              type="text" 
              value={destination} 
              onChange={(e) => setDestination(e.target.value)} 
              required 
            />
          </label>

          <label>
            Trip Dates:
            <input 
              type="text" 
              value={tripDates} 
              onChange={(e) => setTripDates(e.target.value)} 
              placeholder="DD/MM/YYYY - DD/MM/YYYY"
              required 
            />
          </label>

          <label>
            Budget (in $):
            <input 
              type="number" 
              value={budget} 
              onChange={(e) => setBudget(e.target.value)} 
              required 
            />
          </label>

          <label>
            Preferences (e.g., budget, luxury):
            <input 
              type="text" 
              value={preferences} 
              onChange={(e) => setPreferences(e.target.value)} 
              required 
            />
          </label>

          <button type="submit">Generate Itinerary</button>
        </form>
      </div>
    </section>
  );
}

export default ItineraryForm