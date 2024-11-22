import React from 'react';
import Navbar from '../components/Navbar';
import JobForm from '../components/JobForm';
import JobList from '../components/JobList';
import type { Job } from '../interfaces/Job';

const Jobs: React.FC = () => {
    const [editingJob, setEditingJob] = React.useState<Job | null> (null);

    const handleEditJob = (job: Job) => {
        setEditingJob(job);
    }

    return (
        <div>
            <Navbar/>
            <div>
                <h1>This is the Jobs Page</h1>
                {/* // Add forms to add, update, and delete jobs */}
                <JobForm job={editingJob} />
                {/* // Add a table to display all jobs */}
                <JobList editJob={handleEditJob} />
            </div>
        </div>
        
    );
};

export default Jobs;