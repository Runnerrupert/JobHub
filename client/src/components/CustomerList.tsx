import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CUSTOMERS } from '../graphql/queries';
import { DELETE_CUSTOMER } from '../graphql/mutations';
import { Customer } from '../interfaces/Customer';
import { Job } from '../interfaces/Job';

interface CustomerListProps {
    editCustomer: (customer: Customer) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ editCustomer }) => {
    const { loading, error, data } = useQuery(GET_CUSTOMERS)

    const [deleteCustomer] = useMutation(DELETE_CUSTOMER, {
        refetchQueries: [{ query: GET_CUSTOMERS }],
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
        return <p className='none-found'>No customers found</p>;
    }

    const handleDeleteCustomer = async (id: string) => {
        try {
            await deleteCustomer({ variables: { id } })
        } catch {
            console.error("Error deleting customer:", error);
        }
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
        <div className="customer-list">
            {data.customers.map((customer: Customer) => (
                <div key={customer.id} className="customer-card">
                    <h3>{customer.name}</h3>
                    <p><strong>E-mail:</strong> {customer.email}</p>
                    <p><strong>Phone:</strong> {customer.phoneNumber}</p>
                    <p><strong>Address:</strong> {customer.address}</p>
                    <h4>Jobs</h4>
                    {customer.jobs && customer.jobs.length > 0
                        ? renderJobs(customer.jobs)
                        : <p>No jobs assigned</p>}
                    <div className="card-buttons">
                        <button onClick={() => editCustomer(customer)}>Edit</button>
                        <button onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CustomerList;