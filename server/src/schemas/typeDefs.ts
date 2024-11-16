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
    username: String!
    email: String!
    password: String!
    createdAt: String
    updatedAt: String
    }

    type Auth {
        token: ID!
        manager: Manager
    }

    input ManagerInput {
        name: String!
        email: String!
        password: String!
    }

    type Query {

    customers: [Customer]
    customer(id: ID!): Customer
    jobs: [Job]
    job(id: ID!): Job
    employees: [Employee]
    employee(id: ID!): Employee
    assignments: [Assignment]
    assignment(id: ID!): Assignment  
    }


    type Mutation {

    addCustomer(name: String!, email: String!, phoneNumber: String, address: String): Customer
    updateCustomer(id: ID!, name: String, email: String, phoneNumber: String, address: String): Customer
    deleteCustomer(id: ID!): Boolean

    addJob(title: String!, description: String!, status: String!, dueDate: String!, customerId: ID!): Job
    updateJob(id: ID!, title: String, description: String, status: String, dueDate: String, customerId: ID): Job
    deleteJob(id: ID!): Boolean

    addEmployee(name: String!, phoneNumber: String!, jobTitle: String!, hireDate: String!): Employee
    updateEmployee(id: ID!, name: String, phoneNumber: String, jobTitle: String, hireDate: String): Employee
    deleteEmployee(id: ID!): Boolean

    addAssignment(jobId: ID!, employeeId: ID! CreatedAt: String!): Assignment
    removeAssignment(id: ID!): Boolean

    createAccount(input: ManagerInput): Auth
    login(email: String!, password: String!): Auth
    }`
    



export default typeDefs
