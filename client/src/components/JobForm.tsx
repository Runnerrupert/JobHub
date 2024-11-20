import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_JOB, UPDATE_JOB } from '../graphql/mutations';
import { GET_JOBS } from '../graphql/queries';
import { GET_CUSTOMERS } from '../graphql/queries';
import { Job } from '../interfaces/Job';
import { Customer } from '../interfaces/Customer';

interface JobFormProps {
  job: Job | null;
}

const JobForm: React.FC<JobFormProps> = ({ job }) => {
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    status: 'pending', 
    dueDate: '',
    customerId: ''
  });

  const [isJobAdded, setIsJobAdded] = useState(false);

  const { data: customersData, loading: customersLoading, error: customersError } = useQuery(GET_CUSTOMERS);

  const [addJob, { loading, error }] = useMutation(ADD_JOB, {
    refetchQueries: [{ query: GET_JOBS }],
    onCompleted: () => {
      setFormState({
        title: '',
        description: '',
        status: 'pending',
        dueDate: '',
        customerId: ''
      });
      setIsJobAdded(true);
    },
    update: (cache, { data: { addJob } }) => {
      const jobData = cache.readQuery<{ jobs: Job[] }>({
        query: GET_JOBS,
      });

      if (jobData && jobData.jobs) {
        cache.writeQuery({
          query: GET_JOBS,
          data: { jobs: [...jobData.jobs, addJob] },
        });
      }
    }
  });

  const [updateJob, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_JOB, {
    refetchQueries: [{ query: GET_JOBS }]
  });

  useEffect(() => {
    if (job) {
      setFormState({
        title: job.title,
        description: job.description,
        status: job.status,
        dueDate: job.dueDate,
        customerId: job.customerId.toString()
      });
    }
  }, [job]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (job) {
      updateJob({ variables: { input: formState, id: job.id } }).catch((err) => {
        console.error('Error updating job:', err);
      });
    } else {
      addJob({ variables: { input: formState } }).catch((error) => {
        console.error('Error adding job:', error);
      });
    }
    setFormState({
      title: '',
      description: '',
      status: 'pending',
      dueDate: '',
      customerId: ''
    });
  };

  if (customersLoading) return <p>Loading customers...</p>;
  if (customersError) return <p>Error loading customers.</p>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="jobTitle">Job Title:</label>
        <input
          type="text"
          id="jobTitle"
          name="title"
          value={formState.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="jobDescription">Description:</label>
        <input
          type="text"
          id="jobDescription"
          name="description"
          value={formState.description}
          onChange={handleChange}
          required
        />

        <label htmlFor="jobStatus">Status:</label>
        <select
          id="jobStatus"
          name="status"
          value={formState.status}
          onChange={handleChange}
          required
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <label htmlFor="jobDueDate">Due Date:</label>
        <input
          type="date"
          id="jobDueDate"
          name="dueDate"
          value={formState.dueDate}
          onChange={handleChange}
          required
        />

        <label htmlFor="customerId">Customer:</label>
        <select
          id="customerId"
          name="customerId"
          value={formState.customerId}
          onChange={handleChange}
          required
        >
          <option value="">Select a Customer</option>
          {customersData?.customers?.map((customer: Customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>

        <button type="submit" disabled={loading || updateLoading}>
          {loading || updateLoading ? 'Submitting...' : job ? 'Update Job' : 'Add New Job'}
        </button>
      </form>

      {isJobAdded && <p>Job added successfully!</p>}
      {error && <p>Error adding job, please try again.</p>}
      {updateError && <p>Error updating job, please try again.</p>}
    </div>
  );
};

export default JobForm;
