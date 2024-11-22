import React from 'react';
import CustomerForm from '../components/CustomerForm';
import CustomerList from '../components/CustomerList';
import Navbar from '../components/Navbar';
import type { Customer } from '../interfaces/Customer';
import '../styles/customer.css';

const Customer: React.FC = () => {
  const [editingCustomer, setEditingCustomer] = React.useState<Customer | null> (null);

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
  }

  return (
    <div className="customer-page">
      <Navbar />
      <div className="customer-content">
        <h2>Please Enter Customer Information</h2>
        {/* Form to add, update, and delete customers */}
        <CustomerForm
          customer={editingCustomer}
          onEditComplete={() => setEditingCustomer(null)}
        />
        {/* Table to display all customers */}
        <CustomerList editCustomer={handleEditCustomer} />
      </div>
    </div>
  );
};

export default Customer;