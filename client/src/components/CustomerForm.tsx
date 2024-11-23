import React, { useState, useEffect } from 'react';
import {useMutation} from "@apollo/client";
import {ADD_CUSTOMER, UPDATE_CUSTOMER} from "../graphql/mutations";
import {GET_CUSTOMERS} from "../graphql/queries";
import { Customer } from "../interfaces/Customer";

interface CustomerFormProps {
  customer: Customer | null;
  onEditComplete?: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ customer, onEditComplete }) => {
const [formState, setFormState] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: ''
});

const [isCustomerAdded, setIsCustomerAdded] = useState(false);

const [addCustomer, { loading, error }] = useMutation(ADD_CUSTOMER, {
  refetchQueries: [{ query: GET_CUSTOMERS }],
  onCompleted: () => {
    setFormState({
        name: '',
        email: '',
        phoneNumber: '',
        address: ''
    });
    setIsCustomerAdded(true);
  }
});

const [updateCustomer, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_CUSTOMER, {
  refetchQueries: [{ query: GET_CUSTOMERS }],
  onCompleted: () => {
    setFormState({
      name: "",
      email: "",
      phoneNumber: "",
      address: ""
    })
    if (onEditComplete) {
      onEditComplete();
    }
  }
}) 

useEffect(() => {
  if (customer) {
    setFormState({
      name: customer.name,
      email: customer.email,
      phoneNumber: customer.phoneNumber,
      address: customer.address
    });
  }}, [customer]);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
        ...formState,
        [e.target.name]: e.target.value
    });
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (customer) {
    updateCustomer({ variables: { input: formState, id: customer.id } }).catch((err) => {
      console.error('Error updating customer:', err);
    });
  } else {
    addCustomer({ variables: { input: formState } }).catch((error) => {
      console.error('Error adding customer:', error);
    });
  }
  setFormState({
    name: '',
    email: '',
    phoneNumber: '',
    address: ''
  });
};
    
    

return (
  <div>
  <form className="customer-form" onSubmit={handleSubmit}>
    <label htmlFor="customerName">Customer Name:</label>
    <input
      type="text"
      id="customerName"
      name= "name"
      value={formState.name}
      onChange={handleChange}
      required
    />

    <label htmlFor="customerEmail">E-mail:</label>
    <input
    type="email"
    id="customerEmail"
    name = "email"
    value={formState.email}
    onChange={handleChange}
    required
    />

    <label htmlFor="customerPhone">Phone Number:</label>
    <input
    type="tel"
    id="customerPhone"
    name = "phoneNumber"
    value={formState.phoneNumber}
    onChange={handleChange}
    required
    />

    <label htmlFor="customerAddress">Address:</label>
    <input
    type="text"
    id="customerAddress"
    name = "address"
    value={formState.address}
    onChange={handleChange}
    required
    />

    <button type="submit" disabled={loading || updateLoading}>{loading || updateLoading ? 'Submitting...' : customer ? 'Update Customer' : 'Add New Customer'}</button>
  </form>

    {isCustomerAdded && <p className='success-message'>Customer added successfully!</p>}
    {error && <p>Error, Please try again</p>}
    {updateError && <p>Error updating customer, please try again</p>}
  </div>
  );
};

export default CustomerForm;