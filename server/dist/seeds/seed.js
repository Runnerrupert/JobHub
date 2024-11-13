import db from "../config/connection.js";
import models from "../models/index.js";
const { Tech } = models;
import techData from './techData.json' assert { type: "json" };
db.once('open', async () => {
    await Tech.insertMany(techData);
    console.log('Technologies seeded!');
    process.exit(0);
});
