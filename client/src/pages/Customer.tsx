import React from 'react';
import CustomerForm from '../components/CustomerForm';
import CustomerList from '../components/CustomerList';
import Navbar from '../components/Navbar';
import type { Customer } from '../interfaces/Customer';

const Customer: React.FC = () => {
  const [editingCustomer, setEditingCustomer] = React.useState<Customer | null> (null);

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
  }

  return (
    <div>
      <Navbar />
      <div>
        <h1>This is the Customer Page</h1>
        {/* // Add forms to add, update, and delete customers */}
        <CustomerForm customer={editingCustomer} onEditComplete={() => setEditingCustomer(null)} />
        {/* // Add a table to display all customers */}
        <CustomerList editCustomer={handleEditCustomer} />
      </div>
    </div>
  );
};

export default Customer;