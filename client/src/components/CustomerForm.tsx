import React, { useState } from 'react';
import {useMutation} from "@apollo/client";
import {ADD_CUSTOMER} from "../graphql/mutations";
import {GET_CUSTOMERS} from "../graphql/queries";

interface Customer {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    createdAt?: string;
    updatedAt?: string;
    jobs?: Job[];
}

interface Job {
    id: string;
    title: string;
    status: string;
}

const CustomerForm: React.FC = () => {
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
  },
  update: (cache, { data: { addCustomer } }) => {
    try {
      const customerData = cache.readQuery<{ customers: Customer[] }>({
        query: GET_CUSTOMERS,
    });

    console.log(`Current customers in cache:`, customerData?.customers);

    if (customerData && customerData.customers) {
        cache.writeQuery({
            query: GET_CUSTOMERS,
            data: {
                customers: [...customerData.customers, addCustomer],
            },
        });
    } else {
      cache.writeQuery({
        query: GET_CUSTOMERS,
        data: {
            customers: [addCustomer],
        },
    });
    }
  } catch (error) {
    console.error('Error writing to cache:', error);
  }
  }
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
        ...formState,
        [e.target.name]: e.target.value
    });
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCustomerAdded(false);
    console.log('Form submitted');
    addCustomer({ variables: { input: formState } }).catch((error) => {
        console.error('Error adding customer:', error);
    });
};

return (
  <div>
  <form onSubmit={handleSubmit}>
    <label htmlFor="customerName">Customer Name:</label>
    <input
      type="text"
      id="customerName"
      name = "name"
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

    <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add New Customer'}</button>
  </form>

  {isCustomerAdded && <p>Customer added successfully!</p>}
  {error && <p>Error :( Please try again</p>}
  </div>
  );
};

export default CustomerForm;