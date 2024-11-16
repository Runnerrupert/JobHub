const typeDefs = `
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
        
    }

    type Mutation {
        createAccount(input: ManagerInput): Auth
        login(email: String!, password: String!): Auth
    }
`;

export default typeDefs;
