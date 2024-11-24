import React from 'react';
import Navbar from '../components/Navbar';
import JobForm from '../components/JobForm';
import JobList from '../components/JobList';
import AssignmentForm from '../components/AssignmentForm'
import type { Job } from '../interfaces/Job';
import '../styles/Jobs.css';

const Jobs: React.FC = () => {
    const [editingJob, setEditingJob] = React.useState<Job | null> (null);
    const [assigningJob, setAssigningJob] = React.useState<Job | null> (null);

    const handleEditJob = (job: Job) => {
        setEditingJob(job);
    }

    const handleAssignEmployees = (job: Job) => {
        setAssigningJob(job);
    };

    const resetForm = () => {
        console.log("Resetting Form");
        setAssigningJob(null);
    }

    console.log("Current assigningJob: ", assigningJob);

    return (
        <div>
            <Navbar/>
            <div>
                <h2>Please Enter Job Information</h2>
                {/* // Add forms to add, update, and delete jobs */}
                <JobForm job={editingJob} />
                {/* // Add a table to display all jobs */}
                <JobList editJob={handleEditJob} assignJob={handleAssignEmployees} />

                {assigningJob && <AssignmentForm job={assigningJob} resetForm={resetForm} />}
            </div>
        </div>
        
    );
};

export default Jobs;