import React, { useState, useEffect } from 'react';
import "../Styles/ParkingSlot.css";

const ParkingBooking = () => {
  const [vehicleType, setVehicleType] = useState('');
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    // Fetch slots from the backend
    const fetchSlots = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/slots');
        const data = await response.json();
        setSlots(data);
      } catch (error) {
        console.error('Error fetching slots:', error);
      }
    };

    fetchSlots();
  }, []);

  const handleVehicleTypeChange = (e) => setVehicleType(e.target.value);

  const handleSlotBooking = async (index) => {
    if (!vehicleType) {
      alert('Please select a vehicle type');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/slots/${index}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vehicleType }),
      });

      if (response.ok) {
        const updatedSlots = await response.json();
        alert(updatedSlots.message);

        // Fetch updated slots from the backend
        const fetchSlots = async () => {
          const res = await fetch('http://localhost:5000/api/slots');
          const data = await res.json();
          setSlots(data);
        };
        fetchSlots();
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error('Error booking slot:', error);
    }
  };

  return (
    <div className="parking-container">
      <h2>Book a Parking Slot</h2>

      <label>Select Vehicle Type:</label>
      <select value={vehicleType} onChange={handleVehicleTypeChange}>
        <option value="">Select...</option>
        <option value="2-wheeler">2-Wheeler</option>
        <option value="3-wheeler">3-Wheeler</option>
        <option value="4-wheeler">4-Wheeler</option>
      </select>

      <div className="slots">
        {slots.map((slot, index) => (
          <div
            key={index}
            className={`slot ${slot ? 'booked' : 'available'}`}
            onClick={() => handleSlotBooking(index)}
          >
            {slot ? `${slot}` : `Slot ${index + 1}`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParkingBooking;
