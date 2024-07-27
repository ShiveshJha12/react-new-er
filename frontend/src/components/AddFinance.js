import React, { useState } from 'react';
import axios from 'axios';

const AddFinance = () => {
  const [type, setType] = useState('income');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/finances/add', { type, amount, date, description });
      alert('Finance record added successfully');
      setType('income');
      setAmount('');
      setDate('');
      setDescription('');
    } catch (error) {
      alert('Failed to add finance record: ' + (error.response?.data || error.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Finance Record</h1>
      <select value={type} onChange={(e) => setType(e.target.value)} required>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input
        type="number"
        step="0.01"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Finance</button>
    </form>
  );
};

export default AddFinance;
