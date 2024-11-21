import { gql } from '@apollo/client';

// Add customer
export const ADD_CUSTOMER = gql`
  mutation AddCustomer($input: CustomerInput!) {
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
  mutation UpdateCustomer($id: ID!, $input: CustomerInput!) {
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
  mutation AddJob($input: JobInput!) {
    addJob(input: $input) {
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

// Update job
export const UPDATE_JOB = gql`
  mutation UpdateJob($id: ID!, $input: JobInput!) {
    updateJob(id: $id, input: $input) {
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

// Delete job
export const DELETE_JOB = gql`
  mutation DeleteJob($id: ID!) {
    deleteJob(id: $id){
      id
    }
  }
`;

// Add assignment
export const ADD_ASSIGNMENT = gql`
  mutation AddAssignment($input: AssignmentInput!) {
    addAssignment(input: $input) {
      id
      job {
        id
        title
      }
      employee {
        id
        name
      }
    }
  }
`;

// Update assignment
export const UPDATE_ASSIGNMENT = gql`
  mutation UpdateAssignment($id: ID!, $input: AssignmentInput!) {
    updateAssignment(id: $id, input: $input) {
      id
      job {
        id
        title
      }
      employee {
        id
        name
      }
    }
  }
`

// Remove assignment
export const DELETE_ASSIGNMENT = gql`
  mutation DeleteAssignment($id: ID!) {
    deleteAssignment(id: $id){
      id
    }
  }
`;

// Add employee
export const ADD_EMPLOYEE = gql`
  mutation AddEmployee($input: EmployeeInput!) {
    addEmployee(input: $input) {
      id
      name
      phoneNumber
      role
      hireDate
    }
  }
`;

// Update employee
export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($input: EmployeeInput!) {
    updateEmployee(id: $id, input: $input) {
      id
      name
      phoneNumber
      role
      hireDate
    }
  }
`;

// Delete employee
export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id){
      id
    }
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