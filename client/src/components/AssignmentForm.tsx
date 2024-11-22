// import React, { useState } from 'react';
// import { useMutation, useQuery } from '@apollo/client'
// import { GET_JOBS, GET_EMPLOYEES } from '../graphql/queries';

// const AssignmentForm: React.FC = () => {

//     const { data: jobsData, loading: jobsLoading, error: jobsError } = useQuery(GET_JOBS);
//     const { data: employeeData, loading: employeeLoading, error: employeeError } = useQuery(GET_EMPLOYEES);

//     const [selectedJob, setSelectedJob] = useState<string | null>(null)
//     const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null)

//     const [assignJobToEmployee, { loading: assignLoading, error: assignError }] = useMutation(ASSIGN_EMPLOYEES);

//     const handleSubmit = () => {

//     }

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <select/>
//                 <select/>
//             </form>
//         </div>
//     )
// }

// export default AssignmentForm;