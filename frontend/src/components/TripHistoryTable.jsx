import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TripHistoryTable = ({ trips }) => {
  const navigate = useNavigate();

  const handleViewDetails = (tripId) => {
    // Navigate to the trip details page with the trip ID
    navigate(`/trip-details/${tripId}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Destination</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trips.map((trip) => (
            <TableRow key={trip.id}>
              <TableCell>{trip.destination}</TableCell>
              <TableCell>{trip.startDate}</TableCell>
              <TableCell>{trip.endDate}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleViewDetails(trip.id)}>
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TripHistoryTable;
