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
      jobs {
        id
        title
        status
        dueDate
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
      jobs {
        id
        title
        status
        dueDate
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
      customer {
        id
        name
      }
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
      customer {
        id
        name
      }
    }
    assignment {
      id
      employee {
        id
        name
      }
    }
  }
`;

//  Get all employees

export const GET_EMPLOYEES = gql`
  query GetEmployees {
    employees {
      id
      name
      email
      phoneNumber
      role
      assignments {
        job {
          id
          title
          description
        }
      }
    }
  }
`;

// Get all Assignments

export const GET_ASSIGNMENTS = gql`
  query GetAssignments {
    assignments {
      id
      job {
        id
        title
      }
    }
    employee {
      id
      name
    }
  }
`;
