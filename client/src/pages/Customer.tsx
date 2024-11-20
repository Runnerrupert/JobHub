import React from 'react';
import CustomerForm from '../components/CustomerForm';
import CustomerList from '../components/CustomerList';

const Customer: React.FC = () => {
  return (
    <div>
      <h1>This is the Customer Page</h1>
      {/* // Add forms to add, update, and delete customers */}

      <CustomerForm />

      {/* // Add a table to display all customers */}

      <CustomerList />
    </div>
  );
};

export default Customer;