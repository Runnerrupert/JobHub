import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CUSTOMERS, GET_JOBS } from '../graphql/queries';
import { DELETE_JOB } from '../graphql/mutations';
import { Job } from '../interfaces/Job';

interface JobListProps {
    editJob: (job: Job) => void;
    assignJob: (job: Job) => void;
}

const JobList: React.FC<JobListProps> = ({ editJob, assignJob }) => {
    const { loading, error, data } = useQuery(GET_JOBS)

    const [deleteJob] = useMutation(DELETE_JOB, {
        refetchQueries: [{ query: GET_JOBS }, { query: GET_CUSTOMERS }],
        onCompleted: () => {
            console.log('Job deleted');
        }
    })

    if (loading) return <p>Loading...</p>;
    if (error)  {
        console.error('Error details: ', JSON.stringify(error, null, 2));
        return <p>Error</p>;
    }

    console.log(data);

    if (!data || !data.jobs || data.jobs.length === 0) {
        return <p>No jobs found</p>;
    }

    const handleDeleteJob = (id: string) => {
        deleteJob({ variables: { id }}).catch((error) => {
            console.error("Error deleting job: ", error);
        })
    }

    return (
        <div>
            <h2>Job Info</h2>
            {data.jobs.map((job: Job) => (
            <div key={job.id}>
                <h3>{job.title}</h3>
                <p>Customer: {job.customer ? job.customer.name : 'No customer Assigned'}</p>
                <button onClick={() => editJob(job)}>Edit</button>
                <button onClick={() => handleDeleteJob(job.id)}>Delete</button>
                <button onClick={() => assignJob(job)}>Assign Employee</button>
            </div>
            ))}
        </div>
    )
}

export default JobList;