// ItineraryForm.js
import React, { useEffect, useState } from 'react';
import ItineraryCard from './ItineraryCard';
import MapView from './MapView';

const ItineraryForm = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });

  const geoJsonData = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "geometry": {
          "type": "LineString",
          "coordinates": [
            [8.681495, 49.414599],
            [8.68147, 49.414599],
            [8.681488, 49.41465],
            [8.681423, 49.415746],
            [8.681656, 49.41659],
          ],
        },
      },
    ],
  };

  const handleFormSubmit = (generatedItinerary) => {
    setItinerary(generatedItinerary);
    setIsFlipped(true);
  };

  const handleFlipBack = () => {
    setIsFlipped(false);
  };

  // Geolocation logic
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setLocation({ loaded: true, error: { message: "Geolocation not supported" } });
    } else {
      navigator.geolocation.getCurrentPosition((loc) => {
        setLocation({
          loaded: true,
          coordinates: {
            lat: loc.coords.latitude,
            lng: loc.coords.longitude,
          },
        });
      });
    }
  }, []);

  return (
    <section className="relative w-full h-screen mx-auto pt-24">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#915eff]">Trip Planner</h1>
      </div>

      <div className="flex justify-center items-center max-w-7xl mx-auto gap-2"> {/* Reduced gap */}
        {/* Card takes 1/3 of the width */}
        <div className="w-1/3 flex justify-center">
          <ItineraryCard
            onFormSubmit={handleFormSubmit}
            handleFlipBack={handleFlipBack}
            itinerary={itinerary}
            isFlipped={isFlipped}
          />
        </div>
        
        {/* Map takes 2/3 of the width */}
        <div className="w-2/3 flex justify-center">
          <MapView location={location} geoJsonData={geoJsonData} />
        </div>
      </div>
    </section>
  );
};

export default ItineraryForm;
