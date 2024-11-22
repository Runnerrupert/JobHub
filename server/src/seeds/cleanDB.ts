import models from '../models/index.js';
import process from 'process';

const { Manager, Assignment, Employee, Job, Customer } = models;

const cleanDB = async (): Promise<void> => {
  try {
    await Assignment.deleteMany({});
    console.log('Assignment collection cleaned.');

    await Employee.deleteMany({});
    console.log('Employee collection cleaned.');

    await Job.deleteMany({});
    console.log('Job collection cleaned.');

    await Customer.deleteMany({});
    console.log('Customer collection cleaned.');

    await Manager.deleteMany({});
    console.log('Manager collection cleaned.');

  } catch (err: unknown) {
    console.error('Error cleaning collections:', err);
    process.exit(1);
  }
};

export default cleanDB;
