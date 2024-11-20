import { gql } from '@apollo/client';

// Add customer
export const ADD_CUSTOMER = gql`
  mutation AddCustomer($input: AddCustomerInput!) {
    addCustomer(input: $input) {
      id
      name
      email
      phoneNumber
      address
    }
  }
`;

// Update customer
export const UPDATE_CUSTOMER = gql`
  mutation UpdateCustomer($id: ID!, $input: UpdateCustomerInput!) {
    updateCustomer(id: $id, input: $input) {
      id
      name
      email
      phoneNumber
      address
    }
  }
`;

// Delete customer
export const DELETE_CUSTOMER = gql`
  mutation DeleteCustomer($id: ID!) {
    deleteCustomer(id: $id) {
      id
    }
  }
`;

// Add job
export const ADD_JOB = gql`
  mutation AddJob($title: String!, $description: String!, $status: String!, $dueDate: String!, $customerId: ID!) {
    addJob(title: $title, description: $description, status: $status, dueDate: $dueDate, customerId: $customerId) {
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

// Update job
export const UPDATE_JOB = gql`
  mutation UpdateJob($id: ID!, $title: String, $description: String, $status: String, $dueDate: String, $customerId: ID) {
    updateJob(id: $id, title: $title, description: $description, status: $status, dueDate: $dueDate, customerId: $customerId) {
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

// Delete job
export const DELETE_JOB = gql`
  mutation DeleteJob($id: ID!) {
    deleteJob(id: $id)
  }
`;

// Add employee
export const ADD_EMPLOYEE = gql`
  mutation AddEmployee($name: String!, $phoneNumber: String!, $jobTitle: String!, $hireDate: String!) {
    addEmployee(name: $name, phoneNumber: $phoneNumber, jobTitle: $jobTitle, hireDate: $hireDate) {
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

// Update employee
export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $name: String, $phoneNumber: String, $jobTitle: String, $hireDate: String) {
    updateEmployee(id: $id, name: $name, phoneNumber: $phoneNumber, jobTitle: $jobTitle, hireDate: $hireDate) {
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

// Delete employee
export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;

// Add assignment
export const ADD_ASSIGNMENT = gql`
  mutation AddAssignment($jobId: ID!, $employeeId: ID!, $createdAt: String!) {
    addAssignment(jobId: $jobId, employeeId: $employeeId, createdAt: $createdAt) {
      id
      jobId
      employeeId
      createdAt
    }
  }
`;

// Remove assignment
export const REMOVE_ASSIGNMENT = gql`
  mutation RemoveAssignment($id: ID!) {
    removeAssignment(id: $id)
  }
`;

// login Account
export const LOGIN_MANAGER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      manager {
        id
        name
      }
    }
  }
`;

// Create Account
export const CREATE_ACCOUNT = gql`
  mutation createAccount($input: CreateAccountInput!) {
    createAccount(input: $input) {
      token
      manager {
        id
        name
      }
    }
  }
`;