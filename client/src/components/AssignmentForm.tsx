import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client'
import { GET_EMPLOYEES } from '../graphql/queries';
import { ASSIGN_EMPLOYEES } from '../graphql/mutations';
import { Job } from '../interfaces/Job';

interface AssignmentFormProps {
    job: Job;
    resetForm: () => void;
  }

const AssignmentForm: React.FC<AssignmentFormProps> = ({ job, resetForm }) => {

    const { data: employeeData, loading: employeeLoading, error: employeeError } = useQuery(GET_EMPLOYEES);

    const [selectedEmployees, setSelectedEmployees] = useState<string[]>([])

    const [assignJobToEmployee, { loading: assignLoading, error: assignError }] = useMutation(ASSIGN_EMPLOYEES, {
        refetchQueries: [{ query: GET_EMPLOYEES }],
        onCompleted: () => {
            console.log("Employees assigned to job successfully! 2?");
        },
        onError: (error) => {
            console.error("Error assigning Employees", error.message);
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitting form with selected employees:", selectedEmployees);
        if (selectedEmployees) {
            assignJobToEmployee({
                variables: {
                    input: {
                        job: job.id,
                        employees: selectedEmployees,
                    },
                },
                onCompleted: () => {
                    console.log("Employees assigned to job successfully!");
                    resetForm()
                },
                onError: (error) => {
                    console.error("Error assigning Employees", error.message);
                }
            })
        } else {
            console.log("Please select at least one employee");
        }
    };
    
    const handleEmployeeChange = (selectedOptions: any) => {
        const selectedEmployeeIds = selectedOptions.map((option: any) => option.value);
        setSelectedEmployees(selectedEmployeeIds);
    }

    if (employeeLoading) return <p>Loading...</p>
    if (employeeError) return <p>Error loading data</p>

    return (
        <div>
            <h2>Assign Employees to Job</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="employeeSelect">Select Employees:</label>
                <select
                    id="employeeSelect"
                    name="employees"
                    multiple
                    value={selectedEmployees || ''}
                    onChange={(e) => {
                        const selectedOptions = Array.from(e.target.selectedOptions);
                        handleEmployeeChange(selectedOptions);
                    }}
                >
                    <option value="">Select Employees</option>
                    {employeeData?.employees?.map((employee: { id: string; name: string }) => (
                        <option key={employee.id} value={employee.id}>
                            {employee.name}
                        </option>
                    ))}
                </select>
                <button type="submit" disabled={assignLoading}>
                    {assignLoading ? "Assigning..." : "Assign Employees"}
                </button>
            </form>
            {assignError && <p>Error assigning employees: {assignError.message}</p>}
        </div>
    )
}

export default AssignmentForm;