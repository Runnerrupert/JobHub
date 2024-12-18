const typeDefs =`

    type Customer {
        id: ID!
        name: String!
        email: String!
        phoneNumber: String
        address: String
        jobs: [Job]
    }

    input CustomerInput {
        name: String!
        email: String!
        phoneNumber: String!
        address: String!
    }

    type Job {
        id: ID!
        title: String!
        description: String!
        status: String!
        dueDate: String!
        customer: Customer
        assignment: Assignment
    }

    input JobInput {
        title: String!
        description: String!
        status: String!
        dueDate: String
        customer: ID!    
    }

    type Assignment {
        id: ID!
        job: Job!
        employees: [Employee!]
    }

    input AssignEmployeeInput {
        job: ID!
        employee: ID!
    }

    input AssignEmployeesInput {
        job: ID!
        employees: [ID!]
    }

    type Employee {
        id: ID!
        name: String!
        email: String!
        phoneNumber: String!
        role: String!
        assignments: [Assignment]
    }

    input EmployeeInput {
        name: String!
        email: String!
        phoneNumber: String!
        role: String!
    }

    type Manager {
        id: ID!
        name: String!
        email: String!
        createdAt: String
        updatedAt: String
    }

    type Auth {
        token: String!
        manager: Manager
    }

    input CreateAccountInput {
        email: String!
        name: String!
        password: String!
    }

    type Query {
        customers: [Customer]!
        customer(id: ID!): Customer

        jobs: [Job]
        job(id: ID!): Job

        assignments: [Assignment]
        assignment(id: ID): Assignment 
         
        employees: [Employee]!
        employee(id: ID!): Employee
    }


    type Mutation {
        addCustomer(input: CustomerInput!): Customer
        updateCustomer(id: ID!, input: CustomerInput!): Customer
        deleteCustomer(id: ID!): Customer

        addJob(input: JobInput!): Job
        updateJob(id: ID!, input: JobInput!): Job
        deleteJob(id: ID!): Job

        assignEmployee(input: AssignEmployeeInput!): Assignment
        assignEmployees(input: AssignEmployeesInput!): Assignment
        updateAssignment(id: ID!, input: AssignEmployeeInput!): Assignment
        deleteAssignment(id: ID!): Assignment

        addEmployee(input: EmployeeInput!): Employee
        updateEmployee(id: ID!, input: EmployeeInput!): Employee
        deleteEmployee(id: ID!): Employee

        createAccount(input: CreateAccountInput): Auth
        login(email: String!, password: String!): Auth
    }`

export default typeDefs
