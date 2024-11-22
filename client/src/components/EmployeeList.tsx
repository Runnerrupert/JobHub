import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_EMPLOYEES } from '../graphql/queries';
import { DELETE_EMPLOYEE } from '../graphql/mutations';
import { Employee } from '../interfaces/Employee';
import { Assignment } from '../interfaces/Assignment';

interface EmployeeListProps {
    editEmployee: (employee: Employee) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ editEmployee }) => {
    const { loading, error, data } = useQuery(GET_EMPLOYEES)

    const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
        refetchQueries: [{ query: GET_EMPLOYEES }],
        onCompleted: () => {
            console.log('Employee deleted');
        }
    })

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.error(error.message);
        return <p>Error</p>
    }

    if (!data || !data.employees || data.employees.length === 0) {
        return <p>No employees found</p>;
    }

    const handleDeleteEmployee = async (id: string) => {
        try {
            await deleteEmployee({ variables: { id } })
        } catch {
            console.error("Error deleting employee: ", error);
        }
    }

    const renderAssignments = (assignments: Assignment[]) => {
        if (!assignments || assignments.length === 0) {
            return <p>No jobs assigned</p>
        }

        return (
            <ul>
                {assignments.map((assignments: Assignment) => (
                    <li key={assignments.id}>
                        <p>{assignments.title}</p>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <div>
            <h2>Employee Info</h2>
            {data.employees.map((employee: Employee) => (
            <div key={employee.id}>
                <h3>{employee.name}</h3>
                <p>E-mail: {employee.email}</p>
                <p>Phone: {employee.phoneNumber}</p>
                <p>Role: {employee.role}</p>
                <h3>Jobs</h3>
                {employee.assignments ? renderAssignments(employee.assignments) : <p>No jobs assigned</p>}
                <button onClick={() => editEmployee(employee)}>Edit</button>
                <button onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
            </div>
            ))}
        </div>
    )
}

export default EmployeeList;