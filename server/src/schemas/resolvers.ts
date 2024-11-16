import models from '../models/index.js'
import { signToken, AuthenticationError } from '../utils/auth.js'

const { Manager } = models;

interface Manager {
    _id: string;
    username: string;
    email: string;
    password: string;
}

interface AddManagerArgs {
    input: {
        username: string;
        email: string;
        password: string;
    }
}

const resolvers = {
  Query: {
    
  },
  Mutation: {
    createAccount: async (_parent: unknown, { input }: AddManagerArgs): Promise<{ token: string; manager: Manager }> => {
        // Create a new Manager with provided name, email, and password
        const manager = await Manager.create({ ...input });
        // Sign a JWT token for the new manager
        const token = signToken(manager.username, manager.email, manager._id);
  
        return { token, manager };
      },

    login: async (_parent: unknown, { email, password }: { email: string; password: string }): Promise<{ token: string; manager: Manager }> => {
    // Find a profile by email
    const manager = await Manager.findOne({ email });

    if (!manager) {
        // If profile with provided email doesn't exist, throw an authentication error
        throw AuthenticationError;
    }

    // Check if the provided password is correct
    const correctPw = await manager.isCorrectPassword(password);

    if (!correctPw) {
        // If password is incorrect, throw an authentication error
        throw new AuthenticationError('Not Authenticated');
    }

    // Sign a JWT token for the authenticated profile
    const token = signToken(manager.username, manager.email, manager._id);
    return { token, manager };
    },
  },
};

export default resolvers;
