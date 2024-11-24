import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CUSTOMERS, GET_JOBS } from '../graphql/queries';
import { DELETE_JOB } from '../graphql/mutations';
import { Job } from '../interfaces/Job';

interface JobListProps {
    editJob: (job: Job) => void;
}

const JobList: React.FC<JobListProps> = ({ editJob }) => {
    const { loading, error, data } = useQuery(GET_JOBS);

    const [deleteJob] = useMutation(DELETE_JOB, {
        refetchQueries: [{ query: GET_JOBS }, { query: GET_CUSTOMERS }],
        onCompleted: () => {
            console.log('Job deleted');
        }
    });

    if (loading) return <p>Loading...</p>;
    if (error)  {
        console.error('Error details: ', JSON.stringify(error, null, 2));
        return <p>Error</p>;
    }

    if (!data || !data.jobs || data.jobs.length === 0) {
        return <p className='none-found'>No jobs found</p>;
    }

    const handleDeleteJob = (id: string) => {
        deleteJob({ variables: { id }}).catch((error) => {
            console.error("Error deleting job: ", error);
        });
    };

    return (
        <div className="job-list">
            <h2>Jobs</h2>
            {data.jobs.map((job: Job) => (
                <div key={job.id} className="job-card">
                    <h3>{job.title}</h3>
                    <p><strong>Customer:</strong> {job.customer ? job.customer.name : 'No customer assigned'}</p>
                    <p><strong>Description:</strong> {job.description}</p>
                    <p><strong>Status:</strong> {job.status}</p>
                    <p><strong>Due Date:</strong> {new Date(parseInt(job.dueDate, 10)).toLocaleDateString()}</p>
                    <div className="card-buttons">
                        <button onClick={() => editJob(job)}>Edit</button>
                        <button onClick={() => handleDeleteJob(job.id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default JobList;