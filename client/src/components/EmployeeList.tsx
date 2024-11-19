import React, { useState, useEffect } from 'react';

interface Employee {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    role: string;
}

const EmployeeList: React.FC = () => {
    const [employee, setEmployees] = useState([]);

    useEffect(() => {
        fetch('/api/employees')
            .then(res => res.json())
            .then(employee => {
                setEmployees(employee);
            });
    }, []);

    return (
        <div>
            <h1>Employees</h1>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {employee.map((customer: Employee) => (
                        <tr key={customer.id}>
                            <td>{customer.first_name}</td>
                            <td>{customer.last_name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;