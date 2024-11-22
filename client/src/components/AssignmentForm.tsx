import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client'
import { GET_EMPLOYEES } from '../graphql/queries';
import { ASSIGN_EMPLOYEES } from '../graphql/mutations';
import { Job } from '../interfaces/Job';

interface AssignmentFormProps {
    job: Job;
  }

const AssignmentForm: React.FC<AssignmentFormProps> = ({ job }) => {

    // const { data: jobsData, loading: jobsLoading, error: jobsError } = useQuery(GET_JOBS);
    const { data: employeeData, loading: employeeLoading, error: employeeError } = useQuery(GET_EMPLOYEES);

    // const [selectedJob, setSelectedJob] = useState<string | null>(job.id)
    const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null)

    const [assignJobToEmployee, { loading: assignLoading, error: assignError }] = useMutation(ASSIGN_EMPLOYEES, {
        refetchQueries: [{ query: GET_EMPLOYEES }],
        onCompleted: () => {
            console.log("Employee assigned to job successfully!");
        },
        onError: (error) => {
            console.error("Error assigning Employee", error.message);
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Selected Employee ID: ", selectedEmployee);

        if (selectedEmployee) {
            assignJobToEmployee({
                variables: {
                    input: {
                        job: job.id,
                        employees: [selectedEmployee],
                    },
                },
                onCompleted: () => {
                    console.log("Employee assigned to job successfully!");
                },
                onError: (error) => {
                    console.error("Error assigning Employee", error.message);
                }
            })
        } else {
            console.log("Please select both a job and an employee");
        }
    };

    if (employeeLoading) return <p>Loading...</p>
    if (employeeError) return <p>Error loading data</p>

    return (
        <div>
            <h2>Assign Employee to Job</h2>
            <form onSubmit={handleSubmit}>
                {/* <label htmlFor="jobSelect">Select Job</label>
                <select
                    id="jobSelect"
                    name="job"
                    value={selectedJob || ""}
                    onChange={(e) => setSelectedJob(e.target.value)}
                />
                    <option value="">Select a Job</option>
                    {jobsData?.jobs?.map((job: { id: string, title: string }) => {
                        <option key={job.id} value={job.id}>
                            {job.title}
                        </option>
                    })}
                <select/> */}
                <label htmlFor="employeeSelect">Select Employee:</label>
                <select
                    id="employeeSelect"
                    name="employee"
                    value={selectedEmployee || ''}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                >
                    <option value="">Select an Employee</option>
                    {employeeData?.employees?.map((employee: { id: string; name: string }) => (
                        <option key={employee.id} value={employee.id}>
                            {employee.name}
                        </option>
                ))}
                </select>
                <button type="submit" disabled={assignLoading}> 
                    {assignLoading ? "Assigning..." : "Assign Employee"}
                </button>
            </form>
            {assignError && <p>Error assigning employee: {assignError.message}</p>}
        </div>
    )
}

export default AssignmentForm;