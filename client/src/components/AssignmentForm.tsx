import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client'
import { GET_EMPLOYEES } from '../graphql/queries';
import { ASSIGN_EMPLOYEES } from '../graphql/mutations';
import { Job } from '../interfaces/Job';
import '../styles/assignmentForm.css';

// Assignment Props Interface
interface AssignmentFormProps {
    job: Job;
    resetForm: () => void;
  }
  
  interface Option {
    value: string;
    label: string;
  }

// AssignmentForm component that renders everything after pressing the "Assign Employees" button
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
    
    
    const handleEmployeeChange = (selectedOptions: Option[]) => {
        const selectedEmployeeIds = selectedOptions.map((option: Option) => option.value);
        setSelectedEmployees(selectedEmployeeIds);
    }

    if (employeeLoading) return <p>Loading...</p>
    if (employeeError) return <p>Error loading data</p>

    return (
        <div className="job-card assign-card">
          <h3>Assign Employees</h3>
          <p>
            Assign employee to the job: <strong>{job.title}</strong>
          </p>
          <div className="assign-container">
            <form onSubmit={handleSubmit} className="assign-form">
              <select
                id="employeeSelect"
                name="employees"
                multiple
                value={selectedEmployees}
                onChange={(e) => {
                  const selectedOptions = Array.from(e.target.selectedOptions);
                  handleEmployeeChange(selectedOptions);
                }}
                className="assign-select"
              >
                <option value="" disabled>
                  Select An Employee:
                </option>
                {employeeData?.employees?.map((employee: { id: string; name: string }) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </select>
              <button type="submit" disabled={assignLoading} className="assign-button">
                {assignLoading ? 'Assigning...' : 'Assign Employees'}
              </button>
            </form>
          </div>
          {assignError && <p className="error-message">Error: {assignError.message}</p>}
        </div>
      );
}

export default AssignmentForm;