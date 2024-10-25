import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Select, MenuItem } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import { useLocation } from 'react-router-dom';
import { getPOI } from '../api-helpers';
import { set } from 'date-fns';

const NewMapView = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: '', lng: '' },
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [weatherType, setWeatherType] = useState('temperature');
  const [clickedPosition, setClickedPosition] = useState(null);
  const [showPOI, setShowPOI] = useState(false);
  
  // Dummy data for chart
  const weatherData = {
    temperature: [20, 22, 21, 23, 24, 26],
    rainfall: [0, 5, 10, 15, 20, 25],
    humidity: [30, 32, 35, 33, 34, 31],
  };

  const loc = useLocation()

  const transportation = loc?.state.trip;

//   console.log(transportation);

  const extractCoordinates = (data) => {
    const coordinates = [];
  
    data.waypoints.forEach(waypoint => {
      waypoint.descriptions.forEach(location => {
        // Push longitude and latitude in the specified format
        coordinates.push([location.longitude, location.latitude]);
      });
    });
  
    return coordinates;
  };
  
  // Extracting and formatting coordinates
  const formattedCoordinates = extractCoordinates(transportation);

  const geoJsonData = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
        //   coordinates: [
        //     [8.681495, 49.414599],
        //     [8.68147, 49.414599],
        //     [8.681488, 49.41465],
        //     [8.681423, 49.415746],
        //     [8.681656, 49.41659],
        //   ],
        coordinates: formattedCoordinates
        },
      },
    ],
  };

  const handleOptionChange = (e, position) => {
    setSelectedOption(e.target.value);
    if (e.target.value === 'weather') {
      setOpenDialog(true);
    }
    else if(e.target.value === 'points of interest') {
        console.log("Clicked position: ", clickedPosition);
        getPOI({lat: clickedPosition.lat, lon: clickedPosition.lng}).then((res) => {
            if(res) {
                console.log(res);
                setShowPOI(true);
            }
        });
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOption('');
  };

  const handleWeatherTypeChange = (e) => {
    setWeatherType(e.target.value);
  };

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setLocation({ loaded: true, error: { message: 'Geolocation not supported' } });
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

  const data = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
    datasets: [
      {
        label: weatherType === 'temperature' ? 'Temperature (°C)' : weatherType === 'rainfall' ? 'Rainfall (mm)' : 'Humidity (%)',
        data: weatherData[weatherType],
        fill: false,
        borderColor: '#915eff',
      },
    ],
  };

  return (
    <section className="relative w-full h-screen mx-auto pt-44">
        <div>
            <h1 className='mb-10 text-center font-semibold text-4xl'>
                Explore Your <span className="text-purple-800">Route</span>
            </h1>
        </div>
      <div className="max-w-5xl mx-auto bg-tertiary rounded-lg shadow-md items-center">
        {location.loaded ? (
          location.error ? (
            <div>Error: {location.error.message}</div>
          ) : (
            <div className="rounded-lg overflow-hidden">
              <MapContainer
                center={[formattedCoordinates[0][1], formattedCoordinates[0][0]]}
                zoom={13}
                style={{ height: '540px', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <GeoJSON data={geoJsonData} />
                
                {formattedCoordinates.map((position, index) => (
                    <Marker key={index} position={[position[1], position[0]]} eventHandlers={{
                        click: (e) => {
                          setClickedPosition(e.latlng);
                        },
                      }}>
                        <Popup>
                        <div>
                            <h3 className="font-semibold">Select an option:</h3>
                            <select
                            value={selectedOption}
                            onChange={handleOptionChange}
                            className="mt-2 w-full px-2 py-1 text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                            >
                            <option value="">Choose...</option>
                            <option value="points of interest">Points of Interest</option>
                            <option value="weather">Weather</option>
                            </select>
                        </div>
                        </Popup>
                    </Marker>
                    ))}
              </MapContainer>
            </div>
          )
        ) : (
          <div>Loading...</div>
        )}
      </div>

      <div className='flex justify-center my-4'> {/* Centering the button horizontally */}
        <button className='flex items-center'>
            <a href="/itinerary" className="py-2 px-4 bg-purple-800 text-white font-semibold rounded-md shadow-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none shadow-primary">
                Confirm Trip
            </a>
        </button>
    </div>


      {/* Weather Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Select Weather Data</DialogTitle>
        <DialogContent>
          <Select
            value={weatherType}
            onChange={handleWeatherTypeChange}
            displayEmpty
            className="w-full mb-4"
          >
            <MenuItem value="temperature">Temperature</MenuItem>
            <MenuItem value="rainfall">Rainfall</MenuItem>
            <MenuItem value="humidity">Humidity</MenuItem>
          </Select>
          <div className="w-full" style={{ height: '300px' }}>
            <LineChart  series={[
                { curve: "linear", data: weatherData[weatherType] },
              ]}
                
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
};

export default NewMapView;
