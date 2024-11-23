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

interface AssignEmployeeInput {
  job: string;
  employee: string;
}

interface AssignEmployeesInput {
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
    job: async(assignment: any) => {
      return await Job.findById(assignment.job);
    },
    jobs: async () => {
      return await Job.find().populate('customer');
    },
    assignments: async () => {
      return await Assignment.find().populate('job employees');
    },
    employees: async () => {
      return await Employee.find();
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
        const customer = await Customer.findById(id);
        if (!customer) {
          throw new Error("No Customer found with that ID");
        }
    
        const jobs = await Job.find({ customer: id });
        
        if (jobs.length > 0) {
          const jobIds = jobs.map((job) => job.id);
          const assignments = await Assignment.find({ job: { $in: jobIds } });
    
          if (assignments.length > 0) {
            const employeeIds = assignments.map((assignment) => assignment.employees).flat();
            
            await Employee.updateMany(
              { _id: { $in: employeeIds } },
              { $pull: { jobs: { $in: jobIds } } }
            );
            
            console.log(`Unlinked ${employeeIds.length} employees from the deleted jobs.`);
    
            await Assignment.deleteMany({ job: { $in: jobIds } });
            console.log(`Deleted ${assignments.length} assignments related to the jobs.`);
          } else {
            console.log("No assignments found for these jobs.");
          }
    
          await Job.deleteMany({ customer: id });
          console.log(`Deleted ${jobs.length} jobs related to the customer.`);
        } else {
          console.log("No jobs found for this customer.");
        }
    
        const deletedCustomer = await Customer.findByIdAndDelete(id);
    
        if (!deletedCustomer) {
          throw new Error("No Customer found with that ID");
        }
    
        return deletedCustomer; 
      } catch (error) {
        console.error(error);
        throw new Error("An error occurred when deleting the customer");
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
        const jobToDelete = await Job.findById(id);
        if (!jobToDelete) {
          throw new Error("No Job found with that ID");
        }
    
        const assignments = await Assignment.find({ job: id });
    
        if (assignments.length > 0) {
          const employeeIds = assignments.map((assignment) => assignment.employees).flat();
    
          await Employee.updateMany(
            { _id: { $in: employeeIds } },
            { $pull: { jobs: id } }
          );
    
          console.log(`Unlinked ${employeeIds.length} employees from the deleted job.`);
          
          await Assignment.deleteMany({ job: id });
          console.log(`Deleted ${assignments.length} assignments for the job.`);
        } else {
          console.log("No assignments found for this job.");
        }
    
        const deletedJob = await Job.findByIdAndDelete(id);
        if (!deletedJob) {
          throw new Error("No Job found with that ID");
        }
    
        console.log(`Deleted job with ID: ${id}`);
        return deletedJob;
      } catch (error) {
        console.error(error);
        throw new Error("An error occurred when deleting the job");
      }
    },

    // Singular
    assignEmployee: async(_parent: any, { input }: { input: AssignEmployeeInput }) => {
      console.log('assignEmployee mutation called');
      const { job, employee } = input;

      const jobExists = await Job.findById(job);
      if(!jobExists) {
        throw new Error("Job not found");
      }

      const employeeExists = await Employee.findById(employee);
      if(!employeeExists) {
        throw new Error("Employee not found");
      }

      const existingAssignment = await Assignment.findOne({ job, employees: { $in: [employee] } });
      if (existingAssignment) {
        throw new Error("Employee is already assigned to this job");
      }

      const newAssignment = new Assignment({
        job: job,
        employees: [employee]
      })

      await newAssignment.save();
      return newAssignment.populate("job employees")
    },

    // Plural Assignment
    assignEmployees: async (_parent: any, { input }: { input: AssignEmployeesInput }) => {
      const { job, employees } = input;

      const jobExists = await Job.findById(job);
      if (!jobExists) {
        throw new Error("Job not found");
      }

      const employeeList = await Employee.find({ _id: { $in: employees } });
      if (employeeList.length !== employees.length) {
        throw new Error("Some employees not found");
      }

      const existingAssignment = await Assignment.findOne({ job, employees: { $in: [employees] } });
      if (existingAssignment) {
        throw new Error("Employee is already assigned to this job");
      }

      console.log("Existing Assignment: ", existingAssignment);
      console.log('Job:', job, 'Employees', employees);

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
        const employeeToDelete = await Employee.findById(id);
        if (!employeeToDelete) {
          throw new Error("Employee not found");
        }
    
        const assignments = await Assignment.find({ employees: id });
    
        for (const assignment of assignments) {
          if (assignment.employees.length === 1) {
            await Assignment.findByIdAndDelete(assignment._id);
            console.log(`Deleted assignment with ID: ${assignment._id} as it had only this employee.`);
          } else {
            await Assignment.findByIdAndUpdate(
              assignment._id,
              { $pull: { employees: id } }, 
              { new: true } 
            );
            console.log(`Removed employee ${id} from assignment with ID: ${assignment._id}`);
          }
        }
    
        const deletedEmployee = await Employee.findByIdAndDelete(id);
        if (!deletedEmployee) {
          throw new Error("Failed to delete employee");
        }
    
        console.log(`Deleted employee with ID: ${id}`);
        return deletedEmployee;
      } catch (error) {
        console.error(error);
        throw new Error("An error occurred while deleting the employee");
      }
    },
  },
  Employee: {
    assignments: async (parent: any) => {
      return Assignment.find({ employees: parent._id }).populate('job');
    },
  }
};

export default resolvers;
