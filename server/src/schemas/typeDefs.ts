const typeDefs =`

    type Customer {
        id: ID!
        name: String!
        email: String!
        phoneNumber: String
        address: String
        createdAt: String
        updatedAt: String
        jobs: [Job]
    }

    input AddCustomerInput {
        name: String!
        email: String!
        phoneNumber: String!
        address: String!
    }

    input UpdateCustomerInput {
        name: String
        email: String
        phoneNumber: String
        address: String
    }

    type Job {
        id: ID!
        title: String!
        description: String!
        status: String!
        dueDate: String!
        customerId: ID!
        createdAt: String
        updatedAt: String
    }

    input AddJobInput {
        title: String!
        description: String!
        status: String!
        dueDate: String
        customerId: ID!    
    }

    input UpdateJobInput {
        title: String
        description: String
        status: String
        dueDate: String
        customerId: ID
    }

    type Employee {
        id: ID!
        name: String!
        phoneNumber: String!
        jobTitle: String!
        hireDate: String!
        createdAt: String
        updatedAt: String
    }

    type Assignment {
        id: ID!
        jobId: ID!
        employeeId: ID!
        createdAt: String!
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
        employees: [Employee]
        employee(id: ID!): Employee
        assignments: [Assignment]
        assignment(id: ID!): Assignment  
    }


    type Mutation {

        addCustomer(input: AddCustomerInput!): Customer!
        updateCustomer(id: ID!, input: UpdateCustomerInput): Customer!
        deleteCustomer(id: ID!): Customer

        addJob(input: AddJobInput!): Job
        updateJob(id: ID!, input: UpdateJobInput!): Job
        deleteJob(id: ID!): Job

        addEmployee(name: String!, phoneNumber: String!, jobTitle: String!, hireDate: String!): Employee

        updateEmployee(id: ID!, name: String, phoneNumber: String, jobTitle: String, hireDate: String): Employee
        
        deleteEmployee(id: ID!): Boolean

        createAccount(input: CreateAccountInput): Auth
        
        login(email: String!, password: String!): Auth
    }`
    



export default typeDefs
