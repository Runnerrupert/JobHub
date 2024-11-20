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
      <label htmlFor="employeeName">Employee Name:</label>
      <input
        type="text"
        id="employeeName"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="employeeEmail">E-mail:</label>
      <input
      type="email"
      id="employeeEmail"
      value={name}
      onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="employeePhone">Phone Number:</label>
      <input
      type="tel"
      id="employeePhone"
      value={name}
      onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="role">Address:</label>
      <input
      type="text"
      id="role"
      value={name}
      onChange={(e) => setName(e.target.value)}
      />

    <button type="submit">Add New Employee</button>
    </form>
  );
};

export default EmployeeForm;
