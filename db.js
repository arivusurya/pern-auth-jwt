import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
const pool = new pg.Pool({
  user: process.env.database_user,
  password: process.env.password,
  host: proceess.env.host,
  port: process.env.database_port,
  database: process.env.database,
});

export default pool;
