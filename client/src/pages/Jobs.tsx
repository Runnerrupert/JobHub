import React from 'react';
import Navbar from '../components/Navbar';
import JobForm from '../components/JobForm';
import JobList from '../components/JobList';
import type { Job } from '../interfaces/Job';
import '../styles/Jobs.css';

const Jobs: React.FC = () => {
    const [editingJob, setEditingJob] = React.useState<Job | null> (null);

    const handleEditJob = (job: Job) => {
        setEditingJob(job);
    }

    return (
        <div>
            <Navbar/>
            <div>
                <h2>Please Enter Job Information</h2>
                {/* // Add forms to add, update, and delete jobs */}
                <JobForm job={editingJob} />
                {/* // Add a table to display all jobs */}
                <JobList editJob={handleEditJob} />
            </div>
        </div>
        
    );
};

export default Jobs;