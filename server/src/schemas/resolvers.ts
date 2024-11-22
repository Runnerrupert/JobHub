import models from '../models/index.js'
import { signToken, AuthenticationError } from '../utils/auth.js'
import bcrypt from 'bcrypt';

const { Manager, Customer, Job, Assignment, Employee } = models;

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

interface CustomerInput {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}

interface JobInput {
  title: string;
  description: string;
  status: string;
  dueDate?: string;
  customer: string;
}

interface AssignmentInput {
  job: string;
  employees: string[];
}

interface EmployeeInput {
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
}

type CustomerType = typeof Customer.schema.obj;
type JobType = typeof Job.schema.obj;
type AssignmentType = typeof Assignment.schema.obj;
type EmployeeType = typeof Employee.schema.obj;

const resolvers = {
  Query: {
    customers: async () => {
      return await Customer.find().populate('jobs');
    },
    jobs: async () => {
      return await Job.find().populate('customer');
    },
    assignments: async () => {
      return await Assignment.find().populate('job employees');
    },
    employees: async () => {
      return await Employee.find().populate('assignments');
    },
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
    addCustomer: async (_parent: any, { input }: { input: CustomerInput }) => {

      const newCustomer = new Customer({
        ...input,
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
    addJob: async (_parent: any, { input }: { input: JobInput }) => {
      const { customer, ...jobDetails } = input;
    
      const existingCustomer = await Customer.findById(customer);
    
      if (!existingCustomer) {
        throw new Error("Customer not found");
      }
    
      const newJob = new Job({
        ...jobDetails, 
        customer
      });
    
      await newJob.save();

      await Customer.findByIdAndUpdate(customer, {
        $push: { jobs: newJob._id }
      })
    
      const populatedJob = await newJob.populate('customer')
    
      return populatedJob;
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
    // assignEmployee: async(_parent: any) => {

    // },
    addAssignment: async (_parent: any, { input } : { input: AssignmentInput }) => {
      const { job, employees } = input;

      const jobExists = await Job.findById(job);
      if (!jobExists) {
        throw new Error("Job not found");
      }

      const employeeList = await Employee.find({ _id: { $in: employees } });
      if (employeeList.length !== employees.length) {
        throw new Error("Some employees not found");
      }

      const newAssignment = new Assignment({
        job: job,
        employees: employees,
      });

      await newAssignment.save();
      return newAssignment.populate("job employees");
    },

    updateAssignment: async (_parent: any, { id, input }: { id: string, input: Partial<AssignmentType>}) => {
      const updatedAssignment = await Assignment.findByIdAndUpdate(id, { ...input, updatedAt: new Date() }, { new: true });

      if (!updatedAssignment) {
        throw new Error("No Assignment found with that ID");
      }

      return updatedAssignment;
    },
    deleteAssignment: async(_parent: any, { id }: { id: string; }) => {
      try {
        const deletedAssignment = await Assignment.findByIdAndDelete(id);
    
        if (!deletedAssignment) {
          throw new Error("No Assignment found with that ID");
        }
    
        return deletedAssignment;
      } catch (error) {
        console.error(error);
        throw new Error("An error occurred while deleting the Assignment");
      }
    },
    addEmployee: async (_parent: any, { input } : { input: EmployeeInput }) => {
      const newEmployee = new Employee({
        ...input,
      })

      await newEmployee.save();

      return newEmployee;
    },

    updateEmployee: async (_parent: any, { id, input }: { id: string, input: Partial<EmployeeType>}) => {
      const updatedEmployee = await Employee.findByIdAndUpdate(
        id,
        { ...input, updatedAt: new Date().toISOString() },
        { new: true}
      );
      if (!updatedEmployee) {
        throw new Error("No Employee found with that ID");
      };

      return updatedEmployee;
    },
    deleteEmployee: async(_parent: any, { id }: { id: string; }) => {
      try {
        const deletedEmployee = await Employee.findByIdAndDelete(id);

        if (!deletedEmployee) {
          throw new Error("No Employee found with that ID");
        }
        return deletedEmployee;
      } catch (error) {
        console.error(error);
        throw new Error("An error occured when deleting Employee");
      }
    },
  },
};

export default resolvers;
