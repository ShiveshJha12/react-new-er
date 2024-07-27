import React, { useState } from 'react';
import axios from 'axios';

const AddEvent = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const token = localStorage.getItem('token'); // Get token from localStorage

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/events/add', 
        { name, description, date, location },
        { headers: { Authorization: `Bearer ${token}` } } // Set Authorization header
      );
      alert('Event added successfully');
    } catch (error) {
      alert('Failed to add event: ' + error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Event</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <button type="submit">Add Event</button>
    </form>
  );
};

export default AddEvent;
