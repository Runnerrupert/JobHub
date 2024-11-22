import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CUSTOMERS, GET_JOBS, GET_EMPLOYEES } from '../graphql/queries';
import { DELETE_CUSTOMER } from '../graphql/mutations';
import { Customer } from '../interfaces/Customer';
import { Job } from '../interfaces/Job';

interface CustomerListProps {
    editCustomer: (customer: Customer) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ editCustomer }) => {
    const { loading, error, data } = useQuery(GET_CUSTOMERS)

    const [deleteCustomer] = useMutation(DELETE_CUSTOMER, {
        refetchQueries: [{ query: GET_CUSTOMERS }, { query: GET_JOBS }, { query: GET_EMPLOYEES }],
        onCompleted: () => {
            console.log('Customer deleted');
        }
    })

    if (loading) return <p>Loading...</p>;
    if (error)  {
        console.error(error.message);
        return <p>Error</p>;
    }

    if (!data || !data.customers || data.customers.length === 0) {
        return <p>No customers found</p>;
    }

    const handleDeleteCustomer = async (id: string) => {
        try {
            await deleteCustomer({ variables: { id } })
        } catch {
            console.error("Error deleting customer:", error);
        }
    }

    const renderJobs = (jobs: Job[], customerName: string) => {
        if (!jobs || jobs.length === 0) {
            return <p>{customerName} has no Jobs</p>;
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
                <p>Address: {customer.address}</p>
                <h3>Jobs</h3>
                {customer.jobs ? renderJobs(customer.jobs, customer.name) : <p>No jobs assigned</p>}
                <button onClick={() => editCustomer(customer)}>Edit</button>
                <button onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
            </div>
            ))}
        </div>
    )
}

export default CustomerList;