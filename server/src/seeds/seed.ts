import db from '../config/connection.js';
import managerSeeds from './managerData.json' assert { type: "json" };
import models from '../models/index.js';
import bcrypt from 'bcrypt';
import cleanDB from './cleanDB.js';

const { Manager } = models;

const seedDatabase = async (): Promise<void> => {
    try {
        await db();
        await cleanDB();

        const hashedSeeds = await Promise.all(managerSeeds.map(async(manager) => {
            const hashedPassword = await bcrypt.hash(manager.password, 10);
            return {
                ...manager,
                password: hashedPassword,
            };
        }));

        await Manager.insertMany(hashedSeeds);
        process.exit(0);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error seeding database:', error.message);
        } else {
            console.error('Unknown error seeding database');
        }
        process.exit(1);
    }
}

seedDatabase();
