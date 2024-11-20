import { gql } from '@apollo/client';

//May need to add queries for loging a user in, and adding a user for creating an account. 

//Get all customers

export const GET_CUSTOMERS = gql`
  query GetCustomers {
    customers {
      id
      name
      email
      phoneNumber
      address
      createdAt
      updatedAt
      jobs {
        id
        title
        status
      }
    }
  }
`;

// Get a customer

export const GET_CUSTOMER = gql`
  query GetCustomer($id: ID!) {
    customer(id: $id) {
      id
      name
      email
      phoneNumber
      address
      createdAt
      updatedAt
      jobs {
        id
        title
        status
      }
    }
  }
`;

// Get all jobs

export const GET_JOBS = gql`
  query GetJobs {
    jobs {
      id
      title
      description
      status
      dueDate
      customerId
      createdAt
      updatedAt
    }
  }
`;

// Get a job

export const GET_JOB = gql`
  query GetJob($id: ID!) {
    job(id: $id) {
      id
      title
      description
      status
      dueDate
      customerId
      createdAt
      updatedAt
    }
  }
`;

//  Get all employees

export const GET_EMPLOYEES = gql`
  query GetEmployees {
    employees {
      id
      name
      phoneNumber
      jobTitle
      hireDate
      createdAt
      updatedAt
    }
  }
`;

// Get all Assignments

export const GET_ASSIGNMENTS = gql`
  query GetAssignments {
    assignments {
      id
      jobId
      employeeId
      createdAt
    }
  }
`;
