import React, { useState, useEffect } from 'react';

interface Customer {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
}

const CustomerList: React.FC = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetch('/api/customers')
            .then(res => res.json())
            .then(customers => {
                setCustomers(customers);
            });
    }, []);

    return (
        <div>
            <h1>Customers</h1>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer: Customer) => (
                        <tr key={customer.id}>
                            <td>{customer.first_name}</td>
                            <td>{customer.last_name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerList;