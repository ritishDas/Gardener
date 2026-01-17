import { Pool } from 'pg'
import eventModel from './models/event.model.js';
import participationModel from './models/participation.model.js';
import teamModel from './models/team.model.js';
import userModel from './models/user.model.js';

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: parseInt(process.env.DBPORT || '5432'),
  database: process.env.DATABASE
})

export { pool };


export const initDB = async () => {
  try {
    await pool.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
${userModel} ${eventModel} ${participationModel} ${teamModel}
    `);

    console.log("Database initialized successfully");
  } catch (err) {
    console.error("Failed to initialize database:", err);
  }
}

