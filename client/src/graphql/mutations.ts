import { gql } from '@apollo/client';

// add customer

export const ADD_CUSTOMER = gql`
  mutation AddCustomer($name: String!, $email: String!, $phoneNumber: String, $address: String) {
    addCustomer(name: $name, email: $email, phoneNumber: $phoneNumber, address: $address) {
      id
      name
      email
      phoneNumber
      address
      createdAt
      updatedAt
    }
  }
`;

// update customer

export const UPDATE_CUSTOMER = gql`
  mutation UpdateCustomer($id: ID!, $name: String!, $email: String!, $phoneNumber: String, $address: String) {
    updateCustomer(id: $id, name: $name, email: $email, phoneNumber: $phoneNumber, address: $address) {
      id
      name
      email
      phoneNumber
      address
      createdAt
      updatedAt
    }
  }
`;

// delete customer

export const DELETE_CUSTOMER = gql`
  mutation DeleteCustomer($id: ID!) {
    deleteCustomer(id: $id) {
      id
    }
  }
`;

// add job

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

// update job

export const UPDATE_JOB = gql`
  mutation UpdateJob($id: ID!, $title: String!, $description: String!, $status: String!, $dueDate: String!, $customerId: ID!) {
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

// delete job

export const DELETE_JOB = gql`
  mutation DeleteJob($id: ID!) {
    deleteJob(id: $id) {
      id
    }
  }
`;

// add employee

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

// update employee

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $name: String!, $phoneNumber: String!, $jobTitle: String!, $hireDate: String!) {
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

// delete employee

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id) {
      id
    }
  }
`;

// add assignment 

export const ADD_ASSIGNMENT = gql`
  mutation AddAssignment($jobId: ID!, $employeeId: ID!) {
    addAssignment(jobId: $jobId, employeeId: $employeeId) {
      id
      jobId
      employeeId
      createdAt
    }
  }
`;

// remove assignment

export const REMOVE_ASSIGNMENT = gql`
  mutation RemoveAssignment($id: ID!) {
    removeAssignment(id: $id) {
      id
    }
  }
`;

// create account

export const CREATE_ACCOUNT = gql`
  mutation CreateAccount($input: ManagerInput) {
    createAccount(input: $input) {
      token
      manager {
        id
        username
        email
        createdAt
        updatedAt
      }
    }
  }
`;

// login manager

export const LOGIN_MANAGER = gql`
  mutation LoginManager($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      manager {
        id
        username
        email
        createdAt
        updatedAt
      }
    }
  }
`;