import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = ({ location, geoJsonData }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    console.log("Selected option: ", e.target.value);
    // You can add logic here to fetch data or perform actions based on the selected option
  };

  return (
    <section className="relative w-full h-screen mx-auto pt-16">
      <div className="max-w-lg mx-auto bg-tertiary p-8 rounded-lg shadow-md items-center">
        {location.loaded ? (
          location.error ? (
            <div>Error: {location.error.message}</div>
          ) : (
            <div className="rounded-lg overflow-hidden">
              <MapContainer
                center={[location.coordinates.lat, location.coordinates.lng]}
                zoom={13}
                style={{ height: '540px', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {/* GeoJSON Layer */}
                <GeoJSON data={geoJsonData} />

                {/* Marker for Fixed Location */}
                <Marker position={[49.41659, 8.681656]}>
                  <Popup>
                    <div>
                      <h3 className="font-semibold">Select an option:</h3>
                      <select
                        value={selectedOption}
                        onChange={handleOptionChange}
                        className="mt-2 w-full px-2 py-1 text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                      >
                        <option value="">Choose...</option>
                        <option value="restaurants">Restaurants</option>
                        <option value="shops">Shops</option>
                        <option value="hospitals">Hospitals</option>
                      </select>
                    </div>
                  </Popup>
                </Marker>

                {/* Marker for User's Location */}
                <Marker position={[location.coordinates.lat, location.coordinates.lng]}>
                  <Popup>
                    <div>
                      <h3 className="font-semibold">Select an option:</h3>
                      <select
                        value={selectedOption}
                        onChange={handleOptionChange}
                        className="mt-2 w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                      >
                        <option value="">Choose...</option>
                        <option value="restaurants">Restaurants</option>
                        <option value="shops">Shops</option>
                        <option value="hospitals">Hospitals</option>
                      </select>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          )
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </section>
  );
};

export default MapView;
