import React, { useState } from 'react';

const EmployeeForm: React.FC = () => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Customer added:', name);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="customerName">Customer Name:</label>
      <input
        type="text"
        id="customerName"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="customerEmail">E-mail:</label>
      <input
      type="email"
      id="customerEmail"
      value={name}
      onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="customerPhone">Phone Number:</label>
      <input
      type="tel"
      id="customerPhone"
      value={name}
      onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="customerAddress">Address:</label>
      <input
      type="text"
      id="customerAddress"
      value={name}
      onChange={(e) => setName(e.target.value)}
      />

    <button type="submit">Add New Customer</button>
    </form>
  );
};

export default EmployeeForm;
