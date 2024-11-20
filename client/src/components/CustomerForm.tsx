import React, { useState } from 'react';
import {useMutation} from "@apollo/client";
import {ADD_CUSTOMER} from "../graphql/mutations";

const CustomerForm: React.FC = () => {
const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
});
  const [addCustomer, { loading, error }] = useMutation(ADD_CUSTOMER);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
        ...formState,
        [e.target.name]: e.target.value
    });
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addCustomer({ variables: { ...formState } });
};

if (loading) return <p>Loading...</p>;
if (error) return <p>Error :(</p>;

  return (
    <>
    {loading && <p>Loading...</p>}
    {error && <p>Error</p>}

    <form onSubmit={handleSubmit}>
      <label htmlFor="customerName">Customer Name:</label>
      <input
        type="text"
        id="customerName"
        name = "name"
        value={formState.name}
        onChange={handleChange}
      />

      <label htmlFor="customerEmail">E-mail:</label>
      <input
      type="email"
      id="customerEmail"
      name = "email"
      value={formState.email}
      onChange={handleChange}
      />

      <label htmlFor="customerPhone">Phone Number:</label>
      <input
      type="tel"
      id="customerPhone"
      name = "phone"
      value={formState.phone}
      onChange={handleChange}
      />

      <label htmlFor="customerAddress">Address:</label>
      <input
      type="text"
      id="customerAddress"
      name = "address"
      value={formState.address}
      onChange={handleChange}
      />

    <button type="submit">Add New Customer</button>
    </form>
    </>
  );
};

export default CustomerForm;