import { Pool } from 'pg';

export const connectionPool = new Pool({
        database: process.env.PostgreSQLDB,
        host: process.env.PostgreSQLEndpoint,
        user: process.env.PostgreSQLUser,
        password: process.env.PostgreSQLPassword,
  port: 5432,
  max: 10 // max number of connections
});