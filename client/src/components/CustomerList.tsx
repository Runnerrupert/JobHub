import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CUSTOMERS } from '../graphql/queries';
import { Customer, Job } from '../interfaces/Customer';

interface CustomerListProps {
    editCustomer: (customer: Customer) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ editCustomer }) => {
    const { loading, error, data } = useQuery(GET_CUSTOMERS)

    if (loading) return <p>Loading...</p>;
    if (error)  {
        console.error(error.message);
        return <p>Error</p>;
    }

    console.log("Current customers from GET_CUSTOMERS query: ", data?.customers);

    if (!data || !data.customers || data.customers.length === 0) {
        return <p>No customers found</p>;
    }

    const renderJobs = (jobs: Job[]) => {
        if (!jobs || jobs.length === 0) {
            return <p>No jobs assigned</p>;
        }

        return (
            <ul>
                {jobs.map((job: Job) => (
                    <li key={job.id}>
                        <p>{job.title}</p>
                        <p>{job.status}</p>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <div>
            <h2>Customer Info</h2>
            {data.customers.map((customer: Customer) => (
            <div key={customer.id}>
                <h3>{customer.name}</h3>
                <p>E-mail: {customer.email}</p>
                <p>Phone: {customer.phoneNumber}</p>
                <p>{customer.address}</p>
                <h3>Jobs</h3>
                {customer.jobs ? renderJobs(customer.jobs) : <p>No jobs assigned</p>}
                <button onClick={() => editCustomer(customer)}>Edit</button>
            </div>
            ))}
        </div>
    )
}

export default CustomerList;