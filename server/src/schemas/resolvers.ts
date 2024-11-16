import models from '../models/index.js'
import { signToken, AuthenticationError } from '../utils/auth.js'
import bcrypt from 'bcrypt';

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
        const existingManager = await Manager.findOne({ email: input.email });

        if (existingManager) {
          throw new Error("Manager with this email already exists");
        }
        // Create a new Manager with provided name, email, and password
        const hashedPassword = await bcrypt.hash(input.password, 10);

        const manager = await Manager.create({ 
          email: input.email,
          username: input.username,
          password: hashedPassword,
         });
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
