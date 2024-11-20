import models from '../models/index.js';
import process from 'process';

const { Manager } = models;

const cleanDB = async (): Promise<void> => {
  try {
    await Manager.deleteMany({});
    console.log('Manager collection cleaned.');

  } catch (err: unknown) {
    console.error('Error cleaning collections:', err);
    process.exit(1);
  }
};

export default cleanDB;
