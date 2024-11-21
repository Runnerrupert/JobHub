import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_JOBS } from '../graphql/queries';
import { DELETE_JOB } from '../graphql/mutations';
import { Job } from '../interfaces/Customer';

interface JobListProps {
    editJob: (job: Job) => void;
}

const JobList: React.FC<JobListProps> = ({ editJob }) => {
    const { loading, error, data } = useQuery(GET_JOBS)

    const [deleteJob] = useMutation(DELETE_JOB, {
        refetchQueries: [{ query: GET_JOBS }],
        onCompleted: () => {
            console.log('Job deleted');
        }
    })

    if (loading) return <p>Loading...</p>;
    if (error)  {
        console.error(error.message);
        return <p>Error</p>;
    }

    console.log("Current jobs from GET_JOBS query: ", data?.jobs);

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
            </div>
            ))}
        </div>
    )
}

export default JobList;