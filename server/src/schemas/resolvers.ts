import models from '../models/index.js'
import { signToken, AuthenticationError } from '../utils/auth.js'
import bcrypt from 'bcrypt';

const { Manager, Customer, Job } = models;

interface Manager {
  _id: string;
  name: string;
  email: string;
  password: string;
}

interface AddManagerArgs {
  input: {
      name: string;
      email: string;
      password: string;
  }
}

interface AddCustomerInput {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}

interface AddJobInput {
  title: string;
  description: string;
  status: string;
  dueDate: string;
}

type CustomerType = typeof Customer.schema.obj;
type JobType = typeof Job.schema.obj;

const resolvers = {
  Query: {
    customers: async () => {
      return await Customer.find();
    },
    jobs: async () => {
      return await Job.find();
    }
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
        name: input.name,
        password: hashedPassword,
        });
      // Sign a JWT token for the new manager
      const token = signToken(manager.name, manager.email, manager._id);

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
      console.log(correctPw);

      if (!correctPw) {
          // If password is incorrect, throw an authentication error
          throw new AuthenticationError('Not Authenticated');
      }

      // Sign a JWT token for the authenticated profile
      const token = signToken(manager.name, manager.email, manager._id);
      return { token, manager };
    },
    addCustomer: async (_parent: any, { input }: { input: AddCustomerInput }) => {

      const newCustomer = new Customer({
        ...input,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })

      await newCustomer.save();

      return newCustomer;
    },
    updateCustomer: async (_parent: any, { id, input }: { id: string; input: Partial<CustomerType> }) => {
      const updatedCustomer = await Customer.findByIdAndUpdate(
        id,
        { ...input, updatedAt: new Date().toISOString() },
        { new: true }
      );

      if (!updatedCustomer) {
        throw new Error("No Customer found with that ID");
      }

      return updatedCustomer;
    },
    deleteCustomer: async(_parent: any, { id }: { id: string; }) => {
      try {
        const deletedCustomer = await Customer.findByIdAndDelete(id);

        if (!deletedCustomer) {
          throw new Error("No Customer found with that ID");
        }
        return deletedCustomer;
      } catch (error) {
        console.error(error);
        throw new Error("An error occured when deleting customer");
      }
    },
    addJob: async (_parent: any, { input } : { input: AddJobInput }) => {
      const newJob = new Job(input);
      await newJob.save();
      return newJob;
    },

    updateJob: async (_parent: any, { id, input }: { id: string, input: Partial<JobType>}) => {
      const updatedJob = await Job.findByIdAndUpdate(
        id,
        { ...input, updatedAt: new Date().toISOString},
        { new: true}
      );
      if (!updatedJob) {
        throw new Error("No Job found with that ID");
      };

      return updatedJob;
    },
    deleteJob: async(_parent: any, { id }: { id: string; }) => {
      try {
        const deletedJob = await Job.findByIdAndDelete(id);

        if (!deletedJob) {
          throw new Error("No Job found with that ID");
        }
        return deletedJob;
      } catch (error) {
        console.error(error);
        throw new Error("An error occured when deleting job");
      }
    },
  },
};

export default resolvers;
