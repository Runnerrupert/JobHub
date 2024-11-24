import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_EMPLOYEES } from '../graphql/queries';
import { DELETE_EMPLOYEE } from '../graphql/mutations';
import { Employee } from '../interfaces/Employee';

interface EmployeeListProps {
  editEmployee: (employee: Employee) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ editEmployee }) => {
  const { loading, error, data } = useQuery(GET_EMPLOYEES);

  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    refetchQueries: [{ query: GET_EMPLOYEES }],
    onCompleted: () => {
      console.log('Employee deleted');
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error.message);
    return <p>Error</p>;
  }

  if (!data || !data.employees || data.employees.length === 0) {
    return <p className='none-found'>No employees found</p>;
  }

  const handleDeleteEmployee = async (id: string) => {
    try {
      await deleteEmployee({ variables: { id } });
    } catch {
      console.error('Error deleting employee: ', error);
    }
  };

  return (
    
    <div className="employee-list">
      {data.employees.map((employee: Employee) => (
        <div key={employee.id} className="employee-card">
          <h3>{employee.name}</h3>
          <p><strong>E-mail:</strong> {employee.email}</p>
          <p><strong>Phone:</strong> {employee.phoneNumber}</p>
          <p><strong>Role:</strong> {employee.role}</p>
          <h4>Jobs</h4>
          <p>No jobs assigned</p>
          <div className="card-buttons">
            <button onClick={() => editEmployee(employee)}>Edit</button>
            <button onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;